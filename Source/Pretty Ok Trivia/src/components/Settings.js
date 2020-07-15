import React from 'react';
import {Form, Row, Col, FormGroup, Label, Input} from "reactstrap";
import { DIFFICULTY } from '../views/App';

const Settings = props => {

    const validateNumQuestions = event => {
        const newNumQuestions = parseInt(event.target.value);
        
        if (newNumQuestions  >= 1 && newNumQuestions  <= 50) {
            props.setNumQuestions(newNumQuestions);
        } 
    }

    const changeCategory = event => {
        props.setCategory(event.target.value);
        props.setCategoryId(props.categoryIdMap.get(event.target.value));
    }

    return (
        <Form id="configuration-form">
            <Row form>
                <Col sm={4} xs={8}>
                    <FormGroup>
                        <Label for="categories" className="dropdown-form-labels">
                            <small>Categories</small>
                        </Label>
                        <Input type="select" id="categories" value={props.defaultCategory}
                               disabled={props.servingQuestions === true}
                               onChange={e => {changeCategory(e)}}>
                            {
                                props.categoryList.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))
                            }
                        </Input>
                    </FormGroup>
                </Col>
                <Col sm={4} xs={8}>
                    <FormGroup>
                        <Label for="difficulty" className="dropdown-form-labels">
                            <small>Difficulty</small>
                        </Label>
                        <Input type="select" id="difficulty" value={props.defaultDifficulty}
                               disabled={props.servingQuestions === true}
                               onChange={e => {props.setDifficulty(e.target.value)}}>
                            <option key="easy" value={DIFFICULTY.EASY}>
                                {DIFFICULTY.EASY}
                            </option>
                            <option key="medium" value={DIFFICULTY.MEDIUM}>
                                {DIFFICULTY.MEDIUM}</option>
                            <option key="hard" value={DIFFICULTY.HARD}>
                                {DIFFICULTY.HARD}
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col sm={4} xs={8}>
                    <FormGroup>
                        <Label for="num-of-questions" className="dropdown-form-labels">
                            <small>Number of Questions</small>
                        </Label>
                        <Input type="number" id="num-of-questions" 
                               disabled={props.servingQuestions === true}
                               value={props.defaultNumQuestions}
                               onChange={e => {validateNumQuestions(e)}}>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    )
}

export default Settings;