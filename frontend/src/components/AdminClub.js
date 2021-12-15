import { React, useState } from 'react'
import Rating from './Rating';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import { validate, clubDelete } from '../actions/clubActions';

export default function AdminClub(props) {
    const { club, schools } = props;
    const [visible, setVisible] = useState(true);
    const dispatch = useDispatch();

    const validateButtonHandler = () => {
        setVisible(false)
        dispatch(validate(club._id))
    }

    const deleteButtonHandler = () => {
        setVisible(false)
        dispatch(clubDelete(club._id))
    }

    if (!visible) {
        return null;
    }

    let schoolName = '';
    let loadingName = true;
    for (let i = 0; i < schools.length; i++) {
        if (club.schoolId === schools[i]._id) {
            schoolName = schools[i].name;
            loadingName = false;
        }
    }

    return (
        <div style={{ marginBottom: "1rem" }}>
            {(loadingName) ? <LoadingBox></LoadingBox> : (
                <div class="row top">
                    <div class='col-2'>
                        <div key={club._id} className="card" style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "60rem" }}>
                            <div className="row card-body" style={{ justifyContent: "normal" }}>
                                <h2 style={{ marginRight: "2rem" }}>{schoolName}</h2>
                                <h2 style={{ marginRight: "2rem" }}>{club.name}</h2>
                                <Rating rating={club.totalRating / club.numReviews} numReviews={0}></Rating>
                                <p style={{ marginLeft: "2rem" }}>{club.numReviews} {club.numReviews === 1 ? "Review" : "Reviews"}</p>
                            </div>
                        </div>
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
            )}
        </div>
    )
}