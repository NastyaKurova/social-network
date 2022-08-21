import './App.scss';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/LoginPage/LoginContainer";


function App() {
    return (
        <div className="wrapper">
            <HeaderContainer></HeaderContainer>
            <div className="wrapper-container">
                <Navbar></Navbar>
                <div className="wrapper-container-content">
                    <Routes>
                        <Route path="profile/:userId" exact element={<ProfileContainer/>}/>
                        <Route path="profile/" exact element={<ProfileContainer/>}/>
                        <Route path="dialogs" exact element={<DialogsContainer/>}/>
                        <Route path="users" exact element={<UsersContainer/>}/>
                        <Route path="login" exact element={<LoginContainer/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
