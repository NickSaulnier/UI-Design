import React from "react";
import { Container, Spinner } from "reactstrap";

const Loading = () => {
    return (
        <Container id="loading">
            <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
            <h1>Retrieving Data... Please hold</h1>
        </Container>
    )
}

export default Loading;