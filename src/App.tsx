import React from 'react';
import './App.css';
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {Login} from "./components/login/Login";
import {Registration} from "./components/registration/Registration";
import {Profile} from "./components/profile/Profile";
import {Page404} from "./components/page404/Page404";
import {PasswordRecovery} from "./components/passwordRecovery/PasswordRecovery";
import {NewPassword} from "./components/newPassword/NewPassword";
import {TestPage} from "./components/testPage/TestPage";
import {Navigation} from "./components/navigation/Navigation";
import Packs from "./components/packs/packs";
import {Cards} from './components/cards/Cards';
import {Learn} from "./components/learn/Learn";

export const PATH = {
    login: "/login",
    registration: "/registration",
    profile: "/profile",
    page404: "/page404",
    passwordRecovery: "/passwordRecovery",
    newPassword: "/newPassword",
    testPage: "/testPage",
    pageNotFound: "*",
    packs: "/packs",
    cards: "/cards",
    learn: "/learn",
    startPage: "/"
}

export const App = () => {
    return (
        <HashRouter>
            <div>
                <Navigation/>
                <div>
                    <Switch>
                        <Route path={PATH.login}
                               render={() => <Login/>}/>
                        <Route path={PATH.registration}
                               render={() => <Registration/>}/>
                        <Route path={PATH.profile}
                               render={() => <Profile/>}/>
                        <Route path={PATH.page404}
                               render={() => <Page404/>}/>
                        <Route path={PATH.passwordRecovery}
                               render={() => <PasswordRecovery/>}/>
                        <Route path={PATH.newPassword}
                               render={() => <NewPassword/>}/>
                        <Route path={PATH.packs}
                               render={() => <Packs/>}/>
                        <Route path={PATH.cards + "/:id"}
                               render={() => <Cards/>}/>
                        <Route path={PATH.testPage}
                               render={() => <TestPage/>}/>
                        <Route path={PATH.learn}
                               render={() => <Learn/>}/>
                        <Redirect from={PATH.startPage} to={PATH.login}/>
                        <Redirect from={PATH.pageNotFound} to={PATH.page404}/>
                    </Switch>
                </div>
            </div>

        </HashRouter>
    )
}

export default App;
