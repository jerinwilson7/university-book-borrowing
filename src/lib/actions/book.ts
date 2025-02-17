"use server";

import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { db } from "../../../database/drizzle";
import { books, borrowRecords } from "../../../database/schema";

export const borrowBook = async ({ bookId, userId }: BorrowBookParams) => {
  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        message: "Book is not available out of stock",
      };
    }

    const dueDate = dayjs().add(7, "days").toDate().toDateString();

    const record = await db
      .insert(borrowRecords)
      .values({ bookId, userId, dueDate, status: "BORROWED" });

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log("Book borrowing error", error);
    return {
      success: false,
      message: "Error occurred while borrowing the book",
    };
  }
};
