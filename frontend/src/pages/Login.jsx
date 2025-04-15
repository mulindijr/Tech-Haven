import { useState, useContext } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaArrowLeftLong } from "react-icons/fa6";
import { loginVideo } from "../assets/vids";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const { token, setToken, backendUrl } = useContext(ShopContext);

  // If the user is already logged in, immediately redirect to home.
  if (token) {
    return <Navigate to="/" />;
  }

  const validationSchema = Yup.object({
    firstName: currentState === "Sign Up" ? Yup.string().required("First name is required") : Yup.string(),
    lastName: currentState === "Sign Up" ? Yup.string().required("Last name is required") : Yup.string(),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const onSubmitHandler = async (values, { setSubmitting }) => {
    try {
      const url = currentState === "Sign Up" ? "/api/user/register" : "/api/user/login";
      const response = await axios.post(backendUrl + url, values);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setSubmitting(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controlsList="nodownload"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={loginVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col sm:w-full max-w-96 m-auto gap-4 text-gray-800 bg-transparent bg-opacity-90 px-5 py-5 rounded-lg shadow-xl border-2">
              <div className="flex items-center gap-20">
                <FaArrowLeftLong onClick={() => window.history.back()} className="w-6 h-6 cursor-pointer text-gray-100 hover:text-red-400" />
                <h2 className="text-2xl font-semibold text-center text-gray-100">{currentState}</h2>
              </div>
              {currentState === "Sign Up" && (
                <>
                  <div>
                    <Field
                      name="firstName"
                      placeholder="First Name"
                      className="w-full px-3 py-2 border border-gray-400 outline-none rounded"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <Field
                      name="lastName"
                      placeholder="Last Name"
                      className="w-full px-3 py-2 border border-gray-400 outline-none rounded"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                  </div>
                </>
              )}

              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border border-gray-400 outline-none rounded"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-3 py-2 border border-gray-400 outline-none rounded"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                >
                  {showPassword ? <AiOutlineEyeInvisible className="w-5 h-5" /> : <AiOutlineEye className="w-5 h-5" />}
                </span>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              {currentState === "Sign Up" && (
                <div className="flex gap-2 items-center">
                  <Field type="checkbox" name="terms" required className="cursor-pointer" />
                  <p className="text-sm text-gray-100">I agree to the terms of use and privacy policy</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 text-xl rounded text-white bg-red-500 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <AiOutlineLoading3Quarters className="animate-spin w-5 h-5" />
                    {currentState === "Sign Up" ? "Signing up..." : "Logging in..."}
                  </div>
                ) : (
                  currentState === "Sign Up" ? "Create Account" : "Login"
                )}
              </button>

              {currentState === "Login" ? (
                <p className="text-center text-gray-100">
                  Create a new account?{" "}
                  <span onClick={() => setCurrentState("Sign Up")} className="cursor-pointer text-red-500 hover:underline">
                    Click here
                  </span>
                </p>
              ) : (
                <p className="text-center text-gray-100">
                  Already have an account?{" "}
                  <span onClick={() => setCurrentState("Login")} className="cursor-pointer text-red-500 hover:underline">
                    Login here
                  </span>
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
