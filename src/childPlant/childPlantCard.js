import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, CardTitle, CardText, CardHeader, Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap"

/*Purpose: To render a single Child Plant as an HTML representation of the data.*/

export const ChildPlantCard = ({ childPlant }) => {
const [isChecked, setIsChecked] = useState(false);
const [plantType, setPlantType] = useState({})

    return ( 
 
    <section className="childPlantListContainer">

      <Card className="rounded bg-light clearfix">
            <CardHeader className="bg-primary">
        <Container>
                {/* <Link className="text-light" to={`/childPlant/detail/${childPlant.id}`}> */}
                    <Col><CardTitle className="childPlantName">{childPlant.plantType}</CardTitle></Col>
                {/* </Link> */}
        </Container>
    </CardHeader>
    <CardBody>  
  
              <ListGroup>
                  <ListGroupItem>Purchase Date: {childPlant.purchaseDate}</ListGroupItem>
                  <ListGroupItem>Amount Paid: {childPlant.amountPaid}</ListGroupItem>
                  <ListGroupItem>Pot Size: {childPlant.potSizeId}</ListGroupItem>
                  <ListGroupItem>Leaf Count: {childPlant.leafCount}</ListGroupItem>
                  <ListGroupItem>Sold: {childPlant.sold}</ListGroupItem>
                  <ListGroupItem>Date Sold: {childPlant.dateSold}</ListGroupItem>
                  <ListGroupItem>Amount Sold: {childPlant.amountSold}</ListGroupItem>
                  <ListGroupItem>Rooted: {childPlant.rooted}</ListGroupItem>
              </ListGroup>
  
    </CardBody>
    </Card> 

    </section>

    )
}