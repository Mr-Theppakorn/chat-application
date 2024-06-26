import prisma from "@/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    if (!users) {
      return null;
    }

    return users;
  } catch (error: any) {
    return null;
  }
};

export default getUsers;
