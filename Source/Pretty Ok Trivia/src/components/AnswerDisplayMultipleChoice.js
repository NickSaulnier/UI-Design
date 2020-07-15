import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { convertUnicodeChars } from './TriviaPane';

const ANSWER_STATUS = {
    LOADING: "0",
    LOADED: "1"
}

const AnswerDisplayMultipleChoice = props => {
    const [answerIdx, setAnswerIdx] = useState(null);
    const [answersList, setAnswersList] = useState([]);
    const [correctAnswerIdx, setCorrectAnswerIdx] = useState(null);
    const [answerStatus, setAnswerStatus] = useState(ANSWER_STATUS.LOADING);

    useEffect(() => {
        if (answerStatus === ANSWER_STATUS.LOADING) {

            const ansList = (() => {
                let intermediateList = [];
                let numOfAnswers = props.curQuestion.incorrect_answers.length + 1;
                let returnList = [];
        
                intermediateList.push(props.curQuestion.correct_answer);
                intermediateList.push(...props.curQuestion.incorrect_answers);
        
                while (returnList.length < numOfAnswers) {
                    returnList.push(intermediateList.splice(Math.floor(Math.random() 
                        * Math.floor(intermediateList.length)), 1)[0]);
                }
        
                return returnList;
            })();

            const correctAnsIdx = (() => {
                let correctAnswerIdx = 0;
        
                for (let answer of ansList) {
                    if (answer === props.curQuestion.correct_answer) {
                        return correctAnswerIdx;
                    }
                    correctAnswerIdx++;
                }
            })();

            setAnswersList(ansList);
            setCorrectAnswerIdx(correctAnsIdx);
            setAnswerStatus(ANSWER_STATUS.LOADED);
        }
    }, [answersList, correctAnswerIdx, answerStatus, props.curQuestion.correct_answer, props.curQuestion.incorrect_answers]);

    const getResultsDisplay = () => {
        if (answersList[answerIdx] === props.curQuestion.correct_answer) {
            return (
                <>
                    <p className="trivia-pane-text results-text-correct">Correct!</p>
                    <p className="trivia-pane-text results-text-correct">
                    {
                        "Your Answer: " + String.fromCharCode(answerIdx+65) + ". " +
                        convertUnicodeChars(answersList[correctAnswerIdx])
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
                        "Your Answer: " + String.fromCharCode(answerIdx+65) + ". " +
                        convertUnicodeChars(answersList[answerIdx])
                    }
                    </p>
                    <p className="trivia-pane-text results-text-incorrect">
                    {
                        "Correct Answer: " + String.fromCharCode(correctAnswerIdx+65) + ". " + 
                        convertUnicodeChars(props.curQuestion.correct_answer) 
                    }
                    </p>
                </>
            );
        }
    }

    const onContinueButton = () => {
        if (answersList[answerIdx] === props.curQuestion.correct_answer) {
            props.setCorrectAnswers(props.correctAnswers+1);
        }  
        props.setCurQuestionIdx(props.curQuestionIdx+1);
        setAnswerIdx(null);
        setAnswerStatus(ANSWER_STATUS.LOADING);
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
        answerIdx === null ?
            <Col>
                {
                    answersList.map((answer, i) => (
                        <Row key={i}>
                            <Button className="multiple-choice-answer-btn"
                                    onClick={() => {setAnswerIdx(i)}}>
                            {
                                String.fromCharCode(i+65) + '.\t' + convertUnicodeChars(answer)
                            }
                            </Button>
                        </Row>
                    ))
                }
            </Col>
        :
            <Col>
                {getResultsDisplay()}
                {getContinueButton()}
            </Col>
    );
}

export default AnswerDisplayMultipleChoice;