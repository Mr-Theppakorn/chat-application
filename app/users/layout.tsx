import Sidebar from "@/components/sidebar/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./_components/UserList";

interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList users={users!} />
        {children}
      </div>
    </Sidebar>
  );
};

export default layout;
