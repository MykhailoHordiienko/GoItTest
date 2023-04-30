import { TweetItem } from '../TweetItem/TweetItem';
import { ErrorPage } from 'components/ErrorPage/ErrorPage';

export const TweetsList = ({ currentTweets, updateTweetsLocalStorage }) => {
  return (
    <>
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
    </>
  );
};
