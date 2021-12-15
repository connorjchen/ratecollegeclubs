import { React, useState } from 'react'
import Rating from './Rating';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import { validate, schoolDelete } from './../actions/schoolActions';

export default function AdminSchool(props) {
    const { school } = props;
    const [visible, setVisible] = useState(true);
    const dispatch = useDispatch();

    const validateButtonHandler = () => {
        setVisible(false)
        dispatch(validate(school._id))
    }

    const deleteButtonHandler = () => {
        setVisible(false)
        dispatch(schoolDelete(school._id))
    }

    if (!visible) {
        return null;
    }


    return (
        <div style={{ marginBottom: "1rem" }}>
            <div class="row top">
                <div class='col-2'>
                    <div key={school._id} className="card" style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "60rem" }}>
                        <div className="row card-body" style={{ justifyContent: "normal" }}>
                            <h2 style={{ marginRight: "2rem" }}>{school.name}</h2>
                            <h2 style={{ marginRight: "2rem" }}>{school.city}, {school.state}</h2>
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
        </div>
    )
}