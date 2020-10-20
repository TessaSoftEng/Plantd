import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
//Mom Plants//
// import { momPlantList } from "./momPlant/momPlantList"
// import { momPlantProvider } from "./momPlant/momPlantProvider"
// import { momPlantDetail } from "./momPlant/momPlantDetail"
// import { momPlantForm } from "./momPlant/momPlantForm"

//Child Plants//
// import { childPlantProvider } from "./childPlant/childPlantProvider";
// import { childPlantList } from "./childPlant/childPlantList";
// import { childPlantForm } from "./childPlant/childPlantForm";
// import { childPlantDetail } from "./childPlant/childPlantDetail";


export const ApplicationViews = () => {
    return (
        <>

            <Route exact path="/">
                <Home />
            </Route>


            {/* <ChatProvider>
                <TaskProvider>
                    <ArticleProvider>
                        <EventProvider>
                            <Route exact path="/">
                                <Container>
                                    <Row><Home /></Row>
                                    <Row>
                                        <Col xs="6 pt-5"><TaskList /></Col>

                                        <Col xs="6 pt-5"><ArticleList /></Col>
                                    </Row>

                                    <Row>
                                        <Col xs="6"><EventList /></Col>
                                        <Col xs="6"><ChatList />
                                            <ChatForm /></Col>
                                    </Row>
                                </Container>
                            </Route>
                        </EventProvider>
                    </ArticleProvider>
                </TaskProvider>
            </ChatProvider>
            {/* Render the location list when http://localhost:3000/ */}


            {/* Render Task Dropdown Details */}
            {/* <TaskProvider>
                <Route exact path="/tasks/detail/:taskId(\d+)">
                    <Home />
                    <TaskDetail />
                </Route>
            </TaskProvider> */}

            {/*Render Task Form */}
            {/* <TaskProvider>
                <Route exact path="/tasks/create">
                    <Home />
                    <TaskForm />
                </Route>
            </TaskProvider> */}

            {/*Render the Edit Task */}
            {/* <TaskProvider>
                <Route exact path="/tasks/edit/:taskId(\d+)">
                    <Home />
                    <TaskForm />
                </Route>
            </TaskProvider> */} 
     </>
    )
}