import { useMemo } from "react";
import { usePathname } from "next/navigation";
import useConversation from "./useConversation";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { FaUserGroup } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: IoChatboxEllipsesOutline,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: FaUserGroup,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        icon: CiLogout,
        onClick: () => signOut(),
      },
    ],
    [pathname, conversationId]
  );
  return routes;
};

export default useRoutes;
