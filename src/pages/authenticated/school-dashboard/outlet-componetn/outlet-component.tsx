import { Outlet } from "react-router-dom"

const OutletComponent = () => {
  return (
    <div className="bg-amber-500 flex-1">
      <Outlet/>
    </div>  
  )
}

export default OutletComponent
