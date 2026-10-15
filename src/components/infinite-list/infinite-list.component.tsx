"use client";

import { useRef, type Key, type ReactNode, useCallback } from 'react';
import styles from "./infinite-list.module.css";

type InfiniteListProps<T> = {
  items: T[];
  getItemKey: (item: T) => Key;
  renderItem: (item: T) => ReactNode;
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
  isError: boolean;
  label: string;
  emptyState: ReactNode;
  messages?: {
    loading: string;
    error: string;
    end: string;
  };
};

export function InfiniteList<T>({
  items,
  getItemKey,
  renderItem,
  onLoadMore,
  hasNextPage,
  isFetching,
  isError,
  label,
  emptyState,
  messages = {
    loading: "Loading more items…",
    error: "Unable to load more items. Please try again.",
    end: "All available items have been loaded.",
  },
}: InfiniteListProps<T>) {
  const listRef = useRef<HTMLUListElement>(null);

  const scrollToTop = useCallback(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    listRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "instant" : "smooth",
      block: "start",
    });
  }, [listRef]);

  if (items.length === 0) return emptyState;

  return (
    <>
      <ul ref={listRef} className={styles.list} aria-label={label}>
        {items.map((item) => <li key={getItemKey(item)}>{renderItem(item)}</li>)}
      </ul>
      <div className={styles.loadMore}>
        <p role="status">
          {isFetching ? messages.loading : !hasNextPage ? messages.end : ""}
        </p>
        {isError && <p role="alert">{messages.error}</p>}
        {hasNextPage && (
          <button type="button" className={styles.action} disabled={isFetching} onClick={onLoadMore}>
            {isError ? "Try again" : "Load more"}
          </button>
        )}
      </div>
      <button
        type="button"
        className={`${styles.action} ${styles.scrollToTop}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <span aria-hidden="true">↑</span>
      </button>
    </>
  );
}
