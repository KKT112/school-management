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
import Navbar from "@/pages/authenticated/school-landong-page-home/navbar";
import { loginTopImage } from "@/lib/login";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { loginlogo } from "@/lib/logoes";
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import apiLogin from "@/network/api/api-login/api-login";

//**Zod Schema for Form Validation**
const LoginFormSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .min(2, { message: "Minimum 2 characters required" })
    .max(40, { message: "Maximum 20 characters allowed" }),
  password: z
    .string({ message: "Password is required" })
    .min(2, { message: "Minimum 8 characters required" })
    .max(20, { message: "Maximum 20 characters allowed" }),
  checkbox: z.boolean({ required_error: "please check to confirm" }).optional(),
});

type TLoginSchema = z.infer<typeof LoginFormSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" ,checkbox:true},
  });

  // Form Submission Handler
  const Login: SubmitHandler<TLoginSchema> = async(data) => {
   
  //  console.log("Login data",data);
   loginUser(data.email,data.password);
  };
 

  const loginUser = async (email: string, password: string) => {
    setIsloading(true);
    try {
        const res = await apiLogin.getLogin({ email, password });
        // console.log("Response from login:", res);

        if (res && res.s) { 
            localStorage.setItem("auth", JSON.stringify(res.r)); 
            form.reset({email:"",password:""});
            navigate("/dashboard", { replace: true }); 
        } else {
            alert( res.m ?? "please enter valid username and password");
        }
    } catch {
      alert("error");
    } finally {
      setIsloading(false);
     
    }
 
  };

  return (
    <div className="bg-orange-50 ">
      <Navbar />
      <div className="flex gap-6 items-center md:w-[50%] pt-30 justify-center w-full ">
        {" "}
        <p className="font-bold text-3xl  md:text-4xl text-teal-500">
          Dashboard
        </p>
        <img src={loginlogo} className="md:h-15 h-12 " />
      </div>

      <div className=" flex flex-col xl:flex-row-reverse md:gap-10 px-5">
        {/* top image  */}

        <div className="flex-1/2  w-full">
          <img src={loginTopImage} className="h-auto w-full " />
        </div>
        {/* Right Side Form */}
        <div className="flex-1/2  xl:px-20  mt-5 mb-7 ">
          <div className="w-full pb-9 shadow-2xl bg-white rounded-md px-10 flex flex-col justify-center   ">
            <h1 className="pb-5 pt-4 text-xl  font-semibold text-center  ">
              Hi, Welcome Back!
            </h1>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(Login)}>
                {/* Username Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md"> Email </FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Enter Your Email"
                          className="h-9 bg-white outline-0"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pt-4 text-md ">Password</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Enter Password"
                          type="password"
                          className="h-9  mt-2 bg-white outline-0"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* checkbox  */}

                <div className="flex sm:flex-row gap-2 justify-between pt-5 items-center">
                  <div>
                    <FormField
                      control={form.control}
                      name="checkbox"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center ">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="h-5 w-5 bg-white"
                            />
                          </FormControl>

                          <FormLabel className=" text-sm">
                            Keep me signed in
                          </FormLabel>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <button className="text-red-500 hover:text-red-600  text-sm  cursor-pointer">
                      Forget Password?{" "}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center pt-5 px-20">
                  <Button
                    type="submit"
                    className="border-1 w-full h-10 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-lg "
                  >
                    {isloading ? (
                      <ImSpinner2 className="animate-spin duration-200" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            {/* Register Link */}
            <div className=" flex flex-col md:flex-row justify-center gap-4 pt-4">
              <p className="text-center">Don't have an account? </p>

              <button
                onClick={() => navigate("/register")}
                className="cursor-pointer text-blue-600 hover:text-blue-800 font-bold"
              >
                Register Now
              </button>
            </div>
            <div className="text-center mt-3">
              <p className="text-lg">OR</p>

              <div className="flex justify-center gap-7 py-3">
                <button>
                  <FaFacebookF
                    size={30}
                    className="bg-blue-600 cursor-pointer border-1 p-1 rounded-full text-white "
                  />
                </button>
                <button>
                  <FaTwitter
                    size={30}
                    className="text-black-200 cursor-pointer border-1 p-1 rounded-full"
                  />
                </button>
                <button>
                  <FaGoogle
                    size={30}
                    className="text-red-500 cursor-pointer border-1 p-1 rounded-full "
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
