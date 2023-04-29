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

let PageSize = 3;

export const TweetsList = () => {
  const [tweets, setTweets] = useState(() => {
    return getLocalStorage(LOCAL_STORAGE_KEY);
  });
  const [currentPage, setCurrentPage] = useState(() => {
    return getLocalStorage(CURRENT_PAGE);
  });
  const [visibleTweets, setVisibleTweets] = useState(tweets);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  console.log(visibleTweets);

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

  const handleChangePage = useCallback((page) => {
    setCurrentPage(page);
    saveLocalStorage(CURRENT_PAGE, page);
  }, []);

  const getVisibleTweets = (e) => {
    if (!e) {
      return setVisibleTweets(tweets);
    }
    switch (e.target.value) {
      case "showAll":
        return setVisibleTweets(tweets);
      case "follow":
        return setVisibleTweets(tweets.filter((item) => !item.follow));
      case "followings":
        return setVisibleTweets(tweets.filter((item) => item.follow));

      default:
        return tweets;
    }
  };

  const currentTweets = useMemo(() => {
    if (!visibleTweets) {
      return;
    }
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    console.log(visibleTweets.slice(firstPageIndex, lastPageIndex));
    return visibleTweets.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, visibleTweets]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <Dropdown getVisibleTweets={getVisibleTweets} />
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
      {visibleTweets && (
        <Pagination
          currentPage={currentPage}
          totalCount={visibleTweets.length}
          pageSize={PageSize}
          onPageChange={handleChangePage}
        />
      )}
    </>
  );
};
