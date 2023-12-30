"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  //   const isClient = useIsClient();
  const { collapsed } = useCreatorSidebar((state) => state);

  //   if (!isClient) {
  //     return (
  //       <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2D2E35] bg-background lg:w-60">
  //         <ToggleSkeleton />
  //         <FollowingSkeleton />
  //         <RecommendedSkeleton />
  //       </aside>
  //     );
  //   }

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "lg:w-[70px]",
      )}
    >
      {children}
    </aside>
  );
}
