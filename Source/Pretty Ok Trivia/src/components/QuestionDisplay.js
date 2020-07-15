import React from 'react';
import { convertUnicodeChars } from './TriviaPane';

const QuestionDisplay = props => 
        <>
            <p className="trivia-pane-text" tabIndex={0}>
                {convertUnicodeChars(props.questions[props.curQuestionIdx].question)}
            </p>
        </>

export default QuestionDisplay;