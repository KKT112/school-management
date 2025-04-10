import { createBrowserRouter, redirect } from "react-router-dom";
import SchoolLandingPages from "@/pages/authenticated/school-landing-pages";
import Login from "@/pages/auth/login/login";
import Register from "@/pages/auth/registration/registration";
import OutLetWraper from "@/components/layout/outlet-wrapper/wrapper";
import DashboardPage from "@/pages/authenticated/dashboard/page";
import OutletTeacher from "@/pages/authenticated/dashboard/components/teacheroutlet/teacher-page";
import OutletSubject from "@/pages/authenticated/dashboard/components/subject/subject-page";
import OutletStudent from "@/pages/authenticated/dashboard/components/student/student-page";
import StandardPageOutlet from "@/pages/authenticated/dashboard/components/standard/standard-page";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <SchoolLandingPages />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  { loader :()=>{
    console.log("loader is calling");
    const user = localStorage.getItem("auth");
    if(!user){
      return redirect("/");
    }
    return true;
  },
    element: <OutLetWraper />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
        index: true,
      },
      {
        path: "teacher",
        element: <OutletTeacher />,
      },
      {
        path: "subject",
        element: <OutletSubject />,
      },
      {
        path: "student",
        element: <OutletStudent />,
      },
      {
        path: "standard",
        element: <StandardPageOutlet/>,
      },
    ],
  },
]);
