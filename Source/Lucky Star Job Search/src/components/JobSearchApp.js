import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navigation from './Navigation';
import SearchFilterBar from './SearchFilterBar';
import JobDisplayBox from './JobDisplayBox';
import OnboardingSlides from './OnboardingSlides';

const JobSearchApp = () => {
    const [viewFavorites, setViewFavorites] = useState(false);
    const [languageFilters, setLanguageFilters] = useState([]);
    const [onboardingComplete, setOnboardingComplete] = useState(null);

    const onboardingCompleteState = useSelector(state => state.user.onboardingComplete);

    useEffect(() => {
        setOnboardingComplete(onboardingCompleteState);
    }, [onboardingCompleteState])

    if (onboardingComplete) {
        return (
            <>
                <Navigation setViewFavorites={setViewFavorites} 
                            setOnboardingComplete={setOnboardingComplete} />
                <SearchFilterBar setLanguageFilters={setLanguageFilters}
                                 setViewFavorites={setViewFavorites}/>
                <JobDisplayBox languageFilters={languageFilters}
                               viewFavorites={viewFavorites}/>
            </>
        );
    } else {
        return (
            <OnboardingSlides setOnboardingComplete={setOnboardingComplete}/>
        )
    }
}

export default JobSearchApp;