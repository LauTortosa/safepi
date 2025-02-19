import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginView from "../views/LoginView";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
              <Route path="/" element={<LoginView/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;