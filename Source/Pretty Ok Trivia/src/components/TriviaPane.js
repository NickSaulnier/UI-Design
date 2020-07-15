import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import { STATUS } from '../views/App';
import TriviaPaneHeader from './TriviaPaneHeader';
import QuestionDisplay from './QuestionDisplay';
import AnswerDisplay from './AnswerDisplay';

export const convertUnicodeChars = unicodeString => {
    let parser = new DOMParser();
    let dom = parser.parseFromString(unicodeString, 'text/html');

    return dom.body.textContent;
}

const TriviaPane = props => {
    const [curQuestionIdx, setCurQuestionIdx] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const onNewQuizClick = () => {
        props.setServingQuestions(false);
        props.setStatus(STATUS.PRE_SELECTION);
        props.toggleReset(!props.reset);
    }

    const getPaneDisplay = () => {
        if ((props.status === STATUS.PRE_SELECTION || props.status === STATUS.SUCCESS) &&
            props.servingQuestions === false) {
            return (
                <Button className="vertical-horizontal-center"
                        id="start-trivia-btn"
                        disabled={props.status === STATUS.SUCCESS ? false : true}
                        onClick={() => {props.setServingQuestions(true)}}>
                    Start Trivia
                </Button>
            );
        }

        if ((props.servingQuestions === true) && (curQuestionIdx < props.numQuestions)) {
            return (
                <>
                    <TriviaPaneHeader curQuestionIdx={curQuestionIdx}
                                      correctAnswers={correctAnswers} 
                                      questions={props.questions}/>
                    <hr id="trivia-pane-content-separator" ></hr>
                    <Row>
                        <Col xs={6}>
                            <QuestionDisplay curQuestionIdx={curQuestionIdx}
                                             questions={props.questions} />
                        </Col>
                        <Col xs={6}>
                            <AnswerDisplay curQuestion={props.questions[curQuestionIdx]}
                                           curQuestionIdx={curQuestionIdx}
                                           setCurQuestionIdx={setCurQuestionIdx}
                                           correctAnswers={correctAnswers}
                                           setCorrectAnswers={setCorrectAnswers}
                                           numQuestions={props.numQuestions}/>
                        </Col>
                    </Row>
                </>
            );
        }

        if (props.status === STATUS.NO_RESULTS) {
            return (
                <h3 className="vertical-horizontal-center trivia-pane-text"
                    id="no-results-error-header">
                    Error: it looks like you made a bad request!
                </h3>
            );
        }

        if ((props.servingQuestions === true) && 
            (curQuestionIdx === props.numQuestions)) {
            return (
                <Row>
                    <Col>
                        <p className="trivia-pane-text"
                           id="results-display-text" >
                            {"Results:\n"}<br/>
                            {correctAnswers + "/" + props.numQuestions + " Correct"}
                        </p>
                    </Col>
                    <Col>
                        <Button className="trivia-pane-text"
                                id="new-quiz-btn"
                                onClick={() => {onNewQuizClick()}}>
                            Start New Quiz
                        </Button>
                    </Col>
                </Row>
            );
        }
    }

    return(
        <Container id="quiz-container">
            {getPaneDisplay()}
        </Container>
    );
}

export default TriviaPane;