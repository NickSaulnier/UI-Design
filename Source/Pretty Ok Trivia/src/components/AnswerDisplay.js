import React from 'react';
import AnswerDisplayMultipleChoice from './AnswerDisplayMultipleChoice';
import AnswerDisplayBoolean from './AnswerDisplayBoolean';

const QUESTION_TYPES = {
    MULTIPLE: "multiple",
    BOOLEAN: "boolean"
}

const AnswerDisplay = props => {
    const getAnswerDisplay = () => {
        if (props.curQuestion.type === QUESTION_TYPES.MULTIPLE) {
            return(
                <AnswerDisplayMultipleChoice curQuestion={props.curQuestion}
                                             curQuestionIdx={props.curQuestionIdx}
                                             setCurQuestionIdx={props.setCurQuestionIdx}
                                             correctAnswers={props.correctAnswers}
                                             setCorrectAnswers={props.setCorrectAnswers}
                                             numQuestions={props.numQuestions} />
            );
        }
        else {
            return (
                <AnswerDisplayBoolean curQuestion={props.curQuestion}
                                      curQuestionIdx={props.curQuestionIdx}
                                      setCurQuestionIdx={props.setCurQuestionIdx} 
                                      correctAnswers={props.correctAnswers}
                                      setCorrectAnswers={props.setCorrectAnswers}
                                      numQuestions={props.numQuestions} />
            );
        }
    }

    return (
        <>
            {getAnswerDisplay()}
        </>
    );
}

export default AnswerDisplay;