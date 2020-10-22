//responsible for showing all the details of the momPlant//
import React, { useContext, useEffect, useState } from "react"
import { MomPlantContext } from "./momPlantProvider"
import "./momPlant.css"
import { useParams, useHistory } from "react-router-dom"
import { Button } from 'reactstrap';

export const MomPlantDetail = () => {
    const { removeMomPlant, getMomPlantById } = useContext(MomPlantContext)
	const [momPlant, setMomPlant] = useState({})
	const {momPlantId} = useParams();
	const history = useHistory();

    useEffect(() => {
        getMomPlantById(momPlantId)
        .then((response) => {
			setMomPlant(response)
		})
}, [])

	const Cancel = () => {
		history.push("/")
	}

    return (
        <section className="momPlant">
            <h3 className="momPlant__name">Plant Type:{momPlant?.plantTypeId}</h3>
            <div className="momPlant__purchaseDate">Purchase Due:{momPlant?.purchaseDate}</div>
			<div className="form__buttons">
				{momPlant?.user?.id === parseInt(localStorage.getItem("activeUser")) ?
				<>
		{/*Remove Mom Plant Button*/}		
				<button onClick={
					() => {
						removeMomPlant(momPlant.id)
							.then(() => {
								history.push("/")
							})
					}}>Remove Mom Plant
				</button> 

		{/*Edit Mom Plant Button*/}
			<button onClick={
				() => {
					history.push(`/momPlant/edit/${momPlant.id}`)
				}}>Edit
			</button>
			</>
			: null}

		{/*Cancel or Close Edit Form for Mom Plant Button*/}
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