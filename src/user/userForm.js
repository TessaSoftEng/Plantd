import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../user/userProvider';
// import './user.css';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';

export const UserForm = () => {
    const { addUser, getUserById, updateUser } = useContext(UserContext);
    //for edit, hold on to state of User in this view
    const [user, setUser] = useState({});
    const [userArray, setUserArray] = useState([]);
 
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


            {/*Input Field for User FIRST NAME*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="userFirstName">First Name: </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="First Name"
                        onChange={handleControlledInputChange}
                        defaultValue={user.firstName}
                    />
                </div>
            </fieldset>


            {/*Input Field for User LAST NAME*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="userLastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Last Name"
                        onChange={handleControlledInputChange}
                        defaultValue={user.lastName}
                    />
                </div>
            </fieldset>

            {/*Input Field for User EMAIL*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="userEmail">Email: </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Email"
                        onChange={handleControlledInputChange}
                        defaultValue={user.email}
                    />
                </div>
            </fieldset>


            {/*Button to Save or Add New User*/}
            {/* <button
                className="btn btn-primary"
                disabled={isLoading}
                onClick={(event) => {
                    event.preventDefault(); // Prevent browser from submitting the form
                    constructUserObj();
                }}>
                {userId ? <>Save Child Plant</> : <>Add Child Plant</>}
            </button> */}

            {/*Button to Close or Cancel New User*/}
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