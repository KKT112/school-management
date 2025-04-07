import "../../../index.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/pages/authenticated/school-landong-page-home/navbar";
import { schoolRegistration } from "@/lib/registration";
import { useState } from "react";
import ApiRegister from "@/network/api/school-registration/api-register";
import { useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";

const RegistrationFormSchema = z.object({


  user_name: z
    .string({ message: "User name is required" })
    .min(2, { message: "Minimum two characters required" })
    .max(20, { message: "Maximum 20 characters allowed" }),

  email: z
    .string({ message: "Email must be required" })
    .min(5, { message: "Minimum two characters required" })
    .max(30, { message: "Maximum 20 characters allowed" }),

  password: z
    .string({ message: "Password must be required" })
    .min(2, { message: "Minimum 8 characters required" })
    .max(20, { message: "Maximum 20 characters allowed" }),

  confirmPassword: z
    .string({ message: "Password is further check " })
    .min(2, { message: "Minimum 8 characters required" })
    .max(20, { message: "Maximum 20 characters allowed" }),
  name: z
    .string({ message: "School name is required" })
    .min(2, { message: "Minimum 2 characters required" })
    .max(30, { message: "Maximum 30 characters allowed" }),

  address: z
    .string({ message: "SchoolAddress is required" })
    .min(10, { message: "Minimum 10 characters required" })
    .max(100, { message: "Maximum 100 characters allowed" }),
})
.superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Both password not match",
      path: ["confirmPassword"],
    });
  }
});

type tSigninSchema = z.infer<typeof RegistrationFormSchema>;

const Registration = () => {
  const [isloading,setIsloading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<tSigninSchema>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: { },
  });

  //register api
    const registrationUser = async () => {
    setIsloading(true);
    const formData = form.getValues()
    try {
       const res = await ApiRegister.postRegistration({user_name:formData.user_name,email:formData.email,password:formData.password,address:formData.address,name:formData.name });

          //  console.log(res);
      

        if (res && res.s) { 
           return navigate("/login", { replace: true }); 
        } else {
           return alert( "User already Exists");
        }
    } catch {
       return alert("error");
    }
    finally{
      setIsloading(false);
    }
  
};


  // Form Submission Handler
  const Register: SubmitHandler<tSigninSchema> = async() => {
    
    registrationUser();
    form.reset({ name:"",address:"",user_name: "", password: "",confirmPassword:"", email:"" });
  
  };
  
  

  return (
    <div className="">
      <Navbar/>
      <div className="pt-20 relative">

      <div className="w-full relative"><img src={schoolRegistration} className="w-full  xl:h-110 object-cover object-top" /></div>
      <p className="xl:text-4xl text-2xl font-bold text-center w-full pt-10 ">School Registration </p>
      <div className="text-center  pt-10 bg-gray-100 mx-2 xl:mx-30 2xl:mx-60 mb-10 p-10 mt-5 border-1 rounded-md">
     
      <Form {...form}>
        <form onSubmit={form.handleSubmit(Register)} >
        
          {/* UserName Field */}
          <FormField
            control={form.control}
            name="user_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pt-5 md:text-md">User Name*</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter your good Name "
                    type="text"
                    className="md:h-10   hover:text-black   bg-white"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pt-5 md:text-md">Email*</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter Password"
                    type="email"
                    className="md:h-10   bg-white"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pt-5 md:text-md">Paaword*</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter Password"
                    type="password"
                    className="md:h-10   bg-white"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pt-5 md:text-md">
                  Confirm Password*
                </FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter Password"
                    type="password"
                    className="md:h-10  bg-white"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

            {/* SchoolName Field */}
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-md pt-5 "> School Name* </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter your school name  "
                    className="md:h-10  bg-white  "
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* schooladress */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pt-5 md:text-md ">School Address*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your School Address"
                    className="resize bg-white "
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />


          {/* Submit Button */}
          <div className="flex items-center pt-10 md:px-50">
            <Button
           
              type="submit"
              className="border-1 w-full h-10 bg-blue-600 hover:bg-blue-800 cursor-pointer text-white text-lg "
            >
            { isloading?
                               <ImSpinner2 className="animate-spin duration-200"/> : "Registration"
                               }
            </Button>
          </div>
        </form>
      </Form>
    </div>
      </div>
    
    </div>
  );
};

export default Registration;