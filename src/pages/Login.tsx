import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/formSchema";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { login } from "../apis/auth";
import Header from "../components/Header";
import { useTypeDispatch, useTypeSelector } from "../hooks/baseHooks";
import { checkLogin } from "../redux/usersSlice";

function Login() {
  const history = useHistory();
  const dispatch = useTypeDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const { status, data, error, refetch } = useQuery(
  //   "login",
  //   () => login(formData.email, formData.password),
  //   {
  //     enabled: !!(formData.email && formData.password),
  //   }
  // );

  // console.log(status, data, error);

  const onSubmit = async (data: any) => {
    console.log(data);
    setIsLoading(true);
    try {
      const response = await login(data.email, data.password);
      console.log(response, response.data.accessToken);
      dispatch(checkLogin(true));
      localStorage.setItem("accessToken", response.data.accessToken);
      history.replace("/dashboard");
    } catch (error) {
      console.error(error.message, error.response);
      setError(error.response?.data.msg || error.message);
    }
    setIsLoading(false);
  };

  const handleClick = () => {
    history.push({
      pathname: "/register",
    });
  };

  return (
    <>
      <Header />
      <div className=' h-screen flex flex-col justify-center items-center'>
        <div className='dark:text-white text-2xl font-bold mb-5'>登录</div>
        <div className='text-red-500 mb-3'>{error}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className='border-b-2 p-3 m-2'
            placeholder='你的邮箱...'
            {...register("email")}
          />
          <div className='text-red-500 text-sm mb-3'>
            {errors.email?.message}
          </div>
          <input
            className='border-b-2 p-3 m-2'
            type='password'
            placeholder='登录密码...'
            {...register("password")}
          />
          <div className='text-red-500 text-sm mb-3'>
            {errors.password?.message}
          </div>
          <button
            className='bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white shadow-lg px-10 py-3'
            disabled={isLoading}
          >
            {isLoading ? "登录中..." : "登录"}
          </button>
        </form>
        <div
          className='dark:text-white text-sm pt-5 border-b border-gray-500'
          onClick={handleClick}
        >
          还没账号？点此注册
        </div>
      </div>
    </>
  );
}

export default Login;
