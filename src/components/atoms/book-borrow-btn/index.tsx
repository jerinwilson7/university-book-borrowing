"use client";

import { Book } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { borrowBook } from "@/lib/actions/book";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BookBorrowBtnProps {
  bookId: string;
  userId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

export const BorrowBookBtn = ({
  bookId,
  userId,
  borrowingEligibility: { isEligible, message },
}: BookBorrowBtnProps) => {
  const [isBorrowing, setIsBorrowing] = useState(false);
  const router = useRouter();

  const onBorrowRequest = async () => {
    if (!isEligible) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return;
    }
    setIsBorrowing(true);
    try {
      const response = await borrowBook({ bookId, userId });
      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
        });
        router.push("/my-profile");
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while borrowing the book",
        variant: "destructive",
      });
    } finally {
      setIsBorrowing;
      false;
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={onBorrowRequest}
      disabled={isBorrowing}
    >
      <Image width={20} height={20} src={Book} alt="Book" />
      <span className="font-bebas-neue text-xl text-dark-100 ">
        {isBorrowing ?
        "isBorrowing....." :
        "BORROW BOOK REQUEST"
        }
      </span>
    </Button>
  );
};
