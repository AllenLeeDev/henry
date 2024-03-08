import React from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { Provider } from "react-redux"
import router from "../src/router/Router"
import { store } from "./state/store"
import "./index.css"

const container = document.getElementById("root")

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgb(0, 131, 108)"
    },
    secondary: {
      main: "#fff"
    }
  }
})

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  )
}
