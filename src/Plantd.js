import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Profile } from "./Profile"
import { Login } from "./auth/login"
import { Register } from "./auth/register"
import "./Plantd.css"

export const Plantd = () => (
  <>
    <Route render={() => {
      if (localStorage.getItem("plantd_user")) {
        return (
          <>

            <Profile />
          </>
        )
      } else {
        return <Redirect to="/login" />
      }
    }} />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
)