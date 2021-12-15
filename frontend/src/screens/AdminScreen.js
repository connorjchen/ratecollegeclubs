import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating'
import { listInvalidClubs } from '../actions/clubActions';
import AdminClub from '../components/AdminClub'
import AdminReview from '../components/AdminReview'
import AdminInterview from '../components/AdminInterview'
import SearchBar from '../components/SearchBar';
import { listAllSchools, listSchools } from './../actions/schoolActions';
import bcrypt from 'bcryptjs'
import { listReportedReviews } from '../actions/reviewActions';
import { listReportedInterviews } from '../actions/interviewActions';
import { report } from './../actions/reviewActions';
import Footer from './../components/Footer';
import Header from './../components/Header';
import AdminSchool from '../components/AdminSchool';

export default function AdminScreen(props) {
    const dispatch = useDispatch()
    const [unlocked, setUnlocked] = useState(false);

    //change to all list
    const schoolListAll = useSelector(state => state.schoolListAll);
    const { loadingAllSchools, errorAllSchools, allSchools } = schoolListAll;

    useEffect(() => {
        dispatch(listAllSchools());
    }, [dispatch]);

    const clubInvalidList = useSelector(state => state.clubInvalidList);
    const { loadingInvalidClubs, errorInvalidClubs, invalidClubs, } = clubInvalidList;

    useEffect(() => {
        dispatch(listInvalidClubs());
    }, [dispatch,]);

    const reviewReportedList = useSelector(state => state.reviewReportedList);
    const { loadingReportedReviews, errorReportedReviews, reportedReviews, } = reviewReportedList;

    useEffect(() => {
        dispatch(listReportedReviews());
    }, [dispatch,]);

    const interviewReportedList = useSelector(state => state.interviewReportedList);
    const { loadingReportedInterviews, errorReportedInterviews, reportedInterviews, } = interviewReportedList;

    useEffect(() => {
        dispatch(listReportedInterviews());
    }, [dispatch,]);


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

    return (
        <div className="grid-container">
            <Header></Header>
            <main>
                <div>
                    {windowWidth > 930 ? (
                        <div style={{ marginTop: "1rem" }}>
                            {!unlocked ? (
                                <div style={{ textAlign: "center" }}>
                                    <input
                                        style={{ textAlign: "center" }}
                                        className="halfRowInputs"
                                        type="password"
                                        id="password"
                                        placeholder="Enter password"
                                        required
                                        onChange={e => setUnlocked(bcrypt.compareSync(e.target.value, "$2a$08$hMoS26DIzhGpdylor59sY.Zbn24DwLFVG/ug/uCtfRsoGNqV2WeJG"))}
                                    ></input>
                                </div>
                            ) : (loadingInvalidClubs || loadingReportedReviews || loadingReportedInterviews || loadingAllSchools) ? <LoadingBox></LoadingBox> :
                                (errorInvalidClubs || errorReportedReviews || errorReportedInterviews || errorAllSchools) ? <MessageBox variant="danger">{errorInvalidClubs}</MessageBox> :
                                    (<div>
                                        <div>
                                            {invalidClubs.length === 0 && reportedReviews.length === 0 && reportedInterviews.length === 0 && allSchools.filter(function (aSchool) { return aSchool.valid === false; }).length === 0 ? (<p style={{ textAlign: "center" }}>Nothing to be validated</p>) : (
                                                <div class="col-2" style={{ marginTop: "1rem" }}>
                                                    {allSchools.filter(function (aSchool) { return aSchool.valid === false; }).length === 0 ? null : (<h2 style={{ textAlign: "center" }}>Schools</h2>)}
                                                    {allSchools.filter(function (aSchool) { return aSchool.valid === false; }).map(school => (<AdminSchool key={school._id} school={school}></AdminSchool>))}
                                                    {invalidClubs.length === 0 ? null : (<h2 style={{ textAlign: "center" }}>Clubs</h2>)}
                                                    {invalidClubs.map(club => (<AdminClub key={club._id} club={club} schools={allSchools}></AdminClub>))}
                                                    {reportedReviews.length === 0 ? null : (<h2 style={{ textAlign: "center" }}>Reviews</h2>)}
                                                    {reportedReviews.map(reportedReview => (<AdminReview key={reportedReview._id} reportedReview={reportedReview}></AdminReview>))}
                                                    {reportedInterviews.length === 0 ? null : (<h2 style={{ textAlign: "center" }}>Application Processes</h2>)}
                                                    {reportedInterviews.map(reportedInterview => (<AdminInterview key={reportedInterviews._id} reportedInterview={reportedInterview}></AdminInterview>))}
                                                </div>
                                            )}

                                        </div>
                                    </div>)}

                        </div>
                    ) :
                        (
                            <div style={{ marginTop: "4rem" }}>
                                {!unlocked ? (
                                    <div style={{ textAlign: "center" }}>
                                        <input
                                            style={{ textAlign: "center" }}
                                            className="halfRowInputs"
                                            type="password"
                                            id="password"
                                            placeholder="Enter password"
                                            required
                                            onChange={e => setUnlocked(bcrypt.compareSync(e.target.value, "$2a$08$hMoS26DIzhGpdylor59sY.Zbn24DwLFVG/ug/uCtfRsoGNqV2WeJG"))}
                                        ></input>
                                    </div>
                                ) : (loadingInvalidClubs || loadingReportedReviews || loadingReportedInterviews || loadingAllSchools) ? <LoadingBox></LoadingBox> :
                                    (errorInvalidClubs || errorReportedReviews || errorReportedInterviews || errorAllSchools) ? <MessageBox variant="danger">{errorInvalidClubs}</MessageBox> :
                                        (<div>
                                            <div>
                                                {invalidClubs.length === 0 && reportedReviews.length === 0 && reportedInterviews.length === 0 && allSchools.filter(function (aSchool) { return aSchool.valid === false; }).length === 0 ? (<p style={{ textAlign: "center" }}>Nothing to be validated</p>) : (
                                                    <div class="col-2" style={{ marginTop: "1rem" }}>
                                                        {allSchools.filter(function (aSchool) { return aSchool.valid === false; }).length === 0 ? null : (<h2 style={{ textAlign: "center" }}>Schools</h2>)}
                                                        {allSchools.filter(function (aSchool) { return aSchool.valid === false; }).map(school => (<AdminSchool key={school._id} school={school}></AdminSchool>))}
                                                        {invalidClubs.length === 0 ? null : (<h2 style={{ textAlign: "center" }}>Clubs</h2>)}
                                                        {invalidClubs.map(club => (<AdminClub key={club._id} club={club} schools={allSchools}></AdminClub>))}
                                                        {reportedReviews.length === 0 ? null : (<h2 style={{ textAlign: "center" }}>Reviews</h2>)}
                                                        {reportedReviews.map(reportedReview => (<AdminReview key={reportedReview._id} reportedReview={reportedReview}></AdminReview>))}
                                                        {reportedInterviews.length === 0 ? null : (<h2 style={{ textAlign: "center" }}>Application Processes</h2>)}
                                                        {reportedInterviews.map(reportedInterview => (<AdminInterview key={reportedInterviews._id} reportedInterview={reportedInterview}></AdminInterview>))}
                                                    </div>
                                                )}

                                            </div>
                                        </div>)}

                            </div>
                        )}

                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}