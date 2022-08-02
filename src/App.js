import './App.scss';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App({dialogsData, messagesData}) {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header></Header>
                <div className="wrapper-container">
                    <Navbar></Navbar>
                    <div className="wrapper-container-content">
                        <Routes>
                            <Route path="profile" exact element={<Profile/>}/>
                            <Route path="dialogs" exact element={<Dialogs dialogsData={dialogsData} messagesData={messagesData}/>}/>

                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
