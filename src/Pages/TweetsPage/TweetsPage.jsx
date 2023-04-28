import { Link, useLocation } from "react-router-dom";
import { TweetsList } from "../../components/TweetsList/TweetsList";

export const TweetsPage = () => {
  const location = useLocation();

  return (
    <>
      <Link to={location.state?.from ?? "/"}>Back</Link>
      <TweetsList />
    </>
  );
};
