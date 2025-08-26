import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import InfoCard from "./InfoCard";

const Connections = () => {
  const [connections, setConnections] = useState([]);

  async function fetchConnections() {
    try {
      const response = await fetch(`${BASE_URL}/user/connections`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch connections");
      }
      const data = await response.json();
      setConnections(data);
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="flex justify-center">
      {connections.length > 0 ? (
        <div className="mt-8">
          <h2>Connections</h2>
          <div className="mt-10">
            {connections.length > 0
              ? connections.map((connection, index) => <InfoCard user={connection}/>)
              : null}
          </div>
        </div>
      ) : (
        <h2>No Connections Found</h2>
      )}
    </div>
  );
};

export default Connections;
