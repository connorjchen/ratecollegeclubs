import React, { useEffect, useState } from 'react'
import Rating from './Rating';
import { Link } from 'react-router-dom';

export default function School(props) {
    // const { school, searchField } = props;
    // return (
    //     <div>
    //         {school.name.toLowerCase().includes(searchField.toLowerCase()) ? (
    //             <div key={school._id} className="card card-hover-border">
    //                 <Link to={`/school/${school._id}`}>
    //                     <img className="medium" src={school.image} alt={school.name} />

    //                     <div className="card-body">
    //                         <h2>{school.name}</h2>
    //                         <p>{school.numClubs} Clubs</p>
    //                     </div>
    //                 </Link>
    //             </div>
    //         ) : null
    //         }
    //     </div>
    // )

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
    const { school } = props;
    return (
        <div>
            {windowWidth > 720 ? (
                <div key={school._id} className="school-card">
                    <Link to={`/school/${school._id}`}>
                        <img className="medium" src={school.image} alt={school.name} />
                    </Link>
                    <div className="card-body" style={{ width: "27rem" }}>
                        <h2>{school.name}</h2>
                        <p>{school.numReviews === 1 ? school.numReviews + " Review" : school.numReviews + " Reviews"}</p>
                    </div>
                </div>
            ) : (
                <div key={school._id} className="school-card">
                    <Link to={`/school/${school._id}`}>
                        <img className="smallish" src={school.image} alt={school.name} />
                    </Link>
                    <div className="card-body" style={{ width: "17rem" }}>
                        <h2>{school.name}</h2>
                        <p>{school.numReviews === 1 ? school.numReviews + " Review" : school.numReviews + " Reviews"}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

