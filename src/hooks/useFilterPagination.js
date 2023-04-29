import { useMemo } from 'react';

export const useFilterPagination = ({
  tweets,
  currentPage,
  filter,
  pageSize,
}) => {
  const filterPagination = useMemo(() => {
    if (!tweets) {
      return [[], 0];
    }
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    switch (filter) {
      case 'showAll':
        const showAll = tweets.slice(firstPageIndex, lastPageIndex);

        return [showAll, tweets.length];

      case 'follow':
        const follow = tweets
          .filter(item => !item.follow)
          .slice(firstPageIndex, lastPageIndex);

        const followLength = tweets.filter(item => !item.follow).length;

        return [follow, followLength];

      case 'followings':
        const followings = tweets
          .filter(item => item.follow)
          .slice(firstPageIndex, lastPageIndex);

        const followingsLength = tweets.filter(item => item.follow).length;

        return [followings, followingsLength];

      default:
        return [[], 0];
    }
  }, [currentPage, filter, pageSize, tweets]);

  return filterPagination;
};
