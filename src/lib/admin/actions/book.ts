"use server";

import { db } from "../../../../database/drizzle";
import { books } from "../../../../database/schema";

export const createBook = async (book: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...book,
        availableCopies: book.totalCopies,
      })
      .returning();

    return{
      success: true,
      data: JSON.parse(JSON.stringify(newBook))
    }
  } catch (error) {
    console.log("create Book Error  :", error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};
