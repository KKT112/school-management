import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { setSchoolName } from "@/redux/reducer/reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
  
  export function LogoutAlert() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout =()=>{
        localStorage.removeItem("auth");
        console.log("logout successfully")
        navigate("/");

        localStorage.removeItem("schoolName");
        dispatch(setSchoolName(""));
    }
    return (
      <AlertDialog >
        <AlertDialogTrigger asChild>
          <Button className="cursor-pointer hover:scale-125 hover:text-red-500 text-white ">Logout</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will log-out your
              account and u will be redirect home page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

