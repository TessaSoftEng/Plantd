//responsible for showing all the details of the childPlant//
import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./userProvider"
// import "./childPlant.css"
import { useParams, useHistory } from "react-router-dom"
import { Button } from 'reactstrap';

export const UserDetail = () => {
    const { removeUser, getUserById } = useContext(UserContext)
	const [user, setUser] = useState({})
	const {userId} = useParams();
	const history = useHistory();

    useEffect(() => {
        getUserById(userId)
        .then((response) => {
			setUser(response)
		})
}, [])

	const Cancel = () => {
		history.push("/")
	}

    return (
        <section className="userDetail">
            {/* <h3 className="childPlant__name">Plant Type:{childPlant?.plantTypeId}</h3>
            <div className="childPlant__purchaseDate">Purchase Due:{childPlant?.purchaseDate}</div> */}
			<div className="form__buttons">
				{user?.user?.id === parseInt(localStorage.getItem("activeUser")) ?
				<>

		{/*Edit User Button*/}
			<button onClick={
				() => {
					history.push(`/user/edit/${user.id}`)
				}}>Edit
			</button>
			</>
			: null}

		{/*Cancel or Close Edit Form for User Button*/}
			<button className="btn btn-primary"
					onClick={event => {
						event.preventDefault()
						Cancel()
					}}>X
			</button>

			</div>
        </section>
    )
}