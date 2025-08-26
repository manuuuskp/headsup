import { Routes, Route } from "react-router";
import Base from "./components/Base";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Base />}>
        <Route path="/" element={<Feed />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<div>Home Page</div>}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/connections" element={<Connections />}></Route>
        <Route path="/requests" element={<Requests />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
