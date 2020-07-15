import React, { useEffect, useState } from 'react';
import { Container, Button } from 'reactstrap';
import TriviaPane from '../components/TriviaPane';
import Settings from '../components/Settings';
import Loading from '../components/Loading';
import ConfirmRequestModal from '../components/ConfirmRequestModal';

const DEFAULT_NUM_QUESTIONS = 5;

export const DIFFICULTY = {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard"
}

export const STATUS = {
    PRE_SELECTION: "-2",
    LOADING: "-1",
    SUCCESS: "0",
    NO_RESULTS: "1",
    INVALID_PARAMETER: "2"
}

const ERRORS = {
    NO_RESULTS: "error: no response",
    INVALID_PARAMETER: "error: invalid parameter"
}

const requestQuestions = async (numQuestions, categoryId, difficulty, setStatus) => {
    let apiUrl = "https://opentdb.com/api.php?amount=";

    apiUrl += numQuestions;
    apiUrl += "&category=" + categoryId;
    apiUrl += "&difficulty=" + difficulty;

    let response = await fetch(apiUrl);
    let questions = await response.json();

    if (questions.response_code.toString() === STATUS.NO_RESULTS) {
        throw ERRORS.NO_RESULTS;
    }
    
    if (questions.response_code.toString() === STATUS.INVALID_PARAMETER) {
        console.log(apiUrl);
        throw ERRORS.INVALID_PARAMETER;
    }

    return questions;
}

const requestCategories = async () => {
    let apiCategoriesUrl = "https://opentdb.com/api_category.php";
    let response = await fetch(apiCategoriesUrl);
    let categoriesData = await response.json();
    return categoriesData;
}

const convertCategoriesData = data => {
    let categoriesArray = [];
    const categoriesObjs = data.trivia_categories;

    categoriesObjs.map(category => (
        categoriesArray.push(category.name)
    ));

    return categoriesArray;
}

const generateCategoryIdMap = data => {
    let categoryIdMap = new Map();
    const categoriesObjs = data.trivia_categories;

    categoriesObjs.map(category => (
        categoryIdMap.set(category.name, category.id)
    ));

    return categoryIdMap;
}

const App = () => {
    const [reset, toggleReset] = useState(false);
    const [status, setStatus] = useState(STATUS.LOADING);
    const [difficulty, setDifficulty] = useState(DIFFICULTY.MEDIUM);
    const [category, setCategory] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categoryIdMap, setCategoryIdMap] = useState(new Map());
    const [questionCategories, setQuestionCategories] = useState([]);
    const [numQuestions, setNumQuestions] = useState(DEFAULT_NUM_QUESTIONS);
    const [questions, setQuestions] = useState([]);
    const [servingQuestions, setServingQuestions] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);

    useEffect(() => {
        if ((status === STATUS.LOADING) && (categoryId !== undefined) && (categoryId !== "")){
            requestQuestions(numQuestions, categoryId, difficulty, setStatus).then(data => {
                setStatus(STATUS.SUCCESS);
                setQuestions(data.results);
            }).catch(error => {
                if (error === ERRORS.NO_RESULTS) {
                    setStatus(STATUS.NO_RESULTS);
                }

                if (error === ERRORS.INVALID_PARAMETER) {
                    setStatus(STATUS.INVALID_PARAMETER);
                }

                console.log(error);
            })
        }
    }, [status, numQuestions, categoryId, difficulty])

    useEffect(() => {
        requestCategories().then(data => {
            let questionCats = convertCategoriesData(data);
            let categoryMap = generateCategoryIdMap(data);
            let categoryIdx = Math.floor(Math.random() * Math.floor(questionCats.length));

            setQuestionCategories(questionCats);
            setCategoryIdMap(categoryMap);
            setCategory(questionCats[categoryIdx]);
            setCategoryId(data.trivia_categories[categoryIdx].id);
            setStatus(STATUS.PRE_SELECTION);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        let categoryIdx = Math.floor(Math.random() * Math.floor(questionCategories.length));

        setDifficulty(DIFFICULTY.MEDIUM);
        setCategory(questionCategories[categoryIdx]);
        setCategoryId(categoryIdMap.get(questionCategories[categoryIdx]));
        setNumQuestions(DEFAULT_NUM_QUESTIONS);
    }, [reset, questionCategories, categoryIdMap]);

    const onGetQuestions = () => {
        if (servingQuestions === true) {
            setConfirmModal(!confirmModal);
        } else {
            setStatus(STATUS.LOADING);
        }
    }

    return (
    <Container>
    {
        status === STATUS.LOADING ?
            <Loading />
            :
            <>
                <h1 id="main-header" tabIndex={0}>Pretty Ok Trivia</h1>
                <TriviaPane questions={questions}
                            numQuestions={numQuestions}
                            status={status}
                            setStatus={setStatus}
                            servingQuestions={servingQuestions}
                            setServingQuestions={setServingQuestions} 
                            reset={reset}
                            toggleReset={toggleReset}/>
                <Button id="get-questions-btn"
                        onClick={() => onGetQuestions()}>
                    Get quiz questions
                </Button>
                <Settings defaultCategory={category}
                          setCategory={setCategory}
                          categoryList={questionCategories}
                          defaultDifficulty={difficulty}
                          setDifficulty={setDifficulty}
                          defaultNumQuestions={numQuestions}
                          setNumQuestions={setNumQuestions}
                          categoryIdMap={categoryIdMap} 
                          setCategoryId={setCategoryId}
                          servingQuestions={servingQuestions} />
                <ConfirmRequestModal confirmModal={confirmModal}
                                     setConfirmModal={setConfirmModal}
                                     setStatus={setStatus} 
                                     setServingQuestions={setServingQuestions} />
            </>
    }
    </Container>
    )
}

export default App;
