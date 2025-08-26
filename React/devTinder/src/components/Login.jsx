import { useState } from "react";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { addUser } from "../../utility/reducer/UserSlice.js";
import { useNavigate } from "react-router";

const Login = () => {

    const [email, setEmail] = useState("ratan@gmail.com");
    const [password, setPassword] = useState("Ratan@123");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        try {
            const response = await fetch("http://localhost:7777/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
            console.log("Login successful:", data);
            dispatch(addUser(data.data));
            navigate("/");
        } catch (e){
            console.error("Login failed:", e);
        }

    }

  return (
    <Card>
      <div className="items-center p-4">
        <div className="mt-4 justify-center">
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input type="email" placeholder="mail@site.com" className="input-lg" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
        </div>
        <div className="mt-4 justify-center">
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              className="input-lg"
              type="password"
              required
              placeholder="Password"
              minlength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p>
        </div>
        <div className="card-actions mt-4 justify-center">
          <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </Card>
  );
};

export default Login;
