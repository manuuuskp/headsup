const InfoCard = ({ user, isReview, handleReviewRequest, requestId }) => {
  const { firstName, lastName, photoUrl, about } = user;

  return (
    <div className="card card-side bg-base-100 shadow-sm max-h-64">
      <figure>
        <img className="w-48 object-cover" src={photoUrl} alt="User photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>{about}</p>
        {isReview && (
          <div>
            <button className="btn btn-primary m-2" onClick={() => handleReviewRequest(requestId, "accepted")}>Accept</button>
            <button className="btn btn-secondary m-2" onClick={() => handleReviewRequest(requestId, "rejected")}>Reject</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
