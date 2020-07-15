import React, { useState } from 'react';
import { Container } from 'reactstrap';
import Image from 'react-bootstrap/Image'
import TabPane from '../components/TabPane';
import data from '../data/data';
import FormModal from '../components/FormModal';

const App = () => {
  const [dataObj, setDataObj] = useState(JSON.parse(JSON.stringify(data)));

  const updateDataObj = newData => {
    setDataObj(newData);
    return renderThis();
  }

  const renderThis = () => {
    return(
      <Container id="body-container" className="white-background black-text" fluid>
        <Image className="header-image" src="yin-yang.png" 
               alt="A white circle encased by a black teardrop, mixed with a black circle encased by a white teardrop" 
               fluid rounded 
               tabIndex={0} />
        <h1>Notes for Notes</h1>
        <FormModal appData={JSON.parse(JSON.stringify(dataObj))}
                   updateDataObj={updateDataObj} />
        <TabPane appData={JSON.parse(JSON.stringify(dataObj))}
                 updateDataObj={updateDataObj}
                 fluid/>
      </Container>
    )
  }

  return renderThis();
}

export default App;