import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./userProvider"
import { useParams, useHistory } from "react-router-dom"
import { Button, Container, Card, CardTitle } from 'reactstrap';

export const UserDetail = () => {
	const { removeUser, getUserById } = useContext(UserContext)
	const [user, setUser] = useState({})
	const { userId } = useParams();
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
		<Container>
			<Card body inverse color="primary">
				<CardTitle>{user?.firstName}</CardTitle>
				<CardTitle>Due: {user?.due}</CardTitle>
			</Card>
			<div className="form__buttons">
				{user?.user?.id === parseInt(localStorage.getItem("activeUser")) ?
					<>
						{/*Remove User Button*/}
						<Button onClick={
							() => {
								removeUser(user.id)
									.then(() => {
										history.push("/")
									})
							}}>Remove User
                </Button>
						{/*Edit User Button*/}
						<Button onClick={
							() => {
								history.push(`/users/edit/${user.id}`)
							}}>Edit
            </Button>
					</>
					: null}
				{/*Cancel or Close Edit User Button*/}
				<Button className="btn btn-primary"
					onClick={event => {
						event.preventDefault()
						Cancel()
					}}>X
            </Button>
			</div>
		</Container>
	)
}