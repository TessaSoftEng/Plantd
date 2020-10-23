import React, { useContext, useEffect} from "react"
import { MomPlantContext } from "./momPlantProvider"
import { MomPlantCard } from "./momPlantCard"
import "./momPlant.css"
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap"

export const MomPlantList = () => {
    // This state changes when `getMomPlant()` is invoked below
     const { momPlants, getMomPlant } = useContext(MomPlantContext)
  
 
     //useEffect - reach out to the world for something
     useEffect(() => {
         getMomPlant()    
     }, [])
 
     const history = useHistory()
 
     return (	
       <>
        <Container className="bg-light overflow-auto h-15 border border-primary rounded-top">
            <h2 className="text-primary">Mom Plants</h2> 
            <Button outline color="primary" className="float-right sticky-top" onClick={() => {history.push("/momPlants/create")}}>
                 Add Mom Plant
            </Button>
        </Container>
        <Container className="bg-light overflow-auto h-50 border border-primary rounded-bottom border-top-0">
            {
                momPlants?.map(momPlant => {
                    momPlants.sort(
                        (currentMomPlant, nextMomPlant) =>
                            Date.parse(nextMomPlant.date) - Date.parse(currentMomPlant.date)
                    )
                    return <MomPlantCard key={momPlant.id} momPlant={momPlant}/>
                })
            }
         </Container>
     </>
   )
 }