import React, { useEffect, useState } from 'react'
import Rating from './Rating';
import { Link } from 'react-router-dom';

export default function Club(props) {
    const { schoolId, club } = props;

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
        <div>
            {windowWidth > 930 ? (
                <div key={club._id} className="card card-hover-border">
                    <Link to={`/club/${schoolId}/${club._id}`}>
                        <div className="row card-body" style={{ justifyContent: "normal" }}>
                            <h2 style={{ marginRight: "2rem" }}>{club.name}</h2>
                            <Rating rating={club.totalRating / club.numReviews} numReviews={0}></Rating>
                            <p style={{ marginLeft: "2rem" }}>{club.numReviews} {club.numReviews === 1 ? "Review" : "Reviews"}</p>
                        </div>
                    </Link>
                </div>
            ) : (
                <div key={club._id} className="card card-hover-border">
                    <Link to={`/club/${schoolId}/${club._id}`}>
                        <h2 style={{ textAlign: "center", marginBottom: "-1rem", color: "black" }}>{club.name}</h2>
                        <div className="row card-body" style={{ justifyContent: "center" }}>
                            <Rating rating={club.totalRating / club.numReviews} numReviews={0}></Rating>
                            <p style={{ marginLeft: "2rem" }}>{club.numReviews} {club.numReviews === 1 ? "Review" : "Reviews"}</p>
                        </div>
                    </Link>
                </div>
            )}

        </div>
    )
}

