import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./userProvider"

import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'reactstrap'

export const UserForm = () => {
    const { addUser, getUserById, updateUser } = useContext(UserContext)
    //for edit, hold on to state of User in this view
    const [user, setUser] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useParams();
    const history = useHistory();

{/*Sets the edited user to update with state*/}
const handleControlledInputChange = (event) => {
    //When changing a state object or array, always create a copy make changes, and then set state.
    const newUser = { ...user }
     //user is an object with properties. set the property to the new value
    newUser[event.target.name] = event.target.value
    //update state
    setUser(newUser)
}

{/*Get User by Id*/}
    useEffect(() => {
        if (userId){
            getUserById(userId)
                .then(user => {
                    setUser(user)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

{/*Render a Create new User*/}
    const constructUserObj = () => {
        //Stops additional clicks on button by disabling
        setIsLoading(true);
        if (userId) {
            updateUser({
                id: user.id,
                userName: user.userName,
                due: user.due,
                userId: parseInt(localStorage.nutshell_user)
            })
                .then(() => history.push(`/users/detail/${user.id}`))
        } else {
            addUser({
                userName: user.userName,
                due: user.due,
                userId: parseInt(localStorage.nutshell_user)
            })
                .then(() => history.push("/"))
        }
    }

{/*Cancel or Close Edit Form Button Function */}
    const Cancel = () => {
        history.push("/")
    }

    return (
        <form className="userForm">
        <h2 className="userForm__title">{userId ? <>Edit User</> : <>New User</>}</h2>

{/*Input Field for User Name*/}      
        <fieldset>
            <div className="form-group">
                <label htmlFor="userTitle">User: </label>
                <input type="text" id="userName" name="userName" required autoFocus className="form-control"
                    placeholder="User"
                    onChange={handleControlledInputChange}
                    defaultValue={user.userName} />
            </div>
        </fieldset >

{/*Input Field for User Due Date*/}
        <fieldset>
            <div className="form-group">
                <label htmlFor="userDueDate">Due Date:</label>
                <input type="date" id="dueDate" name="due" required autoFocus className="form-control"
                    placeholder="Due Date"
                    onChange={handleControlledInputChange}
                    defaultValue={user.due} />
            </div>
        </fieldset>

{/*Button to Save or Add New or Edited User*/}
        <button className="btn btn-primary"
            disabled={isLoading}
            onClick={event => {
                event.preventDefault() // Prevent browser from submitting the form
                constructUserObj()
            }}>
            {userId ? <>Save User</> : <>Add User</>}
        </button>

{/*Button to Close or Cancel New or Edited User*/}
        <Button close aria-label="Cancel"
            disabled={isLoading}
            onClick={event => {
                event.preventDefault()
                Cancel()
            }}>
        </Button>

    </form >       
    )
}
