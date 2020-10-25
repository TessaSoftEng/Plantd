import React, { useState, createContext } from "react"

/*The context is imported and used by individual components that need data*/
export const UserContext = createContext()

/*This component establishes what data can be used.*/
export const UserProvider = (props) => {
    const [users, setUser] = useState([])

{/*Gets Users by Specified User Id */}
    const getUser = () => {
        return fetch("http://localhost:8088/users?_expand=user")
            .then(res => res.json())
            .then(setUser)
    }

    const getUserById = (id) => {
        return fetch(`http://localhost:8088/users/${id}?_expand=user`)
            .then(res => res.json())
    }


{/*Edit Users by Specified Id */}
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
        `users` state, the `addUser` function,
        and the `getUser` function as keys. This
        allows any child elements to access them.
    */
    return (
        <UserContext.Provider value={{
           users, getUser, getUserById, updateUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

