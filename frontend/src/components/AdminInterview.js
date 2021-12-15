import { React, useState } from 'react'
import Rating from './Rating';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import { validate } from '../actions/interviewActions';
import { interviewDelete } from '../actions/interviewActions';
import Difficulty from './Difficulty';

export default function AdminInterview(props) {
    const { reportedInterview } = props;
    const [visible, setVisible] = useState(true);
    const dispatch = useDispatch();

    let timestamp = reportedInterview.createdAt.split('T')[0];
    let year = timestamp.split('-')[0]
    let tempMonth = parseInt(timestamp.split('-')[1], 10) - 1
    let day = parseInt(timestamp.split('-')[2], 10)
    let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = monthArray[tempMonth]

    const validateButtonHandler = () => {
        setVisible(false)
        dispatch(validate(reportedInterview._id))
    }

    const deleteButtonHandler = () => {
        setVisible(false)
        dispatch(interviewDelete(reportedInterview._id))
    }

    if (!visible) {
        return null;
    }

    return (
        <div style={{ marginBottom: "1rem" }}>
            <div class="row top">

                <div class='col-2'>
                    <div key={reportedInterview._id} className="card" style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "60rem" }}>
                        <div className="card-body left">
                            <Difficulty difficulty={reportedInterview.difficulty} numInterviews={-1}></Difficulty>
                            <div style={{ display: 'flex', marginTop: "-1rem" }}>
                                <p className="small-text" style={{ marginRight: ".2rem" }}> Applied for: </p>
                                <p className="small-text" style={{ fontWeight: "bold", marginRight: ".2rem" }}>{reportedInterview.roleApplied}</p>
                                <p className="small-text" style={{ marginRight: ".2rem" }}> | Major: </p>
                                <p className="small-text" style={{ fontWeight: "bold", marginRight: ".2rem" }}>{reportedInterview.major}</p>
                            </div>
                            <p className="smallish-text">{reportedInterview.comment}</p>
                            <div style={{ display: 'flex', marginBottom: "-0.8rem" }}>
                                <p className="small-text">{month} {day}, {year}</p>
                            </div>
                        </div>
                    </div >
                    <div class="row" style={{ justifyContent: "space-evenly" }}>
                        <button onClick={() => { deleteButtonHandler() }} className="admin">
                            <div>Delete</div>
                        </button>
                        <button onClick={() => { validateButtonHandler() }} className="admin" style={{ backgroundColor: "rgb(0, 140, 128)" }}>
                            <div>Validate</div>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}