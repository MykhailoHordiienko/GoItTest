import { NavLink, useLocation } from "react-router-dom";
import helloGif from "../../gif/hello-gif.gif";

export const HomePage = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center gap-[48px]">
      <h1 className="text-[36px] text-mainWight">
        Welcome to the simple tweets App
      </h1>
      <NavLink
        className="button"
        to="/tweets"
        state={{ from: location }}>
        Tweets
      </NavLink>
      <img
        src={helloGif}
        alt="hello-gif"
        className="rounded-[36px]"
      />
    </div>
  );
};
