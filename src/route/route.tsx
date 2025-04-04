import { createBrowserRouter } from "react-router-dom"
import SchoolLandingPages from "@/pages/authenticated/school-landing-pages"
import Login from "@/pages/auth/login/login"
import Register from "@/pages/auth/registration/registration"



export const route = createBrowserRouter([
    {
        path:"/",
        element:<SchoolLandingPages/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
])