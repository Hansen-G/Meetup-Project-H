import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import HomePage2 from "./components/HomePage2";
import ButtomBar from "./components/ButtomBar";
import GroupList from './components/GroupsList'
import GroupDetails from './components/GroupDetails'
import CreateGroupFrom from "./components/CreateGroupForm";
import LoginFormPage from "./components/LoginFormPage";
import GroupEventList from './components/GroupEventList'
import EventList from './components/EventsList'
import EventDetails from './components/EventDetails'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (

        <Switch>
          <Route exact path='/'>
            <HomePage />
            <HomePage2 />
            <ButtomBar />
          </Route>

          <Route path='/events/groups/:groupId'>
            <GroupEventList />
            <ButtomBar />
          </Route>
          <Route path='/events/:eventId'>
            <EventDetails />
            <ButtomBar />
          </Route>
 
          <Route  exact path='/events'>
            <EventList />
            <ButtomBar />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
            <ButtomBar />
          </Route>
          <Route path="/login">
            <LoginFormPage />
            <ButtomBar />
          </Route>

          <Route path='/groups/:groupId'>
            <GroupDetails />
            <ButtomBar />
          </Route>
          <Route exact path='/groups'>
            <GroupList />
            <ButtomBar />
          </Route>
          <Route path='/createNewGroup'>
            <CreateGroupFrom />
            <ButtomBar />
          </Route>

          <Route>
            Page not found
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;