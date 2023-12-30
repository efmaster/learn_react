"use client";

import { User } from "@prisma/client";

import { useSidebar } from "@/store/use-sidebar";
import { UserItem, UserItemSkeleton } from "./user-item";

interface RecommendedProps {
  data: User[];
}

export function Recommended({ data }: RecommendedProps) {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;
  return (
    <div>
      {showLabel && (
        <div className="mb-4 pl-6">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
          />
        ))}
      </ul>
    </div>
  );
}

export function RecommendedSkeleton() {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
}
