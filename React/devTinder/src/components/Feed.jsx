import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants.js";
import { useNavigate } from "react-router";
import UserCard from "./UserCard.jsx";
import { addFeedData } from "../../utility/reducer/FeedSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.feed);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const dataResp = await fetch(`${BASE_URL}/feed`, {
          credentials: "include",
        }).then(async (res) => {
          if (!res.ok && res.status === 401) {
            const message = await res.text();
            navigate("/login");
            throw new Error(message);
          }
          return res;
        });
        const data = await dataResp.json();
        dispatch(addFeedData(data));
      } catch (e) {
        if (e.status === 401) {
          console.error("Unauthorized access, please log in.");
        }
      }
    };
    fetchFeed();
  }, []);

  console.log("Feed data:", userData);

  return (
    <div>
        {userData.length > 0 ? <div key={userData[0]._id}>
          <UserCard user={userData[0]} showButtons />
        </div> : <p>No user data available</p>}
    </div>
  );
};

export default Feed;
