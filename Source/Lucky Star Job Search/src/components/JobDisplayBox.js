import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveAllJobs, retrieveCurrentUser, retrieveUserSavedJobs } from '../redux/actions';
import JobListing from './JobListing';
import JobSortBar from './JobSortBar';

const JobDisplayBox = props => {
    const [viewableJobs, setViewableJobs] = useState([]);
    const [sortByPopularity, setSortByPopularity] = useState(false);

    const toggleSortByPopularity = () => setSortByPopularity(!sortByPopularity);

    const dispatch = useDispatch();
    const jobsList = useSelector(state => state.masterJobsList);
    const currentUser = useSelector(state => state.user);
    const userSavedJobs = useSelector(state => state.userSavedJobs);

    const applyLanguageFilters = useCallback(
            () => {
            if (props.languageFilters.length > 0) {
                let newViewableJobs = [];

                for (const job of jobsList) {
                    for (const filter of props.languageFilters) {
                        if ((job.skills.includes(filter)) && (!newViewableJobs.includes(job))) {
                            newViewableJobs.push(job);
                        }
                    }
                }

                setViewableJobs(newViewableJobs);
            } else {
                setViewableJobs(jobsList);
            }
        },
        [props.languageFilters, jobsList],
    );

    useEffect(() => {
        dispatch(retrieveAllJobs());
        dispatch(retrieveCurrentUser());
    }, [dispatch])

    useEffect(() => {
        dispatch(retrieveUserSavedJobs(currentUser));
    }, [dispatch, currentUser])

    useEffect(() => {
        setViewableJobs(jobsList);
    }, [jobsList])

    useEffect(() => {
        applyLanguageFilters();
    }, [props.languageFilters, jobsList, applyLanguageFilters])

    useEffect(() => {
        if (props.viewFavorites === true) {
            setViewableJobs(userSavedJobs);
        } else {
            applyLanguageFilters();
        }
    }, [props.viewFavorites, userSavedJobs, applyLanguageFilters])

    return (
        <div id="job-display-container">
            <JobSortBar sortByPopularity={sortByPopularity}
                        toggleSortByPopularity={toggleSortByPopularity} 
                        viewableJobs={viewableJobs}
                        setViewableJobs={setViewableJobs} />
        {
            (props.viewFavorites === true) && (userSavedJobs.length === 0) ?
                <div className="job-listing-box job-listing-header-box elevation-level1">
                    <h1 id="display-box-no-jobs-header">You have no saved jobs.</h1>
                </div>
            :
                viewableJobs.length === 0 ?
                    <div className="job-listing-box job-listing-header-box elevation-level1">
                        <h1 id="display-box-no-jobs-header">No jobs match search criteria.</h1>
                    </div>
                :
                    viewableJobs.map((jobListing, i) => 
                        <JobListing key={i} job={jobListing} currentUser={currentUser} 
                                    viewFavorites={props.viewFavorites}
                                    userSavedJobs={userSavedJobs} 
                                    toggleRender={props.toggleRender}/>
                    )
        }
        </div>
    );
}

export default JobDisplayBox;