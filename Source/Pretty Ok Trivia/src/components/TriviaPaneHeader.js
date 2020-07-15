import React from 'react';
import { Row, Col } from 'reactstrap';

const TriviaPaneHeader = props => 
    <Row>
        <Col>
            <p className="trivia-pane-text" tabIndex={0}>
                {
                    "Question: " + (props.curQuestionIdx+1).toString() + 
                    "/" + props.questions.length
                }
            </p>
        </Col>
        <Col>
            <p className="trivia-pane-text" tabIndex={0}>
                {
                    "Correct Answers: " + props.correctAnswers.toString()
                }
            </p>
        </Col>
    </Row>

export default TriviaPaneHeader;