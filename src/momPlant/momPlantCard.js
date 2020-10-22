import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, CardTitle, CardText, CardHeader, Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap"

/*Purpose: To render a single Mom Plant as an HTML representation of the data.*/

export const MomPlantCard = ({ momPlant }) => {
const [isChecked, setIsChecked] = useState(false);

    return ( 
 
    <section className="momPlantListContainer">
      <Card className="rounded bg-light clearfix">
            <CardHeader className="bg-primary">
        <Container>
                <Link className="text-light" to={`/momPlant/detail/${momPlant.id}`}>
                    <Col><CardTitle className="momPlantName">{momPlant.plantTypeId}</CardTitle></Col>
                </Link>
        </Container>
    </CardHeader>
    <CardBody>  
              <ListGroup>
                  <ListGroupItem>{momPlant.purchaseDate}</ListGroupItem>
                  <ListGroupItem>{momPlant.amountPaid}</ListGroupItem>
                  <ListGroupItem>{momPlant.potSizeId}</ListGroupItem>
                  <ListGroupItem>{momPlant.leafCount}</ListGroupItem>
              </ListGroup>
    </CardBody>
    </Card> 
    </section>

    )
}