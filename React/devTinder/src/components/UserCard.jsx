import { useDispatch } from "react-redux";
import { removeFeedData } from "../../utility/reducer/FeedSlice";
import { BASE_URL } from "../utils/constants";

const UserCard = ({user, showButtons}) => {

  const dispatch = useDispatch();

  const {firstName, lastName, photoUrl, age, about} = user;

  const handleInterestIgnore = async (toUserId, status) => {
    try {
      const resp = await fetch(`${BASE_URL}/request/send/${status}/${toUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!resp.ok) {
        throw new Error("Failed to send interest");
      }
      dispatch(removeFeedData(toUserId));
    } catch (e) {
      console.error("Error sending interest:", e);
    }
  };

  return (
    <div className="card bg-primary-content w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img
          src={photoUrl}
          alt="User photo"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{`${firstName} ${lastName}, ${age}`}</h2>
        <p>
          {about}
        </p>
        {showButtons && (
          <div>
            <button className="btn btn-primary m-2" onClick={() => handleInterestIgnore(user._id, 'interested')}>Interested</button>
            <button className="btn btn-secondary m-2" onClick={() => handleInterestIgnore(user._id, 'ignored')}>Ignore</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
