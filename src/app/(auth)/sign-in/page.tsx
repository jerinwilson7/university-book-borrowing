"use client";

import { AuthForm } from "@/components/organisms";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/schema/auth";
const SignIn = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  );
};

export default SignIn;
