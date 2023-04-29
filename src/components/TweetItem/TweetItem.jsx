import { useState } from "react";
import defaultUserAvatar from "../../gif/Hansel.png";

export const TweetItem = ({ tweet, updateTweetsLocalStorage }) => {
  const {
    avatar = defaultUserAvatar,
    followers,
    tweets,
    id,
    follow = false,
  } = tweet;
  const [isFollow, setIsFollow] = useState(follow);
  const [count, setCount] = useState(followers);

  const handleToggleFollow = () => {
    const updateFollow = !isFollow;
    const updateCount = isFollow ? count - 1 : count + 1;
    setIsFollow(updateFollow);
    setCount(updateCount);
    updateTweetsLocalStorage({ id, count: updateCount, follow: updateFollow });
  };

  return (
    <li>
      <article className="w-[380px] h-[460px] rounded-[20px] bg-mainGradient">
        <div className="h-full bg-bgLogo bg-no-repeat bg-[left_20px_top_20px]">
          <div className="flex flex-col items-center justify-end h-full bg-bgTweet bg-no-repeat bg-[center_top_28px]">
            <div className="relative before:h-[9px] before:w-[380px] before:absolute before:bg-mainWight z-0 before:z-[-1] before:shadow-avatarLineShadow before:inset-y-1/2 before:inset-x-1/2 before:-translate-y-[150%] before:-translate-x-1/2">
              <div className="mb-[26px] flex justify-center items-center w-[80px] h-[80px] rounded-full bg-mainWight shadow-avatarBoxShadow ">
                <div className="flex justify-center items-center w-[62px] h-[62px] rounded-full bg-mainGradient">
                  <img
                    className="w-[62px] inline-block rounded-full"
                    src={avatar}
                    alt="user"
                  />
                </div>
              </div>
            </div>
            <p className="mb-[16px] text">
              {tweets.toLocaleString("en-US")} Tweets
            </p>
            <p className="mb-[26px] text">
              {count.toLocaleString("en-US")} Followers
            </p>
            <button
              onClick={handleToggleFollow}
              className={`${isFollow ? "buttonActive" : "button"} mb-[36px]`}
              type="button">
              {isFollow ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </article>
    </li>
  );
};
