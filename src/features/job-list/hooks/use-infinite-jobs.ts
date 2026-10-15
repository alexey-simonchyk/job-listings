"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getJobs } from "@/lib/api/coople/browser-client";
import type { JobSummary } from "@/types/coople";
import type { Page } from "@/types/pagination";
import { JOBS_PAGE_SIZE } from "../utils/pagination";

export function useInfiniteJobs(initialJobs: Page<JobSummary>) {
  return useInfiniteQuery({
    queryKey: ["jobs", "infinite", JOBS_PAGE_SIZE],
    queryFn: ({ pageParam }) => getJobs({ pageNum: pageParam, pageSize: JOBS_PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      const nextPage = lastPageParam + 1;
      const lastPageHasJobs = lastPage.items.length > 0;
      const nextPageOffset = nextPage * JOBS_PAGE_SIZE;
      const hasJobsBeyondCurrentPage = nextPageOffset < lastPage.total;

      return lastPageHasJobs && hasJobsBeyondCurrentPage
        ? nextPage
        : undefined;
    },
    initialData: { pages: [initialJobs], pageParams: [0] },
    select: (data) => ({
      items: data.pages.flatMap((page) => page.items),
      total: data.pages[data.pages.length - 1].total,
    }),
    staleTime: 60_000,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
