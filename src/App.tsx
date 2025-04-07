import { RouterProvider } from "react-router-dom"
// import AllSections from "./pages/authenticated/all-scetions"
import { route } from "./route/route"
import { Flip, ToastContainer } from 'react-toastify';

import { StandardData } from "./pages/authenticated/dashboard/components/standard/data/standard";

function App() {
 

  return (
    <>
      <RouterProvider router={route}/>
      <ToastContainer 
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Flip}/>
      {
        localStorage.setItem("std" , JSON.stringify(StandardData))
        
      }
    </>
  )
}

export default App
