import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {Card, CardBody, CardTitle, CardText, CardHeader, Container, Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap';

/*Purpose: To render a single Mom Plant as an HTML representation of the data.*/

export const MomPlantCard = ({ momPlant, removeMomPlant }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [plantType, setPlantType] = useState({});

    const Cancel = () => {
        history.push('/');
    };

    const history = useHistory();

    return (
        <section className="momPlantListContainer">
            <Card className="rounded bg-light clearfix">
                <CardHeader className="bg-primary">
                    <Container>
                        {/* <Link className="text-light" to={`/momPlant/detail/${momPlant.id}`}> */}
                        <Col>
                            <CardTitle className="momPlantName">{momPlant.plantType.name}</CardTitle>
                        </Col>
                        {/* </Link> */}
                    </Container>
                </CardHeader>

                <CardBody>

                    <ListGroup>
                        <ListGroupItem>Purchase Date: {momPlant.purchaseDate}</ListGroupItem>
                        <ListGroupItem>Amount Paid: {momPlant.amountPaid}</ListGroupItem>
                        <ListGroupItem>Pot Size: {momPlant.potSize.sizeInches}</ListGroupItem>
                        <ListGroupItem>Leaf Count: {momPlant.leafCount}</ListGroupItem>
                        <ListGroupItem>Sold: {momPlant.sold}</ListGroupItem>
                        <ListGroupItem>Date Sold: {momPlant.dateSold}</ListGroupItem>
                        <ListGroupItem>Amount Sold: {momPlant.amountSold}</ListGroupItem>
                        <ListGroupItem>Rooted: {momPlant.rooted}</ListGroupItem>
                    </ListGroup>
                </CardBody>

                    <div className="form__buttons">
                        
                        {/*Remove Mom Plant Button*/}
                        <Button
                            onClick={() => {
                                removeMomPlant(momPlant.id).then(() => {
                                    history.push('/');
                                });
                            }}>
                            Remove Mom Plant
                        </Button>

                        {/*Edit Mom Plant Button*/}
                        <Button
                            onClick={() => {
                                history.push(`/momPlants/edit/${momPlant.id}`);
                            }}>
                            Edit
                        </Button>
                    </div>

            </Card>
        </section>
    );
};