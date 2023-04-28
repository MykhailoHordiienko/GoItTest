import user from "../../gif/Hansel.png";

export const TweetItem = () => {
  return (
    <li>
      <article className="w-[380px] h-[460px] rounded-[20px] bg-mainGradient">
        <div className="h-full bg-bgLogo bg-no-repeat bg-[left_20px_top_20px]">
          <div className="flex flex-col items-center justify-end h-full bg-bgTweet bg bg-no-repeat bg-[center_top_28px]">
            <div className="mb-[26px] rounded-[100%] border-[9px] border-mainWight shadow-avatarBoxShadow before:border-[9px] before:absolute before:w-[380px]">
              <img
                className="w-[62px] h-[62px]"
                src={user}
                alt="user"
              />
            </div>
            <p className="mb-[16px]"> 777 tweets</p>
            <p className="mb-[26px]">100,501 Followers</p>
            <button
              className="mb-[36px]"
              type="button">
              Button
            </button>
          </div>
        </div>
      </article>
    </li>
  );
};
