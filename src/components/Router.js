import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <div
              style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Route exact path={"/"} element={<Home userObj={userObj} />} />
              <Route
                exact
                path={"/profile"}
                element={
                  <Profile refreshUser={refreshUser} userObj={userObj} />
                }
              />
            </div>
          </>
        ) : (
          <Route exact path={"/"} element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
