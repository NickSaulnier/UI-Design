import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { faSortAmountUpAlt, faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const JobSortBar = props => {

    const handleSortBy = () => {
        props.toggleSortByPopularity();
        sortViewableJobs();
    }

    const sortViewableJobs = () => {
        let newViewableJobs = props.viewableJobs;
        if (props.sortByPopularity === false) {
            newViewableJobs.sort(function(x, y) {
                if (x.timesSaved < y.timesSaved) {
                    return 1;
                }
                if (x.timesSaved > y.timesSaved) {
                    return -1;
                }
                return 0;
            });
        }
        if (props.sortByPopularity === true) {
            newViewableJobs.sort(function(x, y) {
                if (x.timesSaved < y.timesSaved) {
                    return -1;
                }
                if (x.timesSaved > y.timesSaved) {
                    return 1;
                }
                return 0;
            });
            props.setViewableJobs(newViewableJobs);
        } 
    }

    return (
        <div id="job-sort-bar">
            <Col>
                <Row>
                    <h3 id="job-sort-bar-header" tabIndex={1}>Sort by popularity</h3>
                <Col>
                <Button id="sort-by-button"
                        onClick={handleSortBy} tabIndex={1}>
                {
                    props.sortByPopularity === false ?
                        <FontAwesomeIcon icon={faSortAmountUpAlt}
                                         id="sort-by-icon" />
                    :
                        <FontAwesomeIcon icon={faSortAmountDownAlt}
                                         id="sort-by-icon" />
                }
                </Button>
                </Col>
                </Row>
            </Col>
        </div>
    )
}

export default JobSortBar;