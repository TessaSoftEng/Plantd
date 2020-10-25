import React, { useState, createContext } from "react"

/*The context is imported and used by individual components that need data*/
export const ChildPlantContext = createContext()

/*This component establishes what data can be used.*/
export const ChildPlantProvider = (props) => {
    const [childPlants, setChildPlants] = useState([])
    const activeUser = parseInt(localStorage.getItem("activeUser"))

{/*Gets Child Plant by Specified User Id */}
    const getChildPlant = () => {
        return fetch(`http://localhost:8088/childPlants?userId=${activeUser}`)
            .then(res => res.json())
            .then(setChildPlants)
    }

    const getChildPlantById = (id) => {
        return fetch(`http://localhost:8088/childPlants/${id}?_expand=user`)
            .then(res => res.json())
    }

    const addChildPlant = childPlant => {
        return fetch("http://localhost:8088/childPlants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(childPlant)
        })
        .then(getChildPlant) //This refreshes the list with new child plants//
    }

{/*Deletes or removes Child Plants by Specified Id */}
    const removeChildPlant = childPlantId => {
        return fetch(`http://localhost:8088/childPlants/${childPlantId}`, {
            method: "DELETE"
        })
            .then(getChildPlant)
    }

{/*Edit Child Plants by Specified Id */}
    const updateChildPlant = childPlant => {
        return fetch(`http://localhost:8088/childPlants/${childPlant.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(childPlant)
        })
            .then(getChildPlant)
    }
    /*
        You return a context provider which has the
        `childPlants` state, the `addChildPlant` function,
        and the `getChildPlant` function as keys. This
        allows any child elements to access them.
    */
    return (
        <ChildPlantContext.Provider value={{
            childPlants, addChildPlant, getChildPlant, getChildPlantById, removeChildPlant, updateChildPlant
        }}>
            {props.children}
        </ChildPlantContext.Provider>
    )
}