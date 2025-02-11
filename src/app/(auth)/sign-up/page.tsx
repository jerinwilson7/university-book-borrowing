"use client"

import { AuthForm } from "@/components/organisms";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/schema/auth";
const SignUp = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={signUp}
    />
  );
};

export default SignUp;
