//responsible for showing all the details of the childPlant//
import React, { useContext, useEffect, useState } from "react"
import { ChildPlantContext } from "./childPlantProvider"
import "./childPlant.css"
import { useParams, useHistory } from "react-router-dom"
import { Button } from 'reactstrap';

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
        <section className="childPlant">
            {/* <h3 className="childPlant__name">Plant Type:{childPlant?.plantTypeId}</h3>
            <div className="childPlant__purchaseDate">Purchase Due:{childPlant?.purchaseDate}</div> */}
			<div className="form__buttons">
				{childPlant?.user?.id === parseInt(localStorage.getItem("activeUser")) ?
				<>
		{/*Remove Child Plant Button*/}		
				<button onClick={
					() => {
						removeChildPlant(childPlant.id)
							.then(() => {
								history.push("/")
							})
					}}>Remove Child Plant
				</button> 

		{/*Edit Child Plant Button*/}
			<button onClick={
				() => {
					history.push(`/childPlant/edit/${childPlant.id}`)
				}}>Edit
			</button>
			</>
			: null}

		{/*Cancel or Close Edit Form for Child Plant Button*/}
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