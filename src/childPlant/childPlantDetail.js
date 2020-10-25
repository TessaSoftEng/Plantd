//responsible for showing all the details of the childPlant//
import React, { useContext, useEffect, useState } from "react"
import { ChildPlantContext } from "./childPlantProvider"
import "./childPlant.css"
import { useParams, useHistory } from "react-router-dom"
import { Button, Container, Card, CardTitle } from 'reactstrap';

export const ChildPlantDetail = () => {
    const { removeChildPlant, getChildPlantById } = useContext(ChildPlantContext)
	const [childPlant, setChildPlant] = useState({})
	const {childPlantId} = useParams();
	const history = useHistory();

    useEffect(() => {
        getChildPlantById(childPlantId)
        .then((response) => {
			setChildPlant(response)
		})
}, [])

	const Cancel = () => {
		history.push("/")
	}

    return (
        <Container>
            <Card body inverse color="primary">
                <CardTitle>Plant Type:{childPlant?.plantType.type}</CardTitle>
                <CardTitle>Purchase Due:{childPlant?.purchaseDate}</CardTitle>
			</Card>
            <div className="form__buttons">
				{childPlant?.user?.id === parseInt(localStorage.getItem("activeUser")) ?
				<>
		{/*Remove Child Plant Button*/}		
				<Button onClick={
					() => {
						removeChildPlant(childPlant.id)
							.then(() => {
								history.push("/")
							})
					}}>Remove Child Plant
				</Button> 

		{/*Edit Child Plant Button*/}
			<Button onClick={
				() => {
					history.push(`/childPlant/edit/${childPlant.id}`)
				}}>Edit
			</Button>
			</>
			: null}

		{/*Cancel or Close Edit Form for Child Plant Button*/}
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