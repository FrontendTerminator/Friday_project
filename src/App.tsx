import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "./components/login/Login";
import {Registration} from "./components/registration/Registration";
import {Profile} from "./components/profile/Profile";
import {Page404} from "./components/page404/Page404";
import {PasswordRecovery} from "./components/passwordRecovery/PasswordRecovery";
import {NewPassword} from "./components/newPassword/NewPassword";
import {TestPage} from "./components/testPage/TestPage";
import {Navigation} from "./components/navigation/Navigation";

export const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Navigation/>
                <div>
                    <Route path={"/login"}
                           render={() => <Login/>}/>
                    <Route path={"/registration"}
                           render={() => <Registration/>}/>
                    <Route path={"/profile"}
                           render={() => <Profile/>}/>
                    <Route path={"/page404"}
                           render={() => <Page404/>}/>
                    <Route path={"/passwordRecovery"}
                           render={() => <PasswordRecovery/>}/>
                    <Route path={"/newPassword"}
                           render={() => <NewPassword/>}/>
                    <Route path={"/testPage"}
                           render={() => <TestPage/>}/>
                </div>
            </div>

        </BrowserRouter>
    )
}

export default App;
