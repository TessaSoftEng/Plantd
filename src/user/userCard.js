import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {Card, CardBody, CardTitle, CardText, CardHeader, Container, Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap';

/*Purpose: To render a single Child Plant as an HTML representation of the data.*/

export const UserCard = ({ user }) => {

    const Cancel = () => {
        history.push('/');
    };

    const history = useHistory();

    return (
        <section className="userCardContainer">

            <Card className="rounded bg-light clearfix">
                <CardHeader className="bg-primary">
                    <Container>
                        <Col>
                            <CardTitle></CardTitle>
                        </Col>
                    </Container>  
                </CardHeader>

                <CardBody>
                    
                    <ListGroup>
                        <ListGroupItem>{user.firstName} {user.lastName}</ListGroupItem>
                        <ListGroupItem>{user.email}</ListGroupItem>
                    </ListGroup>

                    <div className="form__buttons">

                    {/*Edit User Button*/}
                    <Button
                        onClick={() => {
                            history.push(`/users/edit/${user.id}`);
                        }}>
                        Edit
                    </Button>
                    </div>

                </CardBody>
            </Card>
        </section>
    );
};