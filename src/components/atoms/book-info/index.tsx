import Image from "next/image";

interface BookInfoProps {
  label?: string;
  value: string;
  icon?: string;
}

export const BookInfo = ({ label, value, icon }: BookInfoProps) => {
  return (
    <p className="flex gap-1">
      {icon && <Image src={icon} width={22} height={22} alt="book-info-icon" />}
      {label} <span className="font-semibold text-light-200">{value}</span>
    </p>
  );
};
