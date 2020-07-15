import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Slide from "./Slide";
import SlideIndicator from "./SlideIndicator";
import { completeOnboarding } from "../redux/actions";

const TOTAL_SLIDES = 3;

const OnboardingSlides = props => {
    const [activeSlide, setActiveSlide] = useState(1);

    const dispatch = useDispatch();

    const setSlideState = id => {
        if (id === activeSlide)
            return "active";
        return "inactive";
    }

    const nextSlide = () => {
        let id = activeSlide;
        id < TOTAL_SLIDES ? setActiveSlide(id + 1) : (() => {
            dispatch(completeOnboarding());
            props.setOnboardingComplete(true);
        })();
    }

    const generateSlideIndicators = () => {
        let indicators = [];
        for (let i = 1; i <= TOTAL_SLIDES; i++) {
            indicators.push(
                <SlideIndicator slideStatus={setSlideState(i)} key={i} 
                                slideID={i} 
                                clickHandler={() => setActiveSlide(i)} />
            )
        }
        return indicators;
    }

    return (
        <div className="slides-bg">
            <Slide slideStatus={setSlideState(1)} slideId={1}>
                <h1 className="slide-header">Filter job posting by programming language</h1>
                <p className="slide-body-text">Customize your job search to find jobs that match your skills.</p>
                <div className="fit my-4">
                    <img src={process.env.PUBLIC_URL + "/slide2.gif"}
                         className="img-fluid my-4 float-right fit"
                         alt="Filter job postings by programming language." />
                </div>
            </Slide>
            <Slide slideStatus={setSlideState(2)} slideId={2}>
                <h1 className="slide-header">Easily save and view jobs that you find interesting.</h1>
                <p className="slide-body-text">Keep tabs on your favorite jobs.</p>
                <div className="fit my-4">
                    <img src={process.env.PUBLIC_URL + "/slide4.gif"}
                         className="img-fluid my-4 float-right fit"
                         alt="Save jobs with just two clicks." />
                </div>
            </Slide>
            <Slide slideStatus={setSlideState(3)} slideId={3}>
                <h1 className="slide-header">Sort jobs by popularity.</h1>
                <p className="slide-body-text">Sort jobs by popularity with the click of your mouse.</p>
                <div className="fit my-4">
                    <img src={process.env.PUBLIC_URL + "/slide3.gif"}
                         className="img-fluid my-4 float-right fit"
                         alt="Sort by popularity." />
                </div>
            </Slide>
            <div className="slides-controls">
                <button className="align-left control-btn" onClick={() => {
                    dispatch(completeOnboarding());
                    props.setOnboardingComplete(true);
                    }}>
                    Skip
                </button>
                <div className="align-center">
                    {generateSlideIndicators()}
                </div>
                <button className="align-right control-btn" onClick={nextSlide}>
                    {
                        activeSlide < TOTAL_SLIDES ? "Next" : "Done"
                    }
                </button>
            </div>
        </div>
    )
}

export default OnboardingSlides;