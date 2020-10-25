import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, CardTitle, CardText, CardHeader, Container, Row, Col } from "reactstrap"

/*Purpose: To render a single User as an HTML representation of the data.*/

export const UserCard = ({ user }) => {

    return ( 
 
    <section className="userListContainer">
      <Card className="rounded bg-light clearfix">
            <CardHeader className="bg-primary">
                <Container>
                    <Row>
                        <Link className="text-light" to={`/users/detail/${user.id}`}>
                            <Col><CardTitle className="userName">{user.firstName}{user.lastName}</CardTitle></Col>
                        </Link>
                    </Row>
                </Container>
        </CardHeader>
    <CardBody>  
        <CardText className="userEmail">{user.email}</CardText>
    </CardBody>
    </Card> 
    </section>

    )
}