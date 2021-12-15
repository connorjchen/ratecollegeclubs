import React, { useEffect, useState } from 'react'
import Difficulty from './Difficulty';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { report } from './../actions/interviewActions';

export default function Interview(props) {
    const { interview, filterOption } = props;
    const [visible, setVisible] = useState(true);
    let timestamp = interview.createdAt.split('T')[0];
    let year = timestamp.split('-')[0]
    let tempMonth = parseInt(timestamp.split('-')[1], 10) - 1
    let day = parseInt(timestamp.split('-')[2], 10)
    let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = monthArray[tempMonth]
    const dispatch = useDispatch();

    const reportHandler = () => {
        alert("The post has been reported and will go under review")
        setVisible(false)
        dispatch(report(interview._id))
    }

    if (!visible) {
        return null;
    }

    return (

        <div>
            {filterOption === "all" || filterOption === interview.difficulty.toString() ? (
                <div key={interview._id} className="card">
                    <div className="card-body left">
                        <Difficulty difficulty={interview.difficulty} numInterviews={-1}></Difficulty>
                        <div style={{ display: 'flex', marginTop: "-1rem" }}>
                            <p className="small-text" style={{ marginRight: ".2rem" }}> Applied for: </p>
                            <p className="small-text" style={{ fontWeight: "bold", marginRight: ".2rem" }}>{interview.roleApplied}</p>
                        </div>
                        <div style={{ display: 'flex', marginTop: "-1rem" }}>
                            <p className="small-text" style={{ marginRight: ".2rem" }}>Major: </p>
                            <p className="small-text" style={{ fontWeight: "bold", marginRight: ".2rem" }}>{interview.major}</p>
                        </div>
                        <p className="smallish-text">{interview.comment}</p>
                        <div style={{ display: 'flex', marginBottom: "-0.8rem" }}>
                            <p className="small-text">{month} {day}, {year}</p>
                            <span>
                                <i style={{ marginTop: "1rem", marginLeft: "1rem" }} className={"fa fa-flag flagCSS"} onClick={() => reportHandler()}></i>
                            </span>
                        </div>
                    </div>
                </div >
            ) : null}

        </div>
    )
}

