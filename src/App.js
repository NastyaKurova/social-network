import './App.scss';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App({state,addPost}) {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header></Header>
                <div className="wrapper-container">
                    <Navbar></Navbar>
                    <div className="wrapper-container-content">
                        <Routes>
                            <Route path="profile" exact element={<Profile postData={state.postData} addPost={addPost}/>}/>
                            <Route path="dialogs" exact element={<Dialogs dialogsData={state.dialogsData} messagesData={state.messagesData}/>}/>

                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
