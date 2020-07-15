import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';

const AnswerDisplayBoolean = props => {
    const [answer, setAnswer] = useState(null);

    const getResultsDisplay = () => {
        if (answer === props.curQuestion.correct_answer) {
            return (
                <>
                    <p className="trivia-pane-text results-text-correct">Correct!</p>
                    <p className="trivia-pane-text results-text-correct">
                    {
                        "Your Answer: " + props.curQuestion.correct_answer
                    }
                    </p>
                </>
            );
        } else {
            return (
                <>
                    <p className="trivia-pane-text results-text-incorrect">      
                    {
                        "Incorrect."
                    }
                    </p>
                    <p className="trivia-pane-text results-text-incorrect">
                    {
                        "Correct Answer: " + props.curQuestion.correct_answer
                    }
                    </p>
                </>
            );
        }
    }

    const onContinueButton = () => {
        if (answer === props.curQuestion.correct_answer) {
            props.setCorrectAnswers(props.correctAnswers+1);
        }  
        setAnswer(null);
        props.setCurQuestionIdx(props.curQuestionIdx+1);
    }

    const getContinueButton = () => {
        if (props.curQuestionIdx === (props.numQuestions-1)) {
            return (
                <Button className="trivia-pane-text continue-button"
                        onClick={() => {onContinueButton()}}>
                    Trivia Results
                </Button>
            );
        } else {
            return (
                <Button className="trivia-pane-text continue-button"
                        onClick={() => {onContinueButton()}}>
                    Next Question
                </Button>
            );
        }
    }
    
    return (
        answer === null ?
            <Col>
                <Row>
                    <Button className="true-false-btn"
                            onClick={() => {setAnswer("True")}}>
                    True
                    </Button>
                </Row>
                <Row>
                    <Button className="true-false-btn"
                            onClick={() => {setAnswer("False")}}>
                    False
                    </Button>
                </Row>
            </Col>
        :
        <Col>
            {getResultsDisplay()}
            {getContinueButton()}
        </Col>
    );
}

export default AnswerDisplayBoolean;