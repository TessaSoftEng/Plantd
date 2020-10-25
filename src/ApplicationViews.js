import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
// Mom Plants
import { MomPlantList } from "./momPlant/momPlantList"
import { MomPlantProvider } from "./momPlant/momPlantProvider"
import { MomPlantDetail } from "./momPlant/momPlantDetail"
import { MomPlantForm } from "./momPlant/momPlantForm"

// Child Plants//
import { ChildPlantProvider } from "./childPlant/childPlantProvider";
import { ChildPlantList } from "./childPlant/childPlantList";
import { ChildPlantForm } from "./childPlant/childPlantForm";
import { ChildPlantDetail } from "./childPlant/childPlantDetail";

// User Profile//
import { UserProvider } from "./user/userProvider";
import { UserForm } from "./user/userForm";
// import { UserList } from "./user/userList";
import { UserDetail } from "./user/userDetail";


export const ApplicationViews = () => {
    return (
        <>
          <Route exact path="/">
                <MomPlantProvider>
                <ChildPlantProvider>
                <UserProvider>
                    <Home />
                    <MomPlantList/>
                    <ChildPlantList/>
                    {/* <UserList/> */}
                </UserProvider>
                </ChildPlantProvider>
                </MomPlantProvider>
            </Route>

{/*User Profile*/}

            {/* Render User Dropdown Details */}
            <MomPlantProvider>
                <Route exact path="/momPlants/detail/:momPlantId(\d+)">
                    <Home />
                    <MomPlantDetail />
                </Route>
            </MomPlantProvider>

            {/*Render EDIT User Profile Form */}
           <UserProvider>
                <Route exact path="/users/edit/:momPlantId(\d+)">
                    <Home />
                    <UserForm />
                </Route>
            </UserProvider>

{/*Mom Plants*/}
            {/* Render Mom Plant Dropdown Details */}
            <MomPlantProvider>
                <Route exact path="/momPlants/detail/:momPlantId(\d+)">
                    <Home />
                    <MomPlantDetail />
                </Route>
            </MomPlantProvider>

            {/*Render CREATE Mom Plant Form */}
            <MomPlantProvider>
                <Route exact path="/momPlants/create">
                    <Home />
                    <MomPlantForm />
                </Route>
            </MomPlantProvider>

            {/*Render EDIT Mom Plant Form */}
           <MomPlantProvider>
                <Route exact path="/momPlants/edit/:momPlantId(\d+)">
                    <Home />
                    <MomPlantForm />
                </Route>
            </MomPlantProvider>

{/*Child Plants*/}

            {/* Render Child Plant Dropdown Details */}
            <ChildPlantProvider>
                <Route exact path="/childPlants/detail/:childPlantId(\d+)">
                    <Home />
                    <ChildPlantDetail />
                </Route>
            </ChildPlantProvider>

            {/*Render CREATE Child Plant Form */}
            <ChildPlantProvider>
                <Route exact path="/childPlants/create">
                    <Home />
                    <ChildPlantForm />
                </Route>
            </ChildPlantProvider>

            {/*Render EDIT Child Plant Form */}
           <ChildPlantProvider>
                <Route exact path="/childPlants/edit/:childPlantId(\d+)">
                    <Home />
                    <ChildPlantForm />
                </Route>
            </ChildPlantProvider>
  
     </>
    )
}
