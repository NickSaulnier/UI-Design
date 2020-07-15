import React from 'react';
import { Col, Row } from 'reactstrap';

const JobListingBody = props => {
    return (
        <div className="job-listing-body-box">
            <Col>
                <Row>
                    <p className="job-listing-body-type">{props.type}</p>
                </Row>
                <Row>
                    <p className="job-listing-body-description">{props.description}</p>
                </Row>
            </Col>
        </div>
    );
}

export default JobListingBody;