import { RouterProvider } from "react-router-dom"
// import AllSections from "./pages/authenticated/all-scetions"
import { route } from "./route/route"


function App() {
 

  return (
    <>
      <RouterProvider router={route}/>
    </>
  )
}

export default App
