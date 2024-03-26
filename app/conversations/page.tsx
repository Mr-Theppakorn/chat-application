"use client";
import EmptyState from "@/components/ui/EmptyState";
import useConversation from "@/hooks/useConversation";
import clsx from "clsx";

const ConversationsPage = () => {
  const { isOpen } = useConversation();
  return (
    <div className={clsx("lg:pl-80 h-full", isOpen ? "hidden" : "block")}>
      <EmptyState />
    </div>
  );
};

export default ConversationsPage;
