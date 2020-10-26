import React, { useState, createContext } from "react"

/*The context is imported and used by individual components that need data*/
export const UserContext = createContext()

/*This component establishes what data can be used.*/
export const UserProvider = (props) => {
    const [user, setUser] = useState([])
    const activeUser = parseInt(localStorage.getItem("activeUser"))

{/*Gets User Plant by Specified User Id */}
    const getUser = () => {
        return fetch(`http://localhost:8088/users?userId=${activeUser}`)
            .then(res => res.json())
            .then(setUser)
    }

    const getUserById = (id) => {
        return fetch(`http://localhost:8088/users/${id}?_expand=user`)
            .then(res => res.json())
    }

    const addUser = user => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(getUser) //This refreshes the list with new child plants//
    }

{/*Deletes or removes Child Plants by Specified Id */}
    const removeUser = userId => {
        return fetch(`http://localhost:8088/users/${userId}`, {
            method: "DELETE"
        })
            .then(getUser)
    }

{/*Edit Child Plants by Specified Id */}
    const updateUser = user => {
        return fetch(`http://localhost:8088/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(getUser)
    }
    /*
        You return a context provider which has the
        `user` state, the `addUser` function,
        and the `getUser` function as keys. This
        allows any child elements to access them.
    */
    return (
        <UserContext.Provider value={{
            user, addUser, getUser, getUserById, removeUser, updateUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}