"use client";

import { AuthForm } from "@/components/organisms";
import { signInSchema } from "@/schema/auth";
const SignIn = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={() => {}}
    />
  );
};

export default SignIn;
