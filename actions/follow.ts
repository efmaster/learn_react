"use server";

import { followUser, unfollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

function revalidate(username: string) {
  revalidatePath("/");
  if (username) {
    revalidatePath(`/${username}`);
  }
}

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidate(followedUser.following.username);

    return followedUser;
  } catch (error) {
    throw new Error("Internal Error");
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);
    revalidate(unfollowedUser.following.username);

    return unfollowedUser;
  } catch (error) {
    throw new Error("Internal Error");
  }
};
