import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { listSchools } from './../actions/schoolActions';
import LoadingBox from './../components/LoadingBox';
import MessageBox from './../components/MessageBox';
import HeaderAutoCompleteText from './../components/HeaderAutoCompleteText';

export default function Header() {
    const dispatch = useDispatch()
    const schoolList = useSelector(state => state.schoolList);
    const { loading, error, schools } = schoolList;

    // useEffect(() => {
    //     dispatch(listSchools());
    // }, [dispatch]);

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
        < div >
            {loading ? <LoadingBox></LoadingBox> :
                error ? <MessageBox variant="danger">{error}</MessageBox> :
                    windowWidth > 930 ?
                        (
                            <header className="row" style={{ alignItems: "normal" }}>
                                <Link className="brand" to="/">RateCollegeClubs</Link>
                                <HeaderAutoCompleteText schools={schools}></HeaderAutoCompleteText>
                            </header>
                        ) :
                        (
                            <header style={{ height: "9rem" }}>
                                <div style={{ textAlign: "center" }}>
                                    <Link className="brand" to="/">RateCollegeClubs</Link>
                                </div>
                                <div>
                                    <HeaderAutoCompleteText schools={schools}></HeaderAutoCompleteText>
                                </div>
                            </header>
                        )
            }
        </div >
    )
}
