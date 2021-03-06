import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit'

import reducer from "./store";

import 'bootstrap/dist/css/bootstrap.css';

import "./index.css";
import {Home} from "./ui/home/Home";
import {About} from "./ui/about/About";
import {Posts} from "./ui/posts/Posts";
import {Profile} from "./ui/profile/Profile";
import {SignUp} from "./ui/signup/SignUp";
import {FourOhFour} from "./ui/fourohfour/FourOhFour";
import {Activation} from './ui/activation/Activation'

import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fab, faGithub} from "@fortawesome/free-brands-svg-icons";
import {
  fas,
  faCat,
  faEllipsisH,
  faEnvelope,
  faHeart,
  faKey,
  faPencilAlt,
  faSignInAlt,
  faSignOutAlt,
  faTrash,
  faUser
} from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, fas, faCat, faEllipsisH, faEnvelope, faHeart, faGithub, faKey, faPencilAlt, faSignInAlt, faSignOutAlt, faTrash, faUser);

// In order to use redux a store must be initialized and passed to the Provider component.
const store = configureStore({reducer})

const Routing = (store) => (
  <>
    <Provider store={store}>
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/posts" component={Posts}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/profile/:profileId" component={Profile} profileId=":profileId"/>
            <Route exact path="/activation/:activation" component={Activation} token=":activation"/>
            <Route component={FourOhFour}/>
          </Switch>
      </BrowserRouter>
    </Provider>
  </>
);

ReactDOM.render(Routing(store) , document.querySelector("#root"));
// ReactDOM.render(<Routing/>, document.querySelector('#root'));