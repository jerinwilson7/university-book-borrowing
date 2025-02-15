import { z } from "zod";
import { bookSchema } from "./book.schema";

export type BookForm = z.infer<typeof bookSchema>;
