import React, { useEffect, useState } from 'react'
import Rating from './Rating';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { report } from './../actions/reviewActions';

export default function Review(props) {
    const { review, filterOption } = props;
    const [visible, setVisible] = useState(true);
    let timestamp = review.createdAt.split('T')[0];
    let year = timestamp.split('-')[0]
    let tempMonth = parseInt(timestamp.split('-')[1], 10) - 1
    let day = parseInt(timestamp.split('-')[2], 10)
    let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = monthArray[tempMonth]
    const dispatch = useDispatch();

    const reportHandler = () => {
        alert("The post has been reported and will go under review")
        setVisible(false)
        dispatch(report(review._id))
    }

    

    //window size system
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);

    if (!visible) {
        return null;
    }

    return (
        <div>
            {windowWidth > 930 ? (
                <div>
                    {filterOption === "all" || filterOption === review.rating.toString() ? (
                        <div key={review._id} className="card">
                            <div className="card-body left">
                                <Rating rating={review.rating} numReviews={-1}></Rating>

                                <div style={{ display: 'flex' }}>
                                    <span>
                                        <i style={{ marginTop: "0.5rem" }} className={review.recommend ? "fa fa-thumbs-up" : "fa fa-thumbs-down"}></i>
                                        {review.recommend ? (<p style={{ marginTop: "-1.5rem", marginLeft: "2rem", fontWeight: "bold" }} className="small-text">Recommends</p>) : (<p style={{ marginTop: "-1.5rem", marginLeft: "2rem", fontWeight: "bold" }} className="small-text">Does not recommend</p>)}
                                    </span>
                                    <p className="small-text" style={{ marginTop: ".8rem", marginLeft: ".2rem" }}>| Time Commitment: </p>
                                    <p className="small-text" style={{ marginTop: ".8rem", marginLeft: ".2rem", fontWeight: "bold" }}>{review.timeCommitment} {review.timeCommitment === 1 ? "Hour" : "Hours"} / Week</p>
                                </div>
                                <div style={{ display: 'flex', marginTop: "-1rem" }}>
                                    <p className="small-text" style={{ marginRight: ".2rem" }}>Class: </p>
                                    <p className="small-text" style={{ fontWeight: "bold", marginRight: ".2rem" }}>{review.class}</p>
                                    <p className="small-text" style={{ marginRight: ".2rem" }}> | Major: </p>
                                    <p className="small-text" style={{ fontWeight: "bold", marginRight: ".2rem" }}>{review.major}</p>
                                </div>
                                <div style={{ display: 'flex', marginTop: "-1rem" }}>
                                    <p className="small-text" style={{ marginRight: ".2rem" }}>Position: </p>
                                    <p className="small-text" style={{ fontWeight: "bold", marginRight: ".2rem" }}>{review.position}</p>
                                </div>
                                <p className="smallish-text">{review.comment}</p>
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
            ) : (
                <div>
                    {filterOption === "all" || filterOption === review.rating.toString() ? (
                        <div key={review._id} className="card">
                            <div className="card-body left">
                                <Rating rating={review.rating} numReviews={-1}></Rating>
                                <span>
                                    <i style={{ marginTop: "0.5rem" }} className={review.recommend ? "fa fa-thumbs-up" : "fa fa-thumbs-down"}></i>
                                    {review.recommend ? (<p style={{ marginTop: "-1.5rem", marginLeft: "2rem", fontWeight: "bold" }} className="small-text">Recommends</p>) : (<p style={{ marginTop: "-1.5rem", marginLeft: "2rem", fontWeight: "bold" }} className="small-text">Does not recommend</p>)}
                                </span>
                                <div style={{ display: 'flex' }}>
                                    <p className="small-text" style={{ marginTop: 0 }}>Time Commitment: </p>
                                    <p className="small-text" style={{ marginTop: 0, marginLeft: ".2rem", fontWeight: "bold" }}>{review.timeCommitment} {review.timeCommitment === 1 ? "Hour" : "Hours"} / Week</p>
                                </div>
                                <div style={{ display: 'flex', marginTop: "-1rem" }}>
                                    <p className="small-text" style={{ marginRight: ".2rem" }}>Class: </p>
                                    <p className="small-text" style={{ fontWeight: "bold", marginRight: ".2rem" }}>{review.class}</p>
                                </div>
                                <div style={{ display: 'flex', marginTop: "-1rem" }}>
                                    <p className="small-text" style={{ marginRight: ".2rem" }}>Major: </p>
                                    <p className="small-text" style={{ fontWeight: "bold", marginRight: ".2rem" }}>{review.major}</p>
                                </div>
                                <div style={{ display: 'flex', marginTop: "-1rem" }}>
                                    <p className="small-text" style={{ marginRight: ".2rem" }}>Position: </p>
                                    <p className="small-text" style={{ fontWeight: "bold", marginRight: ".2rem" }}>{review.position}</p>
                                </div>
                                <p className="smallish-text">{review.comment}</p>
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
            )}

        </div>
    )
}

