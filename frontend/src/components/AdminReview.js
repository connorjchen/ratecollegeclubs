import { React, useState } from 'react'
import Rating from './Rating';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import { validate } from '../actions/reviewActions';
import { reviewDelete } from '../actions/reviewActions';

export default function AdminReview(props) {
    const { reportedReview } = props;
    const [visible, setVisible] = useState(true);
    const dispatch = useDispatch();

    let timestamp = reportedReview.createdAt.split('T')[0];
    let year = timestamp.split('-')[0]
    let tempMonth = parseInt(timestamp.split('-')[1], 10) - 1
    let day = parseInt(timestamp.split('-')[2], 10)
    let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = monthArray[tempMonth]

    const validateButtonHandler = () => {
        setVisible(false)
        dispatch(validate(reportedReview._id))
    }

    const deleteButtonHandler = () => {
        setVisible(false)
        dispatch(reviewDelete(reportedReview._id))
    }

    if (!visible) {
        return null;
    }

    return (
        <div style={{ marginBottom: "1rem" }}>
            <div class="row top">
                <div class='col-2'>
                    <div key={reportedReview._id} className="card" style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "60rem" }}>
                        <div className="card-body left">
                            <Rating rating={reportedReview.rating} numReviews={-1}></Rating>

                            <div style={{ display: 'flex' }}>
                                <span>
                                    <i style={{ marginTop: "0.5rem" }} className={reportedReview.recommend ? "fa fa-thumbs-up" : "fa fa-thumbs-down"}></i>
                                    {reportedReview.recommend ? (<p style={{ marginTop: "-1.5rem", marginLeft: "2rem", fontWeight: "bold" }} className="small-text">Recommends</p>) : (<p style={{ marginTop: "-1.5rem", marginLeft: "2rem", fontWeight: "bold" }} className="small-text">Does not recommend</p>)}
                                </span>
                                <p className="small-text" style={{ marginTop: ".8rem", marginLeft: ".2rem" }}>| Time Commitment: </p>
                                <p className="small-text" style={{ marginTop: ".8rem", marginLeft: ".2rem", fontWeight: "bold" }}>{reportedReview.timeCommitment} {reportedReview.timeCommitment === 1 ? "Hour" : "Hours"} / Week</p>
                            </div>
                            <div style={{ display: 'flex', marginTop: "-1rem" }}>
                                <p className="small-text" style={{ marginRight: ".2rem" }}>Position: </p>
                                <p className="small-text" style={{ fontWeight: "bold", marginRight: ".2rem" }}>{reportedReview.position}</p>
                                <p className="small-text" style={{ marginRight: ".2rem" }}> | Class: </p>
                                <p className="small-text" style={{ fontWeight: "bold", marginRight: ".2rem" }}>{reportedReview.class}</p>
                                <p className="small-text" style={{ marginRight: ".2rem" }}> | Major: </p>
                                <p className="small-text" style={{ fontWeight: "bold", marginRight: ".2rem" }}>{reportedReview.major}</p>
                            </div>
                            <p className="smallish-text">{reportedReview.comment}</p>
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