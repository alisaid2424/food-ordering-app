import { cache } from "@/utils/cache";
import { USERS_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";

export const getUsers = cache(
  async (pageNumber: number) => {
    const users = await prisma.user.findMany({
      skip: USERS_PER_PAGE * (pageNumber - 1),
      take: USERS_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });

    return users;
  },
  ["users"],
  { revalidate: 3600 }
);

export const getUser = cache(
  (userId: string) => {
    const user = prisma.user.findUnique({ where: { id: userId } });
    return user;
  },
  [`user-${crypto.randomUUID()}`],
  { revalidate: 3600 }
);
