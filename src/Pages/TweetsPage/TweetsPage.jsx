import { Link, useLocation } from 'react-router-dom';
import { TweetsList } from '../../components/TweetsList/TweetsList';

export const TweetsPage = () => {
  const location = useLocation();

  return (
    <>
      <Link className="button" to={location.state?.from ?? '/'}>
        Back
      </Link>
      <TweetsList />
    </>
  );
};
