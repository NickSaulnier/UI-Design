import React from 'react';
import { Container } from 'reactstrap';
import Navigation from '../components/Navigation';
import HomePageImage from '../components/HomePageImage';

const App = () => {
    return (
        <>
            <Navigation />
            <HomePageImage />
            <Container id="home-page-header-container">
                <h1 id="home-page-header-1">Nick Saulnier<br/>Msc. Computer Science</h1>
                <h2 id="home-page-header-2">A portfolio site to show off some react projects I have developed while pursuing my master's degree</h2>
            </Container>
        </>
    )
}

export default App;