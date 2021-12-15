import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { post } from './../actions/reviewActions';
import { post as postClub } from '../actions/clubActions';
import { post as postInterview } from './../actions/interviewActions';
import MessageBox from './../components/MessageBox';
import LoadingBox from './../components/LoadingBox';
import Select from 'react-select';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { detailsClub } from '../actions/clubActions';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Footer from './../components/Footer';
import Header from './../components/Header';

export default function ClubPostScreen(props) {
    var Filter = require('bad-words-relaxed'),
        filter = new Filter();
    filter.removeWords(
        "analysis",
        "analyst",
        "analyze",
        "anticipate",
        "assess",
        "assessment",
        "circumstance",
        "cluster",
        "participant",
        "participate",
        "participation",
        "popular",
        "population",
        "principal",
        "reputation",
        "shore",
        "space");

    const schoolId = props.match.params.schoolId;
    const [clubName, setClubName] = useState('')

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(-1);
    const [timeCommitment, setTimeCommitment] = useState();
    const [recommend, setRecommend] = useState(0);
    const [classField, setClassField] = useState('');
    const [major, setMajor] = useState('');
    const [position, setPosition] = useState('');
    const [comment, setComment] = useState('');

    const [isInterview, setIsInterview] = useState(false);
    const [difficulty, setDifficulty] = useState(1);
    const [roleApplied, setRoleApplied] = useState('');
    const [interviewComment, setInterviewComment] = useState('');

    let history = useHistory();
    const dispatch = useDispatch();

    let dispatchClub = function (clubName, schoolId) {
        return dispatch(postClub(clubName, schoolId)).then(data => { return data })
    }

    const marks = [
        {
            value: 1,
            label: 'Very Easy',
        },
        {
            value: 2,
            label: 'Easy',
        },
        {
            value: 3,
            label: 'Average',
        },
        {
            value: 4,
            label: 'Hard',
        },
        {
            value: 5,
            label: 'Very Hard',
        },
    ];

    const submitHandler = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('No rating entered');
        } else if (recommend === 0) {
            alert('No recommendation entered');
        } else if (classField === '') {
            alert('No class entered');
        } else if (timeCommitment < 0) {
            alert('Entered negative number of hours');
        } else if (timeCommitment > 50) {
            alert('Entered unreasonably high number (>50) of hours');
        } else {
            alert('Club will be reviewed after posting');
            //very long way around to get club id but works for some reason
            let data = dispatchClub(clubName, schoolId)
            let clubId = '';
            data.then(function (result) {
                //returns {"_id":"60ecab527bb5ad579404c4b8"}
                // console.log(result) 
                for (var key in result) {
                    if (key >= 8) {
                        clubId += result[key]
                    }
                }
                clubId = clubId.substring(0, clubId.length - 2);
                dispatch(post(clubId, rating, timeCommitment, recommend, classField, filter.clean(major), filter.clean(position), filter.clean(comment)));
                if (isInterview) {
                    dispatch(postInterview(clubId, difficulty, filter.clean(major), filter.clean(roleApplied), filter.clean(interviewComment)));
                }
                let path = `/school/${schoolId}`;
                history.push(path);
            })
        }
    }

    const labels = {
        0: 'No rating',
        1: 'Poor',
        2: 'Subpar',
        3: 'Average',
        4: 'Good',
        5: 'Excellent',
    };

    const classOptions = [
        { label: "Freshman", value: "Freshman" },
        { label: "Sophomore", value: "Sophomore" },
        { label: "Junior", value: "Junior" },
        { label: "Senior", value: "Senior" },
        { label: "Graduate Student", value: "Graduate Student" },
        { label: "Alum", value: "Alum" },
        { label: "Other", value: "Other" },
    ];

    const cancelButtonHandler = () => {
        let path = `/school/${schoolId}`;
        history.push(path);
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

    const checkKeyDown = (e) => { const keyCode = e.keyCode ? e.keyCode : e.which; if (keyCode === 13) { e.preventDefault() }; };

    return (
        <div className="grid-container">
            <Header></Header>
            <main>
                <div>
                    {windowWidth > 930 ? (
                        <div>
                            <form className="form" onSubmit={submitHandler} onKeyDown={(e) => checkKeyDown(e)}>
                                <div class="reviewButtonRow reviewTop">
                                    <div>
                                        <h1 style={{ marginTop: "-1rem", marginBottom: "-1rem" }}>Add Your Club</h1>
                                        <p style={{ margin: "0", fontSize: "1rem" }}>*Club will be reviewed after posting</p>
                                    </div>
                                    <div>
                                        <label htmlFor="clubName">Club name</label>
                                        <input
                                            className="halfRowInputs"
                                            type="text"
                                            id="clubName"
                                            placeholder="Enter club name"
                                            required
                                            onChange={e => setClubName(e.target.value)}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ marginTop: "0.75rem", marginBottom: "-1rem" }}>Review</p>
                                    <p style={{ marginTop: "-0.3rem", color: "#c0c0c0", textAlign: "center", marginBottom: "0" }}>______________________________________________________</p>
                                </div>
                                <div class="reviewButtonRow reviewTop">
                                    <div style={{ width: "22rem" }}>
                                        <label style={{ marginTop: "-0.5rem" }} htmlFor="rating">Overall Rating</label>
                                        <div style={{ marginTop: "-0.5rem" }}>
                                            <Rating
                                                name="hover-feedback"
                                                value={rating}
                                                style={{ fontSize: "3rem", width: "15rem" }}
                                                precision={1}
                                                onChange={(event, newValue) => {
                                                    setRating(newValue);
                                                }}
                                                onChangeActive={(event, newHover) => {
                                                    setHover(newHover);
                                                }}
                                            />
                                            <div style={{ marginLeft: "14rem", marginTop: "-3rem" }}>
                                                {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ width: "22rem" }}>
                                        <label htmlFor="recommend">Would you recommend it?</label>
                                        <div style={{ display: "flex" }}>
                                            <div>
                                                <input id="box1" type="checkbox" class="with-font" checked={recommend === true} onChange={() => setRecommend(true)} />
                                                <label for="box1">Yes</label>
                                            </div>
                                            <div style={{ marginLeft: "2rem" }}>
                                                <input id="box2" type="radio" class="with-font" checked={recommend === false} onChange={() => setRecommend(false)} />
                                                <label for="box2">No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="reviewButtonRow reviewTop" style={{ marginTop: "-1.5rem" }}>
                                    <div>
                                        <label htmlFor="timeCommitment">Hours Per Week</label>
                                        <input
                                            className="halfRowInputs"
                                            type="number"
                                            min="0"
                                            id="timeCommitment"
                                            placeholder="Enter number of hours"
                                            required
                                            onChange={e => setTimeCommitment(Math.trunc(e.target.value))}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="position">Position</label>
                                        <input
                                            className="halfRowInputs"
                                            type="text"
                                            id="position"
                                            placeholder="Enter position"
                                            required
                                            onChange={e => setPosition(e.target.value)}
                                        ></input>
                                    </div>
                                </div>
                                <div class="reviewButtonRow reviewTop">
                                    <div>
                                        <label htmlFor="class">Class</label>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isSearchable={true}
                                            name="class-option"
                                            placeholder="Select class"
                                            options={classOptions}
                                            onChange={(v) => setClassField(v.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="major">Major</label>
                                        <input
                                            className="halfRowInputs"
                                            type="text"
                                            id="major"
                                            placeholder="Enter major"
                                            required
                                            onChange={e => setMajor(e.target.value)}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="comment">Review Comment</label>
                                    {/* <input
                                                    multiLine={true}
                                                    style={{ width: "45.8rem" }}
                                                    type="text"
                                                    id="comment"
                                                    placeholder="Enter general thoughts about your experience"
                                                    required
                                                    onChange={e => setComment(e.target.value)}
                                                ></input> */}
                                    <TextField
                                        sx={{ '& .MuiOutlinedInput-multiline': { padding: '10px' } }}
                                        id="outlined-multiline-static"
                                        multiline
                                        required
                                        rows={4}
                                        placeholder="Enter general thoughts about your experience"
                                        variant="outlined"
                                        onChange={e => setComment(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input id="box3" type="checkbox" class="second-with-font" checked={isInterview === true} onChange={() => setIsInterview(!isInterview)} />
                                    <label for="box3">Was there an application process?</label>
                                </div>
                                {isInterview ? (
                                    <div>
                                        <div>
                                            <p style={{ marginTop: "0.75rem", marginBottom: "-1rem" }}>Application Process</p>
                                            <p style={{ marginTop: "-0.3rem", color: "#c0c0c0", textAlign: "center", marginBottom: "0rem" }}>______________________________________________________</p>
                                        </div>
                                        <div class="reviewButtonRow reviewTop">
                                            <div>
                                                <label style={{ marginTop: "0" }} htmlFor="Difficulty">Difficulty</label>
                                                <Slider
                                                    style={{ marginLeft: "2rem" }}
                                                    defaultValue={1}
                                                    aria-labelledby="discrete-slider"
                                                    valueLabelDisplay="auto"
                                                    step={1}
                                                    marks
                                                    min={1}
                                                    max={5}
                                                    marks={marks}
                                                    onChange={(event, newValue) => {
                                                        setDifficulty(newValue);
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="roleApplied">Role Applied for</label>
                                                <input
                                                    className="halfRowInputs"
                                                    type="text"
                                                    id="roleApplied"
                                                    placeholder="Enter role applied for"
                                                    required
                                                    onChange={e => setRoleApplied(e.target.value)}
                                                ></input>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="interviewComment">Application Process Comment</label>
                                            {/* <input
                                                style={{ width: "45.8rem" }}
                                                multiLine={true}
                                                type="text"
                                                id="interviewComment"
                                                placeholder="Enter supplemental questions, interview questions, etc."
                                                required
                                                onChange={e => setInterviewComment(e.target.value)}
                                            ></input> */}
                                            <TextField
                                                style={{ width: "48rem" }}
                                                sx={{ '& .MuiOutlinedInput-multiline': { padding: '10px' } }}
                                                id="outlined-multiline-static"
                                                multiline
                                                required
                                                rows={4}
                                                placeholder="Enter supplemental questions, interview questions, etc."
                                                variant="outlined"
                                                onChange={e => setInterviewComment(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ) : null}
                                <div className="reviewButtonRow top" style={{ flexDirection: "row" }}>
                                    <div>
                                        <label />
                                        <button className="post" onClick={() => { cancelButtonHandler() }}>Cancel</button>
                                    </div>
                                    <div>
                                        <label />
                                        <button className="post" type="submit">Post</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) :
                        (
                            <div style={{ marginTop: "4rem" }}>
                                <form className="form" onSubmit={submitHandler}>
                                    <div className="form-wrapper">
                                        <div>
                                            <h1 style={{ marginTop: "-1rem", marginBottom: "-1rem" }}>Add Your Club</h1>
                                            <p style={{ margin: "0", fontSize: "1rem" }}>*Club will be reviewed after posting</p>
                                        </div>
                                        <div>
                                            <label htmlFor="clubName">Club name</label>
                                            <input
                                                className="halfRowInputs"
                                                type="text"
                                                id="clubName"
                                                placeholder="Enter club name"
                                                required
                                                onChange={e => setClubName(e.target.value)}
                                            ></input>
                                        </div>
                                        <div>
                                            <p style={{ marginTop: "0.75rem", marginBottom: "-1rem", textAlign: "center" }}>Review</p>
                                            <p style={{ marginTop: "-0.3rem", color: "#c0c0c0", textAlign: "center", marginBottom: "0" }}>________</p>
                                        </div>
                                        <div style={{ width: "22rem" }}>
                                            <label style={{ marginTop: "1rem" }} htmlFor="rating">Overall Rating</label>
                                            <div style={{ marginTop: "-1.5rem" }}>
                                                <Rating
                                                    name="hover-feedback"
                                                    value={rating}
                                                    style={{ fontSize: "3rem", width: "15rem" }}
                                                    precision={1}
                                                    onChange={(event, newValue) => {
                                                        setRating(newValue);
                                                    }}
                                                    onChangeActive={(event, newHover) => {
                                                        setHover(newHover);
                                                    }}
                                                />
                                                <div style={{ marginLeft: "14rem", marginTop: "-3rem" }}>
                                                    {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ width: "22rem" }}>
                                            <label htmlFor="recommend">Would you recommend it?</label>
                                            <div style={{ display: "flex", marginTop: "-1rem", marginBottom: "0.5rem" }}>
                                                <div>
                                                    <input id="box1" type="checkbox" class="with-font" checked={recommend === true} onChange={() => setRecommend(true)} />
                                                    <label for="box1">Yes</label>
                                                </div>
                                                <div style={{ marginLeft: "2rem" }}>
                                                    <input id="box2" type="radio" class="with-font" checked={recommend === false} onChange={() => setRecommend(false)} />
                                                    <label for="box2">No</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: "-1.5rem" }}>
                                            <label htmlFor="timeCommitment">Hours Per Week</label>
                                            <input
                                                className="halfRowInputs"
                                                type="number"
                                                min="0"
                                                id="timeCommitment"
                                                placeholder="Enter number of hours"
                                                required
                                                onChange={e => setTimeCommitment(Math.trunc(e.target.value))}
                                            ></input>
                                        </div>
                                        <div>
                                            <label htmlFor="position">Position</label>
                                            <input
                                                className="halfRowInputs"
                                                type="text"
                                                id="position"
                                                placeholder="Enter position"
                                                required
                                                onChange={e => setPosition(e.target.value)}
                                            ></input>
                                        </div>
                                        <div >
                                            <div>
                                                <label htmlFor="class">Class</label>
                                                <Select
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    isSearchable={true}
                                                    name="class-option"
                                                    placeholder="Select class"
                                                    options={classOptions}
                                                    onChange={(v) => setClassField(v.value)}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="major">Major</label>
                                                <input
                                                    className="halfRowInputs"
                                                    type="text"
                                                    id="major"
                                                    placeholder="Enter major"
                                                    required
                                                    onChange={e => setMajor(e.target.value)}
                                                ></input>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="comment">Review Comment</label>
                                            {/* <input
                                                        multiLine={true}
                                                        style={{ width: "19.8rem" }}
                                                        type="text"
                                                        id="comment"
                                                        placeholder="Enter general thoughts"
                                                        required
                                                        onChange={e => setComment(e.target.value)}
                                                    ></input> */}
                                            <TextField
                                                style={{ width: "22rem" }}
                                                sx={{ '& .MuiOutlinedInput-multiline': { padding: '10px' } }}
                                                id="outlined-multiline-static"
                                                multiline
                                                required
                                                rows={4}
                                                placeholder="Enter general thoughts about your experience"
                                                variant="outlined"
                                                onChange={e => setComment(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <input id="box3" type="checkbox" class="second-with-font" checked={isInterview === true} onChange={() => setIsInterview(!isInterview)} />
                                            <label for="box3">Application process?</label>
                                        </div>
                                        {isInterview ? (
                                            <div>
                                                <div>
                                                    <p style={{ marginTop: "0.75rem", marginBottom: "-1rem", textAlign: "center" }}>Application Process</p>
                                                    <p style={{ marginTop: "-0.3rem", color: "#c0c0c0", textAlign: "center", marginBottom: "0rem" }}>__________________</p>
                                                </div>
                                                <div>
                                                    <label style={{ marginTop: "1rem" }} htmlFor="Difficulty">Difficulty</label>
                                                    <Slider
                                                        style={{ marginLeft: "2rem" }}
                                                        defaultValue={1}
                                                        aria-labelledby="discrete-slider"
                                                        valueLabelDisplay="auto"
                                                        step={1}
                                                        marks
                                                        min={1}
                                                        max={5}
                                                        marks={marks}
                                                        onChange={(event, newValue) => {
                                                            setDifficulty(newValue);
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="roleApplied">Role Applied for</label>
                                                    <input
                                                        className="halfRowInputs"
                                                        type="text"
                                                        id="roleApplied"
                                                        placeholder="Enter role applied for"
                                                        required
                                                        onChange={e => setRoleApplied(e.target.value)}
                                                    ></input>
                                                </div>
                                                <div>
                                                    <label htmlFor="interviewComment">Application Process Comment</label>
                                                    {/* <input
                                                style={{ width: "45.8rem" }}
                                                multiLine={true}
                                                type="text"
                                                id="interviewComment"
                                                placeholder="Enter supplemental questions, interview questions, etc."
                                                required
                                                onChange={e => setInterviewComment(e.target.value)}
                                            ></input> */}
                                                    <TextField
                                                        style={{ width: "22rem" }}
                                                        sx={{ '& .MuiOutlinedInput-multiline': { padding: '10px' } }}
                                                        id="outlined-multiline-static"
                                                        multiline
                                                        rows={4}
                                                        required
                                                        placeholder="Enter supplemental questions, interview questions, etc."
                                                        variant="outlined"
                                                        onChange={e => setInterviewComment(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ) : null}
                                        <div>
                                            <label />
                                            <button className="post" type="submit">Post</button>
                                        </div>
                                        <div>
                                            <label />
                                            <button className="post" onClick={() => { cancelButtonHandler() }}>Cancel</button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        )
                    }

                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}
