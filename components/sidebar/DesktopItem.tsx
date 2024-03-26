"use client";

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  href: string;
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const DesktopItem = ({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: DesktopItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
           group
           flex
           gap-x-3
           rounded-md
           p-3
           text-sm
           leading-6
           font-semibold
           hover:text-black
           hover:bg-gray-100
      `,
          active && "bg-gray-100 text-black"
        )}
      >
        <Icon
          className={clsx(
            "w-6 h-6 hover:text-sky-500 shrink-0",
            active && "text-sky-500"
          )}
        />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
