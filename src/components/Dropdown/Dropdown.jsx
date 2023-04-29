export const Dropdown = ({ getVisibleTweets }) => {
  return (
    <div className="w-full">
      <select
        className="select"
        defaultValue="showAll"
        onChange={getVisibleTweets}>
        <option value="showAll">Show All</option>
        <option value="follow">Follow</option>
        <option value="followings">Followings</option>
      </select>
    </div>
  );
};
