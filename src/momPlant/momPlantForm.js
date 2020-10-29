import React, { useContext, useEffect, useState, useRef } from 'react';
import { MomPlantContext } from '../momPlant/momPlantProvider';
import './momPlant.css';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';

export const MomPlantForm = () => {
    const { addMomPlant, getMomPlantById, updateMomPlant } = useContext(MomPlantContext);
    //for edit, hold on to state of Mom Plant in this view
    const [momPlant, setMomPlant] = useState({});
    const [plantTypesArray, setPlantTypesArray] = useState([]);
    const [potSizeArray, setPotSizeArray] = useState([]);
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);
    const { momPlantId } = useParams();
    const { plantType, getPlantType } = useState();
    const history = useHistory();

    const [isSold, setIsSold] = useState(momPlant.sold || false);
    const [isRooted, setIsRooted] = useState(momPlant.rooted || false);

    const plantTypeId = useRef(null)
    const potSizeId = useRef(null)

    {
        /*Sets the edited Mom Plant to update with state*/
    }
    const handleControlledInputChange = (event) => {
        //When changing a state object or array, always create a copy make changes, and then set state.
        const newMomPlant = { ...momPlant };
        //Mom Plant is an object with properties. set the property to the new value
        newMomPlant[event.target.name] = event.target.value;
        //update state
        setMomPlant(newMomPlant);
    };


    const handleDropDown = (event) => {
        //When changing a state object or array, always create a copy make changes, and then set state.
        const newMomPlant = { ...momPlant };
        //Mom Plant is an object with properties. set the property to the new value
        newMomPlant[event.target.name] = plantTypeId.current.value;
        //update state
        setMomPlant(newMomPlant);
    };

    const handleDropDownTwo = (event) => {
        //When changing a state object or array, always create a copy make changes, and then set state.
        const newMomPlant = { ...momPlant };
        //Mom Plant is an object with properties. set the property to the new value
        newMomPlant[event.target.name] = potSizeId.current.value;
        //update state
        setMomPlant(newMomPlant);
    };


    
        /*Get Mom Plant by Id*/
    useEffect(() => {
        if (momPlantId) {
            getMomPlantById(momPlantId).then((momPlant) => {
                setMomPlant(momPlant);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetch('http://localhost:8088/plantTypes')
            .then((res) => res.json())
            .then((data) => {
                setPlantTypesArray(data);
            });
        fetch('http://localhost:8088/potSizes')
            .then((res) => res.json())
            .then((data) => {
                setPotSizeArray(data);
            });
    }, []);
    {
        /*Render a Create new Mom Plant*/
    }
    const constructMomPlantObj = () => {

        //Stops additional clicks on button by disabling
        setIsLoading(true);

        if (momPlantId) {
            updateMomPlant({
                id: momPlant.id,
                userId: parseInt(localStorage.activeUser),
                plantTypeId: parseInt(momPlant.plantTypeId),
                purchaseDate: momPlant.purchaseDate,
                amountPaid: momPlant.amountPaid,
                leafCount: momPlant.leafCount,
                potSize: parseInt(momPlant.potSizeId),
                sold: momPlant.sold,
                dateSold: momPlant.dateSold,
                amountSold: momPlant.amountSold,
                rooted: momPlant.rooted,
            }).then(() => history.push(`/momPlant/detail/${momPlant.id}`));
        } else {
            console.log(momPlant.plantTypeId, momPlant.potSizeId)
            addMomPlant({
                userId: parseInt(localStorage.activeUser),
                plantTypeId: parseInt(momPlant.plantTypeId),
                purchaseDate: momPlant.purchaseDate,
                amountPaid: momPlant.amountPaid,
                leafCount: momPlant.leafCount,
                potSizeId: parseInt(momPlant.potSizeId),
                sold: momPlant.sold,
                dateSold: momPlant.dateSold,
                amountSold: momPlant.amountSold,
                rooted: momPlant.rooted,
            }).then(() => history.push('/'));
        }
    };

    const handleRooted = (isRootedValue) => {
        setIsRooted(isRootedValue);
        setMomPlant({ ...momPlant, rooted: isRootedValue });
    };

    const handleSold = (soldValue) => {
        setIsSold(soldValue);
        setMomPlant({ ...momPlant, sold: soldValue });
    };

    {
        /*Cancel or Close Edit Form Button Function */
    }
    const Cancel = () => {
        history.push('/');
    };

    return (
        <form className="momPlantForm">
            <h2 className="momPlantForm__title">{momPlantId ? <>Edit Mom Plant</> : <>New Mom Plant</>}</h2>

            {/*Input Field for Mom Plant TYPE*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="momPlantType">Plant Type: </label>
                    <select ref={plantTypeId} id="dropdown" name="plantTypeId" className="form-control" onChange={(event)=>{handleDropDown(event)}}>
                        <option value="0">Select Plant Type</option>
                        {plantTypesArray.map((plantType) => {
                            return <option key={plantType.id} value={plantType.id}>{plantType.name}</option>;
                        })}
                    </select>
                </div>
            </fieldset>

            {/*Input Field for Mom Plant PURCHASE DATE*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="momPlantPurchaseDate">Purchase Date:</label>
                    <input
                        type="date"
                        id="purchaseDate"
                        name="purchaseDate"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Date Purchased"
                        onChange={handleControlledInputChange}
                        defaultValue={momPlant.purchaseDate}
                    />
                </div>
            </fieldset>

            {/*Input Field for Mom Plant AMOUNT PAID*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="momPlantAmountPaid">Amount Paid: </label>
                    <input
                        type="text"
                        id="amountPaid"
                        name="amountPaid"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Amount Paid for Plant"
                        onChange={handleControlledInputChange}
                        defaultValue={momPlant.amountPaid}
                    />
                </div>
            </fieldset>

            {/*Input Field for Mom Plant LEAF COUNT*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="momPlantLeafCount">Leaf Count: </label>
                    <input
                        type="text"
                        id="leafCount"
                        name="leafCount"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="# of Leafs"
                        onChange={handleControlledInputChange}
                        defaultValue={momPlant.leafCount}
                    />
                </div>
            </fieldset>

            {/*Input Field for Mom Plant POT SIZE*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="momPlantLeafCount">Pot Size: </label>
                    <select ref={potSizeId} id="potSize-dropdown" name="potSizeId" className="form-control" onChange={(event)=>{handleDropDownTwo(event)}}>
                        <option value="">Select Pot Size</option>
                        {potSizeArray.map((potSizeItem) => {
                            return <option key={potSizeItem.id} value={potSizeItem.id}>{`${potSizeItem.sizeInches} inches`}</option>;
                        })}
                    </select>
                </div>
            </fieldset>

            {/*Input Field for Mom Plant SOLD?*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="momPlantSold">Sold? </label>
                    <input
                        type="checkbox"
                        id="sold"
                        name="sold"
                        checked={isSold}
                        required
                        autoFocus
                        className="form-control"
                        placeholder=""
                        onChange={() => handleSold(!isSold)}
                        defaultValue={!!momPlant.sold}
                    />
                </div>
            </fieldset>

            {/*Input Field for Mom Plant SOLD DATE*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="momPlantSoldDate">Sold Date:</label>
                    <input
                        type="date"
                        id="dateSold"
                        name="dateSold"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Date Sold"
                        onChange={handleControlledInputChange}
                        defaultValue={momPlant.soldDate}
                    />
                </div>
            </fieldset>

            {/*Input Field for Mom Plant SOLD AMOUNT*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="momPlantSoldAmount">Sold For: </label>
                    <input
                        type="text"
                        id="amountSold"
                        name="amountSold"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Amount Sold For"
                        onChange={handleControlledInputChange}
                        defaultValue={momPlant.amountSold}
                    />
                </div>
            </fieldset>

            {/*Input Field for Mom Plant ROOTED?e*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="momPlantSold">Rooted? </label>
                    <input
                        type="checkbox"
                        id="rooted"
                        name="rooted"
                        checked={isRooted}
                        required
                        autoFocus
                        className="form-control"
                        placeholder=""
                        onChange={() => handleRooted(!isRooted)}
                        defaultValue={momPlant.rooted}
                    />
                </div>
            </fieldset>

            {/*Button to Save or Add New or Edited Mom Plant*/}
            <button
                className="btn btn-primary"
                disabled={isLoading}
                onClick={(event) => {
                    event.preventDefault(); // Prevent browser from submitting the form
                    constructMomPlantObj();
                }}>
                {momPlantId ? <>Save Mom Plant</> : <>Add Mom Plant</>}
            </button>

            {/*Button to Close or Cancel New or Edited Mom Plant*/}
            <Button
                close
                aria-label="Cancel"
                disabled={isLoading}
                onClick={(event) => {
                    event.preventDefault();
                    Cancel();
                }}></Button>
        </form>
    );
};