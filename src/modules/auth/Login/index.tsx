"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setRefreshToken, setToken } from "@/helper/storage";

import Label from "@/components/CustomLabel";
import { CustomInput } from "@/components/CustomInput";
import { Checkbox, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import user from "@/assets/user.svg";
import eye from "@/assets/eye.svg";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import InputError from "@/components/InputError";
import schema from "./schema";
import { Login as login } from "@/api/auth.service";
import { setCookie } from "nookies";

const Login = () => {
  const router = useRouter();
  const [isPassword, setIsPassword] = useState(true);

  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "admin@gmail.com",
      password: "123456",
    },
  });

  const { mutate: loginMutation, isLoading } = useMutation((data: any) => login(data), {
    onSuccess(response: any) {
      message.success("Success!");

      setToken(response?.accessToken);
      setRefreshToken(response?.refreshToken);

      setCookie(null, "ACCESS_TOKEN", response?.accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        httpOnly: false,
      });

      setCookie(null, "ROLE", response?.role, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        httpOnly: false,
      });

      router.replace("/");
    },
    onError(err: any) {
      message.error(err.response?.data?.message);
    },
  });

  const onSubmit = () => {
    const data = getValues();
    loginMutation(data);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <div className="mx-auto flex flex-col gap-8 sm:w-auto 2xs:w-[390px] pb-12 pt-12 md:pt-[64px] bg-white shadow-md rounded-none xs:rounded-xl px-4 xs:px-6">
        <div className="text-center">
          <h1 className="text-[#212529] font-medium sm:text-[24px] md:text-[36px] mb-6">Login</h1>
          <h2 className="text-[#6c757d] ">Welcome back! Please enter your details.</h2>
        </div>

        <div className="flex flex-col gap-4">
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <Label label="Email" />
                <CustomInput
                  className="!h-12 w-[390px] bg-[#FBFBFB]"
                  placeholder="Enter your email"
                  onChange={onChange}
                  value={value}
                />
                <InputError error={errors.email?.message} />
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <Label label="Password" />
                <CustomInput
                  placeholder="Password"
                  type={isPassword ? "password" : "text"}
                  className="!h-12 w-[390px] bg-[#FBFBFB]"
                  suffixIcon={
                    <Image src={eye} alt="icon" onClick={() => setIsPassword(!isPassword)} className="cursor-pointer" />
                  }
                  onChange={onChange}
                  value={value}
                  onKeyDown={handleKeyDown}
                  defaultValue="123456"
                />
                <InputError error={errors.password?.message} />
              </div>
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div
            className="btn-primary h-12 flex items-center justify-center !font-medium"
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <Spin indicator={<LoadingOutlined spin style={{ color: "white" }} />} />
            ) : (
              <>
                <div>
                  <Image src={user} alt="icon" className="mr-2" />
                </div>
                Login
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
