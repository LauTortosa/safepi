import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginView from "../views/LoginView";
import HomeView from "../views/HomeView";
import ProfileView from "../views/ProfileView";

import { UsersListView, UserCreateView, UserUpdateView } from "../views/users";
import { RisksListView, RiskListUserView, RiskCreateView, RiskUpdateView } from "../views/risks";
import { WorkEventListView, WorkEventCreateView, WorkEventUpdateView, WorkEventDetailsView, WorkEventListUserView } from "../views/workEvents";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
              <Route path="/" element={<LoginView/>}/>
              <Route path="/home" element={<HomeView/>}/>
              <Route path="/profile" element={<ProfileView/>}/>

              <Route path="/list-users" element={<UsersListView/>}/>
              <Route path="/create-user" element={<UserCreateView/>}/>
              <Route path="/update-user/:userId" element={<UserUpdateView/>}/>

              <Route path="/list-risks/:userId" element={<RiskListUserView/>}/>
              <Route path="/list-risks" element={<RisksListView/>}/>
              <Route path="/create-risk" element={<RiskCreateView/>}/>
              <Route path="/update-risk/:riskId" element={<RiskUpdateView/>}/>

              <Route path="/workEvents/users/:userId/workEvents" element={<WorkEventListUserView/>}/>
              <Route path="/list-workevents" element={<WorkEventListView/>}/>
              <Route path="/create-workevent" element={<WorkEventCreateView/>}/>
              <Route path="/update-workevent/:workEventId" element={<WorkEventUpdateView/>}/>
              
              <Route path="/followUps/:workEventId" element={<WorkEventDetailsView/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;