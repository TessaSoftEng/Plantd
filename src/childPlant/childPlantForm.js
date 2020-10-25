import React, { useContext, useEffect, useState } from "react"
import { ChildPlantContext } from "../childPlant/childPlantProvider"
import "./childPlant.css"
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'reactstrap'

export const ChildPlantForm = () => {
    const { addChildPlant, getChildPlantById, updateChildPlant } = useContext(ChildPlantContext)
    //for edit, hold on to state of Mom Plant in this view
    const [childPlant, setChildPlant] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);
    const { childPlantId } = useParams();
    const {plantType, getPlantType} = useState()
    const history = useHistory();

{/*Sets the edited Child Plant to update with state*/}
const handleControlledInputChange = (event) => {
    //When changing a state object or array, always create a copy make changes, and then set state.
    const newChildPlant = { ...childPlant }
     //Child Plant is an object with properties. set the property to the new value
    newChildPlant[event.target.name] = event.target.value
    //update state
    setChildPlant(newChildPlant)
}

{/*Get Child Plant by Id*/}
    useEffect(() => {
        
        if (childPlantId){
            getChildPlantById(childPlantId)
                .then(childPlant => {
                    setChildPlant(childPlant)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

{/*Render a Create new Child Plant*/}
    const constructChildPlantObj = () => {
        // if(parseInt(childPlant.plantTypeId)===0){
        //     window.alert("Please Select a Plant Type")
        // }else{}
        //Stops additional clicks on button by disabling
        setIsLoading(true);

        if (childPlantId) {
            updateChildPlant({
                id: childPlant.id,
                userId: parseInt(localStorage.activeUser),
                plantTypeId: parseInt(childPlant.plantTypeId),
                purchaseDate: childPlant.purchaseDate,
                amountPaid: childPlant.amountPaid,
                leafCount: childPlant.leafCount,
                potSize: parseInt(childPlant.potSizeId),
                sold: childPlant.sold,
                dateSold: childPlant.dateSold,
                amountSold: childPlant.amountSold,
                rooted: childPlant.rooted
            })
                .then(() => history.push(`/childPlant/detail/${childPlant.id}`))
        } else {
            addChildPlant({
                userId: parseInt(localStorage.activeUser),
                plantTypeId: childPlant.plantTypeId,
                purchaseDate: childPlant.purchaseDate,
                amountPaid: childPlant.amountPaid,
                leafCount: childPlant.leafCount,
                potSizeId: parseInt(childPlant.potSizeId),
                sold: childPlant.sold,
                dateSold: childPlant.dateSold,
                amountSold: childPlant.amountSold,
                rooted: childPlant.rooted
            })
                .then(() => history.push("/"))
        }
    }

{/*Cancel or Close Edit Form Button Function */}
    const Cancel = () => {
        history.push("/")
    }

   
    return (
        <form className="childPlantForm">
        <h2 className="childPlantForm__title">{childPlantId ? <>Edit Child Plant</> : <>New Child Plant</>}</h2>

{/*Input Field for Child Plant TYPE*/}      
        <fieldset>
            <div className="form-group">
                <label htmlFor="childPlantType">Plant Type: </label>
                <select id="dropdown" name="plantTypeId" className="form-control">
                    <option value="0">Select Plant Type</option>
                    ${
                        // childPlant.plantType.map(childPlantObj => {
                        //     return `
                        //     <option value="${childPlantObj.plantType.type}">${childPlantObj.plantType.type}</option>
                        //     `
                        // }).join("")
                    }
                </select>
                <input type="text" id="plantTypeId" name="plantTypeId" required autoFocus className="form-control"
                    placeholder="Type of Plant"
                    onChange={handleControlledInputChange}
                    defaultValue={childPlant.plantTypeId} />
            </div>
        </fieldset >

{/*Input Field for Child Plant PURCHASE DATE*/}
        <fieldset>
            <div className="form-group">
                <label htmlFor="childPlantPurchaseDate">Purchase Date:</label>
                <input type="date" id="purchaseDate" name="purchaseDate" required autoFocus className="form-control"
                    placeholder="Date Purchased"
                    onChange={handleControlledInputChange}
                    defaultValue={childPlant.purchaseDate} />
            </div>
        </fieldset>

{/*Input Field for Child Plant AMOUNT PAID*/}      
        <fieldset>
            <div className="form-group">
                <label htmlFor="childPlantAmountPaid">Amount Paid: </label>
                <input type="text" id="amountPaid" name="amountPaid" required autoFocus className="form-control"
                    placeholder="Amount Paid for Plant"
                    onChange={handleControlledInputChange}
                    defaultValue={childPlant.amountPaid} />
            </div>
        </fieldset >


{/*Input Field for Child Plant LEAF COUNT*/}      
        <fieldset>
            <div className="form-group">
                <label htmlFor="childPlantLeafCount">Leaf Count: </label>
                <input type="text" id="leafCount" name="leafCount" required autoFocus className="form-control"
                    placeholder="# of Leafs"
                    onChange={handleControlledInputChange}
                    defaultValue={childPlant.leafCount} />
            </div>
        </fieldset >

{/*Input Field for Child Plant POT SIZE*/}      
        <fieldset>
            <div className="form-group">
                <label htmlFor="childPlantLeafCount">Pot Size: </label>
                <select id="potSize-dropdown" name="potSize" className="form-control"></select>
                    <option value="">Select Pot Size</option>
                <input type="text" id="potSizeId" name="potSizeId" required autoFocus className="form-control"
                    placeholder="Size of Pot"
                    onChange={handleControlledInputChange}
                    defaultValue={childPlant.potSizeId} />
            </div>
        </fieldset >

{/*Input Field for Child Plant SOLD?*/}      
        <fieldset>
            <div className="form-group">
                <label htmlFor="childPlantSold">Sold? </label>
                <input type="checkbox" id="sold" name="sold" required autoFocus className="form-control"
                    placeholder=""
                    onChange={handleControlledInputChange}
                    defaultValue={childPlant.sold} />
            </div>
        </fieldset >

{/*Input Field for Child Plant SOLD DATE*/}
        <fieldset>
            <div className="form-group">
                <label htmlFor="childPlantSoldDate">Sold Date:</label>
                <input type="date" id="dateSold" name="dateSold" required autoFocus className="form-control"
                    placeholder="Date Sold"
                    onChange={handleControlledInputChange}
                    defaultValue={childPlant.soldDate} />
            </div>
        </fieldset>

{/*Input Field for Child Plant SOLD AMOUNT*/}      
        <fieldset>
            <div className="form-group">
                <label htmlFor="childPlantSoldAmount">Sold For: </label>
                <input type="text" id="amountSold" name="amountSold" required autoFocus className="form-control"
                    placeholder="Amount Sold For"
                    onChange={handleControlledInputChange}
                    defaultValue={childPlant.amountSold} />
            </div>
        </fieldset >

{/*Input Field for Child Plant ROOTED?e*/}      
        <fieldset>
            <div className="form-group">
                <label htmlFor="childPlantSold">Rooted? </label>
                <input type="checkbox" id="rooted" name="rooted" required autoFocus className="form-control"
                    placeholder=""
                    onChange={handleControlledInputChange}
                    defaultValue={childPlant.rooted} />
            </div>
        </fieldset >

{/*Button to Save or Add New or Edited Child Plant*/}
        <button className="btn btn-primary"
            disabled={isLoading}
            onClick={event => {
                event.preventDefault() // Prevent browser from submitting the form
                constructChildPlantObj()
            }}>
            {childPlantId ? <>Save Child Plant</> : <>Add Child Plant</>}
        </button>

{/*Button to Close or Cancel New or Edited Child Plant*/}
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