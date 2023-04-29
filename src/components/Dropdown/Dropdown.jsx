export const Dropdown = ({ getVisibleTweets, filter }) => {
  return (
    <div className="w-full">
      <select
        className="select"
        defaultValue={filter}
        onChange={getVisibleTweets}
      >
        <option value="showAll">Show All</option>
        <option value="follow">Follow</option>
        <option value="followings">Followings</option>
      </select>
    </div>
  );
};
