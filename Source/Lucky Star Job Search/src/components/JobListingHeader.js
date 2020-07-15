import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch } from 'react-redux';
import { saveJobForUser, deleteJobForUser } from '../redux/actions';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const snackbarAutoHideDuration = 800;
const deleteJobMessage = "Job deleted from favorites.";
const saveJobMessage = "Job added to favorites.";
const unsavedJobListingIconClassName = "svg-inline--fa fa-star fa-w-18 job-listing-header-save-button-icon";

const JobListingHeader = props => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const dispatch = useDispatch();

    const onSaveJobListing = () => {
        if (document.getElementById("job-listing-header-icon-" + props.job.id).className.animVal === unsavedJobListingIconClassName) {
            document.getElementById("job-listing-header-icon-" + props.job.id).classList.add("saved");
            dispatch(saveJobForUser(props.currentUser, props.job.id)); 
            setSnackbarMessage(saveJobMessage);
            setSnackbarOpen(false);
            setSnackbarOpen(true);
        } else {
            document.getElementById("job-listing-header-icon-" + props.job.id).classList.remove("saved");
            dispatch(deleteJobForUser(props.currentUser, props.job.id));
            setSnackbarMessage(deleteJobMessage);
            setSnackbarOpen(false);
            setSnackbarOpen(true);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            if (document.activeElement !== jobListingSaveButton) {
                setSnackbarOpen(false);
            }
        } else {
            setSnackbarOpen(false);
        }
    }

    const renderIcon = () => {
        if (props.viewFavorites === false) {
            for (const job of props.userSavedJobs) {
                if (job.id === props.job.id) {
                    return (
                        <FontAwesomeIcon icon={faStar}
                                        className="job-listing-header-save-button-icon saved"
                                        id={"job-listing-header-icon-" + props.job.id}
                                        onClick={() => onSaveJobListing()} tabIndex={1} />
                    )
                } 
            }
            return (
                <FontAwesomeIcon icon={faStar}
                                className="job-listing-header-save-button-icon"
                                id={"job-listing-header-icon-" + props.job.id}
                                onClick={() => onSaveJobListing()} />
            )
        } else {
            for (const job of props.userSavedJobs) {
                if (job.id === props.job.id) {
                    return (
                        <FontAwesomeIcon icon={faStar}
                                         className="job-listing-header-save-button-icon saved"
                                         id={"job-listing-header-icon-" + props.job.id}
                                         onClick={() => onSaveJobListing()} />
                    )
                }
            }
        }
    }

    const jobListingSaveButton = document.getElementById("job-listing-save-button");

    return (
        <div className="job-listing-header-box">
            <Col>
                <Row>
                    <h4 className="job-listing-header-title">{props.job.title}</h4>
                </Row>
                <Row>
                    <h5 className="job-listing-header-company">{props.job.company}</h5>
                </Row>
            </Col>
            <Col>
                <Button className="job-listing-header-save-button"
                        id="job-listing-save-button">
                    {renderIcon()}
                </Button>
            </Col>
            <Snackbar open={snackbarOpen} autoHideDuration={snackbarAutoHideDuration}
                      className="job-listing-header-snackbar" 
                      message={snackbarMessage}
                      onClose={handleClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}/>  
        </div>
    )
}

export default JobListingHeader;