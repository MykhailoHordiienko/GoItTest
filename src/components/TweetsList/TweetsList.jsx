import { useEffect, useState } from "react";
import { TweetItem } from "../TweetItem/TweetItem";
import { getTweets } from "components/services/services";
import { saveLocalStorage } from "components/helpers/localStorageService";
import { getLocalStorage } from "components/helpers/localStorageService";
import { ErrorPage } from "components/ErrorPage/ErrorPage";
const LOCAL_STORAGE_KEY = "LOCALSTORAGEKEY";

export const TweetsList = () => {
  const [tweets, setTweets] = useState(() => {
    return getLocalStorage(LOCAL_STORAGE_KEY);
  });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  console.log(tweets);

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

  if (error) {
    return <ErrorPage />;
  }

  return (
    <ul>
      {loader || !tweets
        ? "Loading..."
        : tweets.map((tweet) => (
            <TweetItem
              key={tweet.id}
              tweet={tweet}
            />
          ))}
    </ul>
  );
};
