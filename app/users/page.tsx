"use client";
import EmptyState from "@/components/ui/EmptyState";
import { signOut } from "next-auth/react";

const UserPage = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  );
};

export default UserPage;
