import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginView from "../views/LoginView";
import HomeView from "../views/HomeView";
import ProfileView from "../views/ProfileView";
import UsersListView from "../views/UsersListView";
import CreateUserView from "../views/CreateUserView";
import UpdateUserView from "../views/UpdateUserView";
import RisksListView from "../views/RisksListView";
import RiskCreateView from "../views/RiskCreateView";
import RiskListUserView from "../views/RiskListUserView";
import RiskUpdateView from "../views/RiskUpdateView";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
              <Route path="/" element={<LoginView/>}/>
              <Route path="/home" element={<HomeView/>}/>
              <Route path="/profile" element={<ProfileView/>}/>
              <Route path="/list-users" element={<UsersListView/>}/>
              <Route path="/create-user" element={<CreateUserView/>}/>
              <Route path="/list-risks/:userId" element={<RiskListUserView/>}/>
              <Route path="/list-risks" element={<RisksListView/>}/>
              <Route path="/create-risks" element={<RiskCreateView/>}/>
              <Route path="/update-user/:userId" element={<UpdateUserView/>}/>
              <Route path="/update-risk/:riskId" element={<RiskUpdateView/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;