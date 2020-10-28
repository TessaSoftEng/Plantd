import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {Card, CardBody, CardTitle, CardText, CardHeader, Container, Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap';

/*Purpose: To render a single Child Plant as an HTML representation of the data.*/

export const ChildPlantCard = ({ childPlant, removeChildPlant }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [plantType, setPlantType] = useState({});

    const Cancel = () => {
        history.push('/');
    };

    const history = useHistory();

    return (
        <section className="childPlantListContainer">
            <Card className="rounded bg-light clearfix">
                <CardHeader className="bg-primary">
                    <Container>
                        {/* <Link className="text-light" to={`/childPlant/detail/${childPlant.id}`}> */}
                        <Col>
                            <CardTitle className="childPlantName">{childPlant.plantType}</CardTitle>
                        </Col>
                        {/* </Link> */}
                    </Container>
                </CardHeader>
                <CardBody>

                    <ListGroup>
                        <ListGroupItem>Pot Size: {childPlant.potSizeId}</ListGroupItem>
                        <ListGroupItem>Leaf Count: {childPlant.leafCount}</ListGroupItem>
                        <ListGroupItem>Date Sold: {childPlant.dateSold}</ListGroupItem>
                        <ListGroupItem>Amount Sold: {childPlant.amountSold}</ListGroupItem>
                        <ListGroupItem>Rooted: {childPlant.rooted}</ListGroupItem>
                    </ListGroup>

                    <div className="form__buttons">

                    {/*Remove Child Plant Button*/}
                    <Button
                        onClick={() => {
                            removeChildPlant(childPlant.id).then(() => {
                                history.push('/');
                            });
                        }}>
                        Remove Child Plant
                    </Button>

                    {/*Edit Child Plant Button*/}
                    <Button
                        onClick={() => {
                            history.push(`/childPlants/edit/${childPlant.id}`);
                        }}>
                        Edit
                    </Button>
                    </div>

                </CardBody>
            </Card>
        </section>
    );
};