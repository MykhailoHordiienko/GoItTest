import { useCallback, useEffect, useState } from 'react';
import { TweetItem } from '../TweetItem/TweetItem';
import { getTweetsPagination } from 'services/services';
import { saveLocalStorage } from 'helpers/localStorageService';
import { getLocalStorage } from 'helpers/localStorageService';
import { ErrorPage } from 'components/ErrorPage/ErrorPage';
import { Pagination } from 'components/Pagination/Pagination';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { useFilterPagination } from 'hooks/useFilterPagination';
import { Loader } from 'components/Loader/Loader';
const LOCAL_STORAGE_KEY = 'LOCALSTORAGEKEY';
const CURRENT_PAGE = 'CURRENTPAGE';
const CURRENT_FILTER = 'CURRENTFILTER';
let pageSize = 3;

export const TweetsList = () => {
  const [tweets, setTweets] = useState(() => {
    return getLocalStorage(LOCAL_STORAGE_KEY) ?? [];
  });
  const [currentPage, setCurrentPage] = useState(() => {
    return getLocalStorage(CURRENT_PAGE) ?? 1;
  });
  const [filter, setFilter] = useState(() => {
    return getLocalStorage(CURRENT_FILTER) ?? 'showAll';
  });
  const [dataEnd, setDataEnd] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const query = async () => {
      try {
        setLoader(true);
        const res = await getTweetsPagination({ page: 1, limit: pageSize });
        setTweets(res);
        saveLocalStorage(LOCAL_STORAGE_KEY, res);
      } catch (error) {
        setError(true);
        console.log(`Message: ${error.message} Code: ${error.name}`);
      } finally {
        setLoader(false);
      }
    };

    if (tweets.length <= 0) {
      query();
    }
  }, [tweets]);

  const loadMore = async () => {
    try {
      setLoader(true);
      const res = await getTweetsPagination({
        page: currentPage + 1,
        limit: pageSize,
      });
      if (res.length <= 0) {
        setDataEnd(true);
        return;
      }
      setTweets(prev => [...prev, ...res]);
      saveLocalStorage(LOCAL_STORAGE_KEY, [...tweets, ...res]);
    } catch (error) {
      setError(true);
      console.log(`Message: ${error.message} Code: ${error.name}`);
    } finally {
      setLoader(false);
    }
  };

  const updateTweetsLocalStorage = useCallback(
    ({ id, follow, count }) => {
      const updatedTweets = tweets.map(item => {
        if (item.id !== id) {
          return item;
        }
        return { ...item, follow, followers: count };
      });
      setTweets(updatedTweets);
      saveLocalStorage(LOCAL_STORAGE_KEY, updatedTweets);
    },
    [tweets]
  );

  const handleChangePage = useCallback(
    page => {
      setCurrentPage(page);
      saveLocalStorage(CURRENT_PAGE, page);
      saveLocalStorage(CURRENT_FILTER, filter);
    },
    [filter]
  );

  const getVisibleTweets = useCallback(e => {
    setFilter(e.target.value.toString());
    setCurrentPage(1);
    saveLocalStorage(CURRENT_PAGE, 1);
    saveLocalStorage(CURRENT_FILTER, e.target.value);
  }, []);

  const [currentTweets, length] = useFilterPagination({
    tweets,
    currentPage,
    filter,
    pageSize,
  });

  const needShowLoadMoreBTn =
    currentPage * pageSize === tweets.length && filter === 'showAll';

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {loader || !currentTweets ? (
        <Loader />
      ) : (
        <>
          <Dropdown getVisibleTweets={getVisibleTweets} filter={filter} />
          <ul className="flex items-center justify-center gap-[48px]">
            {currentTweets.length <= 0 ? (
              <ErrorPage text={'No Tweets In This Filter'} />
            ) : (
              currentTweets.map(tweet => (
                <TweetItem
                  updateTweetsLocalStorage={updateTweetsLocalStorage}
                  key={tweet.id}
                  tweet={tweet}
                />
              ))
            )}
          </ul>
          {currentTweets && (
            <Pagination
              currentPage={currentPage}
              totalCount={length}
              pageSize={pageSize}
              onPageChange={handleChangePage}
            />
          )}
          {needShowLoadMoreBTn && (
            <button
              className="button mx-auto"
              type="button"
              disabled={dataEnd}
              onClick={loadMore}
            >
              {dataEnd ? 'No More Tweets ' : 'Load More'}
            </button>
          )}
        </>
      )}
    </>
  );
};
