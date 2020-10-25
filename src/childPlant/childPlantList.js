import React, { useContext, useEffect} from "react"
import { ChildPlantContext } from "./childPlantProvider"
import { ChildPlantCard } from "./childPlantCard"
import "./childPlant.css"
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap"

export const ChildPlantList = () => {
    // This state changes when `getChildPlant()` is invoked below
     const { childPlants, getChildPlant } = useContext(ChildPlantContext)
  
 
     //useEffect - reach out to the world for something
     useEffect(() => {
         getChildPlant()    
     }, [])
 
     const history = useHistory()
 
     return (	
       <>
        <Container className="bg-light overflow-auto h-15 border border-primary rounded-top">
            <h2 className="text-primary">Child Plants</h2> 
            <Button outline color="primary" className="float-right sticky-top" onClick={() => {history.push("/childPlants/create")}}>
                 Add Child Plant
            </Button>
        </Container>
        <Container className="bg-light overflow-auto h-50 border border-primary rounded-bottom border-top-0">
            {
                childPlants?.map(childPlant => {
                    childPlants.sort(
                        (currentChildPlant, nextChildPlant) =>
                            Date.parse(nextChildPlant.date) - Date.parse(currentChildPlant.date)
                    )
                    return <ChildPlantCard key={childPlant.id} childPlant={childPlant}/>
                })
            }
         </Container>
     </>
   )
 }