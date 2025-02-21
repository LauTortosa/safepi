import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginView from "../views/LoginView";
import HomeView from "../views/HomeView";
import ProfileView from "../views/ProfileView";
import UsersListView from "../views/UsersListView";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
              <Route path="/" element={<LoginView/>}/>
              <Route path="/home" element={<HomeView/>}/>
              <Route path="/profile" element={<ProfileView/>}/>
              <Route path="/usersList" element={<UsersListView/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;