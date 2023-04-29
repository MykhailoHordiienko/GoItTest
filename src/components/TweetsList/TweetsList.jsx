import { useCallback, useEffect, useMemo, useState } from "react";
import { TweetItem } from "../TweetItem/TweetItem";
import { getTweets } from "components/services/services";
import { saveLocalStorage } from "components/helpers/localStorageService";
import { getLocalStorage } from "components/helpers/localStorageService";
import { ErrorPage } from "components/ErrorPage/ErrorPage";
import { Pagination } from "components/Pagination/Pagination";
import { Dropdown } from "components/Dropdown/Dropdown";
const LOCAL_STORAGE_KEY = "LOCALSTORAGEKEY";
const CURRENT_PAGE = "CURRENTPAGE";
const CURRENT_FILTER = "CURRENTFILTER";

let PageSize = 3;

export const TweetsList = () => {
  const [tweets, setTweets] = useState(() => {
    return getLocalStorage(LOCAL_STORAGE_KEY);
  });
  const [currentPage, setCurrentPage] = useState(() => {
    return getLocalStorage(CURRENT_PAGE);
  });
  const [filter, setFilter] = useState(() => {
    return getLocalStorage(CURRENT_FILTER);
  });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const query = async () => {
      try {
        setLoader(true);
        const res = await getTweets();
        setTweets(res);
        saveLocalStorage(LOCAL_STORAGE_KEY, res);
      } catch (error) {
        setError(true);
        console.log(`Message: ${error.message} Code: ${error.name}`);
      } finally {
        setLoader(false);
      }
    };

    if (!tweets) {
      query();
    }
  }, [tweets]);

  const updateTweetsLocalStorage = useCallback(
    ({ id, follow, count }) => {
      const updatedTweets = tweets.map((item) => {
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
    (page) => {
      setCurrentPage(page);
      saveLocalStorage(CURRENT_PAGE, page);
      saveLocalStorage(CURRENT_FILTER, filter);
    },
    [filter]
  );

  const getVisibleTweets = (e) => {
    setFilter(e.target.value.toString());
    setCurrentPage(1);
    saveLocalStorage(CURRENT_PAGE, 1);
    saveLocalStorage(CURRENT_FILTER, e.target.value);
  };

  const [currentTweets, length] = useMemo(() => {
    if (!tweets) {
      return [[], 0];
    }
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    switch (filter) {
      case "showAll":
        const showAll = tweets.slice(firstPageIndex, lastPageIndex);
        return [showAll, tweets.length];
      case "follow":
        const follow = tweets
          .filter((item) => !item.follow)
          .slice(firstPageIndex, lastPageIndex);
        const followLength = tweets.filter((item) => !item.follow).length;
        return [follow, followLength];
      case "followings":
        const followings = tweets
          .filter((item) => item.follow)
          .slice(firstPageIndex, lastPageIndex);
        const followingsLength = tweets.filter((item) => item.follow).length;
        return [followings, followingsLength];

      default:
        return [[], 0];
    }
  }, [currentPage, filter, tweets]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <Dropdown
        getVisibleTweets={getVisibleTweets}
        filter={filter}
      />
      <ul className="flex items-center justify-center gap-[48px]">
        {loader || !currentTweets
          ? "Loading..."
          : currentTweets.map((tweet) => (
              <TweetItem
                updateTweetsLocalStorage={updateTweetsLocalStorage}
                key={tweet.id}
                tweet={tweet}
              />
            ))}
      </ul>
      {currentTweets && (
        <Pagination
          currentPage={currentPage}
          totalCount={length}
          pageSize={PageSize}
          onPageChange={handleChangePage}
        />
      )}
    </>
  );
};
