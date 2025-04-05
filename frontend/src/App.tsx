import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import BulkPage from "./pages/BulkPage";
import ProfileView from "./components/ProfileView";

function App() {
  return (
    <div className="min-h-screen bg-[#030014]">
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bulk" element={<BulkPage />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/profile/:id" element={<ProfileView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
