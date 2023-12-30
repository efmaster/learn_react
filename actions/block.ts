"use server";

import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

function revalidate(username: string) {
  revalidatePath("/");
  if (username) {
    revalidatePath(`/${username}`);
  }
}

export const onBlock = async (id: string) => {
  // TODO: Adapt to disconnect from livestream
  // Todo: Allow ability to kick the guest
  const blockedUser = await blockUser(id);

  revalidate(blockedUser.blocked.username);

  return blockedUser;
};

export const onUnblock = async (id: string) => {
  const unblockedUser = await unblockUser(id);
  revalidate(unblockedUser.blocked.username);

  return unblockedUser;
};
