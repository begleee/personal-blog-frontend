import { RouterProvider } from "react-router"
import Navbar from "./components/Navbar"
import { router } from "./routes"

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
