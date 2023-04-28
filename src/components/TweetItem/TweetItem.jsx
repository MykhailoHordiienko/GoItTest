import user from "../../gif/Hansel.png";

export const TweetItem = () => {
  return (
    <li>
      <article className="w-[380px] h-[460px] rounded-[20px] bg-mainGradient">
        <div className="h-full bg-bgLogo bg-no-repeat bg-[left_20px_top_20px]">
          <div className="flex flex-col items-center justify-end h-full bg-bgTweet bg-no-repeat bg-[center_top_28px]">
            <div className="relative before:h-[9px] before:w-[380px] before:absolute before:bg-mainWight z-0 before:z-[-1] before:shadow-avatarLineShadow before:inset-y-1/2 before:inset-x-1/2 before:-translate-y-[150%] before:-translate-x-1/2">
              <div className="mb-[26px] flex justify-center items-center w-[80px] h-[80px] rounded-[50%] bg-mainWight shadow-avatarBoxShadow ">
                <div className="flex justify-center items-center w-[62px] h-[62px] rounded-[50%] bg-mainGradient">
                  <img
                    className="w-[62px] inline-block"
                    src={user}
                    alt="user"
                  />
                </div>
              </div>
            </div>
            <p className="mb-[16px] text"> 777 tweets</p>
            <p className="mb-[26px] text">100,501 Followers</p>
            <button
              className="mb-[36px] button"
              type="button">
              Button
            </button>
          </div>
        </div>
      </article>
    </li>
  );
};
