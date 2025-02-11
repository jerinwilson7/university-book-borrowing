"use client";

import { ImageUpload } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";

interface AuthFormProps<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP";
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}
export const AuthForm = <T extends FieldValues>({
  defaultValues,
  onSubmit,
  schema,
  type,
}: AuthFormProps<T>) => {
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const router = useRouter();

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const response = await onSubmit(data);

    if (response.success) {
      toast({
        title: "Success",
        description: isSignIn
          ? "You have successfully signed in"
          : "You have successfully signed up",
      });
      router.push("/");
    } else {
      toast({
        title: `Error: ${isSignIn ? "Sign in" : "Sign up"}`,
        description: response.error ?? "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const isSignIn = type === "SIGN_IN";

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn
          ? "Welcome Back to the BookWise"
          : "Create Your Library Account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload onFileChange={field.onChange} />
                    ) : (
                      <Input
                        className="form-input"
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button className="form-btn" type="submit">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
        <p className="flex gap-2">
          {isSignIn
            ? "Don't have an account already?"
            : "Have an account already? "}
          <Link
            className="text-light-200"
            href={isSignIn ? "/sign-up" : "/sign-in"}
          >
            {isSignIn ? "Register here" : "Sign in"}
          </Link>
        </p>
      </Form>
    </div>
  );
};
