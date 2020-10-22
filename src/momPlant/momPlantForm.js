import React, { useContext, useEffect, useState } from "react"
import { MomPlantContext } from "../momPlant/momPlantProvider"
import "./momPlant.css"
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'reactstrap'

export const MomPlantForm = () => {
    const { addMomPlant, getMomPlantById, updateMomPlant } = useContext(MomPlantContext)
    //for edit, hold on to state of Mom Plant in this view
    const [momPlant, setMomPlant] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);
    const { momPlantId } = useParams();
    const history = useHistory();

{/*Sets the edited Mom Plant to update with state*/}
const handleControlledInputChange = (event) => {
    //When changing a state object or array, always create a copy make changes, and then set state.
    const newMomPlant = { ...momPlant }
     //Mom Plant is an object with properties. set the property to the new value
    newMomPlant[event.target.name] = event.target.value
    //update state
    setMomPlant(newMomPlant)
}

{/*Get Mom Plant by Id*/}
    useEffect(() => {
        if (momPlantId){
            getMomPlantById(momPlantId)
                .then(momPlant => {
                    setMomPlant(momPlant)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

{/*Render a Create new Mom Plant*/}
    const constructMomPlantObj = () => {
        //Stops additional clicks on button by disabling
        setIsLoading(true);
        if (momPlantId) {
            updateMomPlant({
                id: momPlant.id,
                plantTypeId: momPlant.plantTypeId,
                purchaseDate: momPlant.purchaseDate,
                userId: parseInt(localStorage.nutshell_user)
            })
                .then(() => history.push(`/momPlant/detail/${momPlant.id}`))
        } else {
            addMomPlant({
                plantTypes: momPlant.plantTypeId,
                purchaseDate: momPlant.purchaseDate,
                userId: parseInt(localStorage.activeUser)
            })
                .then(() => history.push("/"))
        }
    }

{/*Cancel or Close Edit Form Button Function */}
    const Cancel = () => {
        history.push("/")
    }

    return (
        <form className="momPlantForm">
        <h2 className="momPlantForm__title">{momPlantId ? <>Edit Mom Plant</> : <>New Mom Plant</>}</h2>

{/*Input Field for Mom Plant Name*/}      
        <fieldset>
            <div className="form-group">
                <label htmlFor="momPlantType">Plant Type: </label>
                <input type="text" id="plantTypeId" name="plantTypeId" required autoFocus className="form-control"
                    placeholder="Type of Plant"
                    onChange={handleControlledInputChange}
                    defaultValue={momPlant.plantTypeId} />
            </div>
        </fieldset >

{/*Input Field for Mom Plant Due Date*/}
        <fieldset>
            <div className="form-group">
                <label htmlFor="momPlantPurchaseDate">Purchase Date:</label>
                <input type="date" id="purchaseDate" name="purchaseDate" required autoFocus className="form-control"
                    placeholder="Date Purchased"
                    onChange={handleControlledInputChange}
                    defaultValue={momPlant.purchaseDate} />
            </div>
        </fieldset>

{/*Button to Save or Add New or Edited Mom Plant*/}
        <button className="btn btn-primary"
            disabled={isLoading}
            onClick={event => {
                event.preventDefault() // Prevent browser from submitting the form
                constructMomPlantObj()
            }}>
            {momPlantId ? <>Save Mom Plant</> : <>Add Mom Plant</>}
        </button>

{/*Button to Close or Cancel New or Edited Mom Plant*/}
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