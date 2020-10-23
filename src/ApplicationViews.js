import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
// Mom Plants
import { MomPlantList } from "./momPlant/momPlantList"
import { MomPlantProvider } from "./momPlant/momPlantProvider"
import { MomPlantDetail } from "./momPlant/momPlantDetail"
import { MomPlantForm } from "./momPlant/momPlantForm"

//Child Plants//
// import { childPlantProvider } from "./childPlant/childPlantProvider";
// import { childPlantList } from "./childPlant/childPlantList";
// import { childPlantForm } from "./childPlant/childPlantForm";
// import { childPlantDetail } from "./childPlant/childPlantDetail";


export const ApplicationViews = () => {
    return (
        <>
          <Route exact path="/">
                <MomPlantProvider>
                    <Home />
                    <MomPlantList/>
                </MomPlantProvider>
            </Route>


            {/* Render Mom Plant Dropdown Details */}
            <MomPlantProvider>
                <Route exact path="/momPlants/detail/:momPlantId(\d+)">
                    <Home />
                    <MomPlantDetail />
                </Route>
            </MomPlantProvider>

            {/*Render Mom Plant Form */}
            <MomPlantProvider>
                <Route exact path="/momPlants/create">
                    <Home />
                    <MomPlantForm />
                </Route>
            </MomPlantProvider>

            {/*Render the Edit Mom Plant */}
           <MomPlantProvider>
                <Route exact path="/momPlants/edit/:momPlantId(\d+)">
                    <Home />
                    <MomPlantForm />
                </Route>
            </MomPlantProvider>
  
     </>
    )
}