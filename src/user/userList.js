import React, { useContext, useEffect} from "react"
import { UserContext } from "./userProvider"
import { UserCard } from "./userCard"
// import "./childPlant.css"
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap"

export const UserList = () => {
    // This state changes when `getUser()` is invoked below
     const { users, getUser } = useContext(UserContext)
  
 
     //useEffect - reach out to the world for something, 
     useEffect(() => {
         getUser()    
     }, [])
 
     const history = useHistory()
 
     return (	
       <>
        <Container className="bg-light overflow-auto h-15 border border-primary rounded-top">
            <h2 className="text-primary">Profile</h2> 
        </Container>

        <Container className="bg-light overflow-auto h-50 border border-primary rounded-bottom border-top-0">
            {
                users?.map(user => {
                    const active = user.id === +localStorage.getItem("activeUser") //+ is the same as parseInt
                    
                    return active ? <UserCard key={user.id} user={user}/> : undefined //Ternary, fancy if else statement
                })
            }
         </Container>
     </>
   )
 }