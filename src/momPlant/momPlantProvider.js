import React, { useState, createContext } from "react"

/*The context is imported and used by individual components that need data*/
export const MomPlantContext = createContext()

/*This component establishes what data can be used.*/
export const MomPlantProvider = (props) => {
    const [momPlants, setMomPlants] = useState([])
    const activeUser = parseInt(localStorage.getItem("activeUser"))

{/*Gets Mom Plant by Specified User Id */}
    const getMomPlant = () => {
        return fetch(`http://localhost:8088/momPlants?userId=${activeUser}`)
            .then(res => res.json())
            .then(setMomPlants)
    }

    const getMomPlantById = (id) => {
        return fetch(`http://localhost:8088/momPlants/${id}?_expand=user`)
            .then(res => res.json())
    }

    const addMomPlant = momPlant => {
        return fetch("http://localhost:8088/momPlants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(momPlant)
        })
        .then(getMomPlant) //This refreshes the list with new mom plants//
    }

{/*Deletes or removes Mom Plants by Specified Id */}
    const removeMomPlant = momPlantId => {
        return fetch(`http://localhost:8088/momPlants/${momPlantId}`, {
            method: "DELETE"
        })
            .then(getMomPlant)
    }

{/*Edit Mom Plants by Specified Id */}
    const updateMomPlant = momPlant => {
        return fetch(`http://localhost:8088/momPlants/${momPlant.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(momPlant)
        })
            .then(getMomPlant)
    }
    /*
        You return a context provider which has the
        `momPlants` state, the `addMomPlant` function,
        and the `getMomPlant` function as keys. This
        allows any child elements to access them.
    */
    return (
        <MomPlantContext.Provider value={{
            momPlants, addMomPlant, getMomPlant, getMomPlantById, removeMomPlant, updateMomPlant
        }}>
            {props.children}
        </MomPlantContext.Provider>
    )
}