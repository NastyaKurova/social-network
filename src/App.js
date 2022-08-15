import './App.scss';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

function App({store}) {
    return (
        <div className="wrapper">
            <Header></Header>
            <div className="wrapper-container">
                <Navbar></Navbar>
                <div className="wrapper-container-content">
                    <Routes>
                        <Route path="profile" exact element={<Profile store={store}/>}/>
                        <Route path="dialogs" exact element={<DialogsContainer/>}/>

                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
