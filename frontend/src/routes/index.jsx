import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginView from "../views/LoginView";
import HomeView from "../views/HomeView";
import ProfileView from "../views/ProfileView";
import UsersListView from "../views/UsersListView";
import UserCreateView from "../views/UserCreateView";
import UserUpdateView from "../views/UserUpdateView";
import RisksListView from "../views/RisksListView";
import RiskCreateView from "../views/RiskCreateView";
import RiskListUserView from "../views/RiskListUserView";
import RiskUpdateView from "../views/RiskUpdateView";
import WorkEventsListView from "../views/WorkEventsListView";
import WorkEventCreateView from "../views/WorkEventCreateView";
import WorkEventUpdateView from "../views/WorkEventUpdateView";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
              <Route path="/" element={<LoginView/>}/>
              <Route path="/home" element={<HomeView/>}/>
              <Route path="/profile" element={<ProfileView/>}/>
              <Route path="/list-users" element={<UsersListView/>}/>
              <Route path="/create-user" element={<UserCreateView/>}/>
              <Route path="/list-risks/:userId" element={<RiskListUserView/>}/>
              <Route path="/list-risks" element={<RisksListView/>}/>
              <Route path="/create-risk" element={<RiskCreateView/>}/>
              <Route path="/update-user/:userId" element={<UserUpdateView/>}/>
              <Route path="/update-risk/:riskId" element={<RiskUpdateView/>}/>
              <Route path="/list-workevents" element={<WorkEventsListView/>}/>
              <Route path="/create-workevent" element={<WorkEventCreateView/>}/>
              <Route path="/update-workevent/:workEventId" element={<WorkEventUpdateView/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;