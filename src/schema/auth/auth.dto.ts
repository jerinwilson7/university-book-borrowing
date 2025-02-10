import { z } from "zod";
import { signInSchema, signUpSchema } from "./auth.schema";

export type RegisterForm = z.infer<typeof signUpSchema>;
export type LoginForm = z.infer<typeof signInSchema>;
