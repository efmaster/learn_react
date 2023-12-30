import { db } from "./db";
// import { getSelf } from "./auth-service";

export const getRecommended = async () => {
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 5000);
  // }); // For testing

  //   const self = await getSelf();
  const users = await db.user.findMany({
    // where: {
    //   NOT: {
    //     id: self.id,
    //   },
    // },
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
