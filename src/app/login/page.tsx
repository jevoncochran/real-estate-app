"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import classes from "./login.module.css";
import { useRouter } from "next/navigation";
import { ToastContainer, ToastContent, toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { responseType } from "@/constants";
import { notify } from "@/utils/notify";

const LoginPage = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (credentials.password === "" || credentials.email === "") {
      return notify("Please fill out all fields", responseType.error);
    }

    if (credentials.password.length < 6) {
      return notify(
        "Password must be 6 or more characters",
        responseType.error
      );
    }

    try {
      const res = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (res?.error === null) {
        notify(
          "Successfully logged in, enjoy your browsing!",
          responseType.success
        );

        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        notify("Error occurred while logging in", responseType.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputWrapper}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleChange} />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <button className={classes.loginBtn}>Login</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
