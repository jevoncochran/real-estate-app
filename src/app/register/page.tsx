"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import classes from "./register.module.css";
import { useRouter } from "next/navigation";
import { responseType } from "@/constants";
import { notify } from "@/utils/notify";

const RegisterPage = () => {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const missingFields =
    credentials.username === "" ||
    credentials.email === "" ||
    credentials.password === "";

  const passwordBelowMinCharacters = credentials.password.length < 6;

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

    if (missingFields) {
      return notify("Please fill out all fields", responseType.error);
    }

    if (passwordBelowMinCharacters) {
      return notify(
        "Password must be at least 6 characters",
        responseType.error
      );
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (res?.error === null) {
        notify("Successfully registered, now login", responseType.success);

        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        notify("Error occurred during sign up", responseType.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div>RegisterPage</div>;
};

export default RegisterPage;
