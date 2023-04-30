import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TweetsList } from '../../components/TweetsList/TweetsList';
import { getTweetsPagination } from 'services/services';
import { getLocalStorage, saveLocalStorage } from 'helpers/localStorageService';
import { useFilterPagination } from 'hooks/useFilterPagination';
import { ErrorPage } from 'components/ErrorPage/ErrorPage';
import { Loader } from 'components/Loader/Loader';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { Pagination } from 'components/Pagination/Pagination';
import { variables } from '../../variables/variables';

const { CURRENT_FILTER, CURRENT_PAGE, LOCAL_STORAGE_KEY, PAGE_SIZE } =
  variables;

export const TweetsPage = () => {
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
  const location = useLocation();

  useEffect(() => {
    const query = async () => {
      try {
        setLoader(true);
        const res = await getTweetsPagination({ page: 1, limit: PAGE_SIZE });
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
        limit: PAGE_SIZE,
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

  const [currentTweets, length] = useFilterPagination({
    tweets,
    currentPage,
    filter,
    pageSize: PAGE_SIZE,
  });

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
      if (currentTweets.length <= 1) {
        setCurrentPage(prev => prev - 1);
      }
    },
    [currentTweets.length, tweets]
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

  const needShowLoadMoreBTn =
    currentPage * PAGE_SIZE === tweets.length && filter === 'showAll';

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <Link className="button" to={location.state?.from ?? '/'}>
        Back
      </Link>
      {loader || !currentTweets ? (
        <Loader />
      ) : (
        <>
          <Dropdown getVisibleTweets={getVisibleTweets} filter={filter} />
          <TweetsList
            currentTweets={currentTweets}
            updateTweetsLocalStorage={updateTweetsLocalStorage}
          />
          {currentTweets && (
            <Pagination
              currentPage={currentPage}
              totalCount={length}
              pageSize={PAGE_SIZE}
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
