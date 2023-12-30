import { db } from "./db";
import { getSelf } from "./auth-service";

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user
    .findUniqueOrThrow({ where: { id } })
    .catch(() => {
      throw new Error("User not found");
    });

  if (otherUser.id === self.id) {
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: { followerId: self.id, followingId: otherUser.id },
  });

  if (existingFollow) {
    throw new Error("Allready following");
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return follow;
};

export const unfollowUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user
    .findUniqueOrThrow({
      where: { id },
    })
    .catch(() => {
      throw new Error("User not found");
    });

  if (otherUser.id === self.id) {
    throw new Error("Cannot unfollow yourself");
  }

  const existingFollow = await db.follow
    .findFirstOrThrow({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    })
    .catch(() => {
      throw new Error("Not Following");
    });

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: { following: true },
  });

  return follow;
};