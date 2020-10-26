import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../user/userProvider';
import './user.css';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';

export const UserForm = () => {
    const { addUser, getUserById, updateUser } = useContext(UserContext);
    //for edit, hold on to state of User in this view
    const [user, setUserPlant] = useState({});
    const [userTypesArray, setUserTypesArray] = useState([]);
 
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useParams();

    const history = useHistory();



        /*Sets the edited Child Plant to update with state*/

    const handleControlledInputChange = (event) => {
        //When changing a state object or array, always create a copy make changes, and then set state.
        const newUser = { ...user };
        //Child Plant is an object with properties. set the property to the new value
        newUser[event.target.name] = event.target.value;
        //update state
        setUser(newUser);
    };


        /*Get User Plant by Id*/

    useEffect(() => {
        if (userId) {
            getUserById(userId).then((user) => {
                setUser(user);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetch('http://localhost:8088/users')
            .then((res) => res.json())
            .then((data) => {
                setUserArray(data);
            });
    }, []);
 
        /*Render a Create new Child Plant*/
 
    const constructUserObj = () => {

        //Stops additional clicks on button by disabling
        setIsLoading(true);

        if (userId) {
            updateUser({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }).then(() => history.push(`/users/detail/${user.id}`));
        } else {
            addUser({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }).then(() => history.push('/'));
        }
    };


    {
        /*Cancel or Close Edit Form Button Function */
    }
    const Cancel = () => {
        history.push('/');
    };

    return (
        <form className="userForm">
            <h2 className="userForm__title">{userId ? <>Edit User</> : <>New User</>}</h2>


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