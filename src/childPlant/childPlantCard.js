import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, CardTitle, CardText, CardHeader, Container, Row, Col } from "reactstrap"

/*Purpose: To render a single task as an HTML representation of the data.*/

export const TaskCard = ({ task }) => {
    const [isChecked, setIsChecked] = useState(false);


    return ( 
 
    <section className="taskListContainer">
      <Card className="rounded bg-light clearfix">
            <CardHeader className="bg-primary">
        <Container>
            <Row>
                <Col><input className="fixed-right"
                    type="checkbox" 
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                />
                </Col>
                <Link className="text-light" to={`/tasks/detail/${task.id}`}>
                    <Col><CardTitle className="taskName">{task.taskName}</CardTitle></Col>
                </Link>
            </Row>
        </Container>
    </CardHeader>
    <CardBody>  
        <CardText>Due Date: {task.due}</CardText>
    </CardBody>
    </Card> 
    </section>

    )
}
       
