"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}
const MobileItem = ({ href, icon: Icon, active, onClick }: MobileItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      href={href}
      className={clsx(
        `
           group
           flex
           justify-center
           gap-x-3
           w-full
           p-4
           text-sm
           leading-6
           font-semibold
           hover:text-black
           hover:bg-gray-100
      `,
        active && "bg-gray-100 text-black"
      )}
      onClick={handleClick}
    >
      <Icon />
    </Link>
  );
};

export default MobileItem;
