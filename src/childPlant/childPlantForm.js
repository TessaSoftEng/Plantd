import React, { useContext, useEffect, useState } from 'react';
import { ChildPlantContext } from '../childPlant/childPlantProvider';
import './childPlant.css';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';

export const ChildPlantForm = () => {
    const { addChildPlant, getChildPlantById, updateChildPlant } = useContext(ChildPlantContext);
    //for edit, hold on to state of Child Plant in this view
    const [childPlant, setChildPlant] = useState({});
    const [plantTypesArray, setPlantTypesArray] = useState([]);
    const [potSizeArray, setPotSizeArray] = useState([]);
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);
    const { childPlantId } = useParams();
    const { plantType, getPlantType } = useState();
    const history = useHistory();

    const [isSold, setIsSold] = useState(childPlant.sold || false);
    const [isRooted, setIsRooted] = useState(childPlant.rooted || false);

    {
        /*Sets the edited Child Plant to update with state*/
    }
    const handleControlledInputChange = (event) => {
        //When changing a state object or array, always create a copy make changes, and then set state.
        const newChildPlant = { ...childPlant };
        //Child Plant is an object with properties. set the property to the new value
        newChildPlant[event.target.name] = event.target.value;
        //update state
        setChildPlant(newChildPlant);
    };

    {
        /*Get Child Plant by Id*/
    }
    useEffect(() => {
        if (childPlantId) {
            getChildPlantById(childPlantId).then((childPlant) => {
                setChildPlant(childPlant);
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
        /*Render a Create new Child Plant*/
    }
    const constructChildPlantObj = () => {

        //Stops additional clicks on button by disabling
        setIsLoading(true);

        if (childPlantId) {
            updateChildPlant({
                id: childPlant.id,
                userId: parseInt(localStorage.activeUser),
                plantTypeId: parseInt(childPlant.plantTypeId),
                leafCount: childPlant.leafCount,
                potSize: parseInt(childPlant.potSizeId),
                dateSold: childPlant.dateSold,
                amountSold: childPlant.amountSold,
                rooted: childPlant.rooted,
            }).then(() => history.push(`/childPlant/detail/${childPlant.id}`));
        } else {
            addChildPlant({
                userId: parseInt(localStorage.activeUser),
                plantTypeId: childPlant.plantTypeId,
                leafCount: childPlant.leafCount,
                potSizeId: parseInt(childPlant.potSizeId),
                dateSold: childPlant.dateSold,
                amountSold: childPlant.amountSold,
                rooted: childPlant.rooted,
            }).then(() => history.push('/'));
        }
    };

    const handleRooted = (isRootedValue) => {
        setIsRooted(isRootedValue);
        setChildPlant({ ...childPlant, rooted: isRootedValue });
    };

    const handleSold = (soldValue) => {
        setIsSold(soldValue);
        setChildPlant({ ...childPlant, sold: soldValue });
    };

    {
        /*Cancel or Close Edit Form Button Function */
    }
    const Cancel = () => {
        history.push('/');
    };

    return (
        <form className="childPlantForm">
            <h2 className="childPlantForm__title">{childPlantId ? <>Edit Child Plant</> : <>New Child Plant</>}</h2>

            {/*Input Field for Child Plant TYPE*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="childPlantType">Plant Type: </label>
                    <select id="dropdown" name="plantTypeId" className="form-control">
                        <option value="0">Select Plant Type</option>
                        {plantTypesArray.map((plantType) => {
                            return <option value={plantType.id}>{plantType.name}</option>;
                        })}
                    </select>
                </div>
            </fieldset>

            {/*Input Field for Child Plant LEAF COUNT*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="childPlantLeafCount">Leaf Count: </label>
                    <input
                        type="text"
                        id="leafCount"
                        name="leafCount"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="# of Leafs"
                        onChange={handleControlledInputChange}
                        defaultValue={childPlant.leafCount}
                    />
                </div>
            </fieldset>

            {/*Input Field for Child Plant POT SIZE*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="childPlantLeafCount">Pot Size: </label>
                    <select id="potSize-dropdown" name="potSize" className="form-control">
                        <option value="">Select Pot Size</option>
                        {potSizeArray.map((potSizeItem) => {
                            return <option value={potSizeItem.id}>{`${potSizeItem.sizeInches} inches`}</option>;
                        })}
                    </select>
                </div>
            </fieldset>

            {/*Input Field for Child Plant SOLD DATE*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="childPlantSoldDate">Sold Date:</label>
                    <input
                        type="date"
                        id="dateSold"
                        name="dateSold"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Date Sold"
                        onChange={handleControlledInputChange}
                        defaultValue={childPlant.soldDate}
                    />
                </div>
            </fieldset>

            {/*Input Field for Child Plant SOLD AMOUNT*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="childPlantSoldAmount">Sold For: </label>
                    <input
                        type="text"
                        id="amountSold"
                        name="amountSold"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Amount Sold For"
                        onChange={handleControlledInputChange}
                        defaultValue={childPlant.amountSold}
                    />
                </div>
            </fieldset>

            {/*Input Field for Child Plant ROOTED?e*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="childPlantSold">Rooted? </label>
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
                        defaultValue={childPlant.rooted}
                    />
                </div>
            </fieldset>

            {/*Button to Save or Add New Child Plant*/}
            <button
                className="btn btn-primary"
                disabled={isLoading}
                onClick={(event) => {
                    event.preventDefault(); // Prevent browser from submitting the form
                    constructChildPlantObj();
                }}>
                {childPlantId ? <>Save Child Plant</> : <>Add Child Plant</>}
            </button>

            {/*Button to Close or Cancel New Child Plant*/}
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