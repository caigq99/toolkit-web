#!/usr/bin/env bash
set -euo pipefail

IMAGE="${IMAGE:-ghcr.io/caigq99/toolkit-web:latest}"
APP_DIR="${APP_DIR:-/opt/toolkit-web}"
COMPOSE_FILE="${COMPOSE_FILE:-$APP_DIR/compose.yml}"
SERVICE="${SERVICE:-toolkit-web}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:3010/}"
PUBLIC_URL="${PUBLIC_URL:-https://tool.nineone.de5.net/}"

echo "== ToolKit update =="
echo "image: $IMAGE"
echo "compose: $COMPOSE_FILE"

if [[ $EUID -ne 0 ]]; then
  echo "请用 root 执行：sudo $0" >&2
  exit 1
fi

if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "找不到 compose 文件：$COMPOSE_FILE" >&2
  exit 1
fi

cd "$APP_DIR"

echo "== Pull image =="
docker pull "$IMAGE"

echo "== Update compose image =="
python3 - "$COMPOSE_FILE" "$IMAGE" <<'PY'
from pathlib import Path
import sys
path = Path(sys.argv[1])
image = sys.argv[2]
text = path.read_text()
lines = []
replaced = False
for line in text.splitlines():
    if not replaced and line.lstrip().startswith("image:"):
        indent = line[: len(line) - len(line.lstrip())]
        lines.append(f"{indent}image: {image}")
        replaced = True
    else:
        lines.append(line)
if not replaced:
    raise SystemExit("compose.yml 中没有找到 image: 行")
path.write_text("\n".join(lines) + "\n")
PY

echo "== Restart service =="
docker compose -f "$COMPOSE_FILE" up -d --remove-orphans

echo "== Wait health =="
for i in {1..30}; do
  if curl -fsS "$HEALTH_URL" >/dev/null; then
    echo "local health ok: $HEALTH_URL"
    break
  fi
  if [[ "$i" == "30" ]]; then
    echo "本地健康检查失败" >&2
    docker compose -f "$COMPOSE_FILE" ps >&2 || true
    docker logs --tail=80 "$SERVICE" >&2 || true
    exit 1
  fi
  sleep 2
done

echo "== Nginx reload =="
nginx -t
systemctl reload nginx

echo "== Public check =="
if curl -k -fsSI "$PUBLIC_URL" >/dev/null; then
  echo "public ok: $PUBLIC_URL"
else
  echo "公网检查未通过，请稍后手动检查：$PUBLIC_URL" >&2
fi

echo "== Cleanup old images =="
# 仅在服务健康检查和 nginx reload 成功后清理未被任何容器使用的旧镜像。
# 这会删除旧版本 toolkit-web 镜像以及其它未使用镜像；正在运行的镜像不会被删除。
docker image prune -af

echo "== Current container =="
docker compose -f "$COMPOSE_FILE" ps

echo "更新完成。"
