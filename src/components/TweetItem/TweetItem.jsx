import user from "../../gif/Hansel.png";

export const TweetItem = () => {
  return (
    <li>
      <article className="w-[380px] h-[460px] flex flex-col items-center justify-end rounded-[20px] bg-mainGradient">
        <div className="mb-[26px]">
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
      </article>
    </li>
  );
};
