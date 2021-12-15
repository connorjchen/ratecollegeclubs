import React, { useEffect, useState } from 'react'
import School from '../components/School'
import LoadingBox from './../components/LoadingBox';
import MessageBox from './../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listSchools } from './../actions/schoolActions';
import SearchBar from '../components/SearchBar';
import AutoCompleteText from './../components/AutoCompleteText';
import Footer from './../components/Footer';
import Header from './../components/Header';

export default function HomeScreen() {
    const dispatch = useDispatch()
    const schoolList = useSelector(state => state.schoolList);
    const { loading, error, schools } = schoolList;

    // useEffect(() => {
    //     dispatch(listSchools());
    // }, [dispatch]);

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
    const date = new Date();
    const hours = date.getHours();
    return (
        <div className="grid-container" style={{ gridTemplateRows: "5rem 1fr 0rem" }}>
            <main>
                <div className={"background" + (hours % 7).toString()}>
                    {loading ? <LoadingBox></LoadingBox> :
                        error ? <MessageBox variant="danger">{error}</MessageBox> :
                            (
                                <div>
                                    <div style={windowWidth > 720 ? { color: "white", fontSize: "3rem", fontWeight: "bold", padding: "1rem" } : { textAlign: "center", color: "white", fontSize: "2.2rem", fontWeight: "bold", padding: "1rem" }}>RateCollegeClubs</div>
                                    <div style={{ opacity: 0, marginBottom: "19rem" }}>invisible spacer</div>
                                    <h1 style={windowWidth > 720 ? { color: "white", textAlign: "center", fontSize: "2rem", padding: "0" } : { color: "white", textAlign: "center", fontSize: "1.4rem", padding: "0" }}>Join a club that's right for you</h1>
                                    <AutoCompleteText schools={schools}></AutoCompleteText>
                                    <div style={{ width: "100%", position: "absolute", top: "65rem", left: "50%", transform: "translate(-50%)" }}>
                                        <h1 style={windowWidth > 720 ? { color: "black", textAlign: "center", fontSize: "2rem", padding: "0" } : { color: "black", textAlign: "center", fontSize: "1.7rem", paddingTop: "1rem", paddingBottom: 0 }}>Most Reviewed</h1>
                                        <div className="row center" style={{ alignItems: "normal" }}>
                                            {schools.slice(0, 8).map(school => (
                                                <School key={school._id} school={school}></School>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            )
                    }
                </div>
            </main>
            {/* <Footer></Footer> */}
        </div>
    )
}
