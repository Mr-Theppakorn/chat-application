"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/inputs/Input";
import Button from "@/components/ui/Button";
import AuthSocial from "./AuthSocial";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Types = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const router = useRouter();
  const [types, setTypes] = useState<Types>("LOGIN");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const toggleType = useCallback(() => {
    if (types === "LOGIN") {
      setTypes("REGISTER");
    } else {
      setTypes("LOGIN");
    }
  }, [types]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (types === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged in");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }

    if (types === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          toast.success("Registered successfully");
          setTypes("LOGIN");
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => setIsLoading(false));
    }
  };

  const loginAction = (action: string) => {
    setIsLoading(true);
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in");
          router.push("/users");
        }
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="mt-8 w-full sm:mx-auto sm-w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {types === "REGISTER" && (
            <Input
              label="Name"
              id="name"
              register={register}
              errors={errors}
              required
            />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            required
          />
          <div>
            <Button type="submit" fullWidth>
              {types === "LOGIN" ? "Login" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocial icon={FcGoogle} onClick={() => loginAction("google")} />
            <AuthSocial
              icon={IoLogoGithub}
              onClick={() => loginAction("github")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {types === "LOGIN"
              ? "New to Messenger ?"
              : "Already have an account ?"}
          </div>
          <div
            onClick={toggleType}
            className="underline cursor-pointer text-blue-500"
          >
            {types === "LOGIN" ? "Sign up" : "Sign in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
