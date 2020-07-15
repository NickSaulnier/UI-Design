import React from 'react';
import JobListingHeader from './JobListingHeader';
import JobListingBody from './JobListingBody';

const JobListing = props => {
    return (
        <div className="job-listing-box elevation-level1" tabIndex={1}>
            <JobListingHeader job={props.job}
                              currentUser={props.currentUser}
                              viewFavorites={props.viewFavorites}
                              userSavedJobs={props.userSavedJobs} 
                              toggleRender={props.toggleRender}/>
            <hr />
            <JobListingBody description={props.job.description}
                            type={props.job.type} />
        </div>
    )
}

export default JobListing;