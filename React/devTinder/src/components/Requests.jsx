import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import InfoCard from "./InfoCard";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../../utility/reducer/RequestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requestData = useSelector((state) => state.requests);

  const handleReviewRequest = async (requestId, status) => {
    try {
      const resp = await fetch(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!resp.ok) {
        throw new Error("Failed to send interest");
      }
      dispatch(removeRequests(requestId));
    } catch (e) {
      console.error("Error sending interest:", e);
    }
  };

  async function fetchRequests() {
    try {
      const response = await fetch(`${BASE_URL}/user/requests`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }
      const data = await response.json();
      dispatch(addRequests(data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="flex justify-center">
      {requestData.length > 0 ? (
        <div className="mt-8">
          <h2>Requests</h2>
          <div className="mt-10">
            {requestData.length > 0
              ? requestData.map((request) => (
                  <InfoCard
                    user={request.fromUserId}
                    isReview={true}
                    handleReviewRequest={handleReviewRequest}
                    requestId={request._id}
                    key={request._id}
                  />
                ))
              : null}
          </div>
        </div>
      ) : (
        <h2>No Requests Found</h2>
      )}
    </div>
  );
};

export default Requests;
