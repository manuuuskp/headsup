import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../../utility/reducer/UserSlice.js";
import Toaster from "./Toaster";

const Profile = () => {

  const dispatch = useDispatch();

    useEffect(() => {
        fetchProfile()
    }, []);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [about, setAbout] = useState("");
    const [showToaster, setShowToaster] = useState(false);

    async function fetchProfile() {
        try {
            const response = await fetch(`${BASE_URL}/profile`, {
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("Failed to fetch profile");
            }
            const data = await response.json();
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setPhotoUrl(data.photoUrl); 
            setAge(data.age); 
            setGender(data.gender); 
            setAbout(data.about);
            dispatch(addUser(data));
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }     
    
    async function onHandleUpdate() {
      try {
        const resp = await fetch(`${BASE_URL}/profile`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            photoUrl,
            age,
            about,
            gender
          }),
          credentials: 'include',
      });
      console.log(resp);
      setShowToaster(true);
      setTimeout(() => setShowToaster(false), 2000);
    } catch(e) {
        console.error("Error updating profile:", e);
      }
    }

  return (
    <div className="flex gap-4 justify-center my-4">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Profile</h2>
          <div>
            <input type="text" placeholder="first Name" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="last Name" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="photoUrl" className="input" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="age" className="input" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="gender" className="input" value={gender} onChange={(e) => setGender(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="about" className="input" value={about} onChange={(e) => setAbout(e.target.value)} />
          </div>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={onHandleUpdate}>Update</button>
          </div>
        </div>
      </div>
      <UserCard user={{firstName, lastName, photoUrl, age, about}} />
      {showToaster && <Toaster message="Profile updated successfully" />}
    </div>
  );
};

export default Profile;
