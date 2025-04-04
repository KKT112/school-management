import { createBrowserRouter } from "react-router-dom";
import SchoolLandingPages from "@/pages/authenticated/school-landing-pages";
import Login from "@/pages/auth/login/login";
import Register from "@/pages/auth/registration/registration";
import OutLetWraper from "@/components/layout/outlet-wrapper/wrapper";
import DashboardPage from "@/pages/authenticated/dashboard/page";
import OutletTeacher from "@/pages/authenticated/dashboard/components/teacheroutlet/page";
import OutletSubject from "@/pages/authenticated/dashboard/components/subject/page";
import OutletStudent from "@/pages/authenticated/dashboard/components/student/page";

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
  {
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
    ],
  },
]);
