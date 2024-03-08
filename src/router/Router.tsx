import React from "react"

import { createBrowserRouter } from "react-router-dom"

import App from "../App"
import { ProvidersPage, ClientsPage } from "../pages"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "client",
    element: <ClientsPage />
  },
  {
    path: "provider",
    element: <ProvidersPage />
  }
])

export default router
