import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

import { AppShell } from "@/features/tools/components/AppShell"
import { HomePage } from "@/features/tools/HomePage"
import { ToolPage } from "@/features/tools/ToolPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "tools/:toolId", element: <ToolPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}

export default App
