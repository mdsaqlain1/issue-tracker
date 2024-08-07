"use client";
import { Button, Card, Spinner, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/app/valiadtionScheme";
import { z } from "zod";
import Link from "next/link";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useState } from "react";

type loginSchema = z.infer<typeof authSchema>;
const SignUP = () => {
  const[error, setError] = useState<string>("");
  const [isSubmit, setSubmit] = useState(false);
  const { register, formState:{errors}, handleSubmit } = useForm<loginSchema>({
    resolver: zodResolver(authSchema),
  });
  const submit = handleSubmit(async (data) => {
    try {
      setSubmit(true);
      const res = await axios.post("/api/user/signup", data);
      if (res.data.status === 200) {
        console.log(res.data)
        window.location.href = "/";
      } else {
        setSubmit(false);
        setError(res.data.error);
        console.log(res.data.error);
      }
    } catch (error) {
      setSubmit(false);
      console.error("Error occured while signup");
    }
  }
);
  return (
    <div className="h-[32rem] flex justify-center items-center">
      <Card className="w-[22rem]">
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <Text as="p">Email :</Text>
            <TextField.Root
              placeholder="email"
              {...register("email")}
            ></TextField.Root>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </div>
          <div>
            <Text as="p">Username :</Text>
            <TextField.Root
              placeholder="username"
              {...register("username")}
            ></TextField.Root>
            <ErrorMessage>{errors.username?.message}</ErrorMessage>
          </div>
          <div>
            <Text as="p">Passwrod :</Text>
            <TextField.Root
              placeholder="password"
              {...register("password")}
            ></TextField.Root>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </div>
          <Button type="submit" disabled={isSubmit}>Signup {isSubmit && <Spinner/>}</Button>
          <Text as="p" color="red">{error}</Text>
          <Text as="p">Already existing user? <Link className="text-blue-700 hover:text-blue-500" href='/auth/login'>login</Link></Text>
        </form>
      </Card>
    </div>
  );
};

export default SignUP;
