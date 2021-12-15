import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating'
import { detailsSchool } from '../actions/schoolActions';
import { listClubs } from './../actions/clubActions';
import Club from '../components/Club'
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Footer from './../components/Footer';
import Header from './../components/Header';

export default function SchoolScreen(props) {
    const [searchField, setSearchField] = useState('');
    const [filterOption, setfilterOption] = useState('review');

    const dispatch = useDispatch()
    const schoolId = props.match.params.id;
    const schoolDetails = useSelector(state => state.schoolDetails);
    const { loading, error, school } = schoolDetails

    useEffect(() => {
        dispatch(detailsSchool(schoolId));
    }, [dispatch, schoolId]);


    const clubList = useSelector(state => state.clubList);
    const { loadingClubs, errorClubs, clubs, clubsMostReviews, clubsHighestRating } = clubList;

    useEffect(() => {
        dispatch(listClubs(schoolId));
    }, [dispatch, schoolId]);


    //pagination system
    const [currentPage, setCurrentPage] = useState(1);
    const [clubsPerPage] = useState(10);
    const indexOfLastPost = currentPage * clubsPerPage;
    const indexOfFirstPost = indexOfLastPost - clubsPerPage;
    const paginate = pageNumber => setCurrentPage(pageNumber);

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
                    {(loading || loadingClubs) ? <LoadingBox></LoadingBox> :
                        (error || errorClubs) ? <MessageBox variant="danger">{error}</MessageBox> :
                            windowWidth > 930 ?
                                (
                                    <div>
                                        <div class="row top" style={{ flexWrap: "nowrap" }}>
                                            <div class="col-1" style={{ marginTop: "1rem" }}>
                                                <div>
                                                    <img className="small" src={school.image} alt={school.name}></img>
                                                </div>
                                                <div>
                                                    <div className="school-info">
                                                        <h2 className="school-name">{school.name}</h2>
                                                        <p className="location">{school.city + ", "}{school.state}</p>
                                                    </div>
                                                    <p className="spacer"> _________________________</p>
                                                    <SearchBar placeholder="Search clubs" handleChange={(e) => setSearchField(e.target.value)}></SearchBar>
                                                    <div style={{ display: "flex", marginBottom: "-2rem" }}>
                                                        <p style={{ color: "black", marginRight: "0.5rem" }}>Don't see your club?</p>
                                                        <Link to={`/new/club/${schoolId}`}>
                                                            <p className="noClub">Add it!</p>
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <p style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "-1rem" }}>Filter Options</p>
                                                        <div className="filter-row">
                                                            <input
                                                                type='radio'
                                                                value="review"
                                                                checked={filterOption === "review"}
                                                                onChange={(e) => setfilterOption(e.target.value)}
                                                            />
                                                            <p className="location" style={{ paddingTop: "0.3rem" }}>Most Reviews</p>
                                                        </div>
                                                        <div className="filter-row">
                                                            <input
                                                                type='radio'
                                                                value="reverseReview"
                                                                checked={filterOption === "reverseReview"}
                                                                onChange={(e) => setfilterOption(e.target.value)}
                                                            />
                                                            <p className="location" style={{ paddingTop: "0.3rem" }}>Least Reviews</p>
                                                        </div>
                                                        <div className="filter-row">
                                                            <input
                                                                type='radio'
                                                                value="rating"
                                                                checked={filterOption === "rating"}
                                                                onChange={(e) => setfilterOption(e.target.value)}
                                                            />
                                                            <p className="location" style={{ paddingTop: "0.3rem" }}>Highest Rating</p>
                                                        </div>
                                                        <div className="filter-row">
                                                            <input
                                                                type='radio'
                                                                value="reverseRating"
                                                                checked={filterOption === "reverseRating"}
                                                                onChange={(e) => setfilterOption(e.target.value)}
                                                            />
                                                            <p className="location" style={{ paddingTop: "0.3rem" }}>Lowest Rating</p>
                                                        </div>
                                                        <div className="filter-row">
                                                            <input
                                                                type='radio'
                                                                value="name"
                                                                checked={filterOption === "name"}
                                                                onChange={(e) => setfilterOption(e.target.value)}
                                                            />
                                                            <p className="location" style={{ paddingTop: "0.3rem" }}>Alphabetical</p>
                                                        </div>
                                                        <div className="filter-row">
                                                            <input
                                                                type='radio'
                                                                value="reverseName"
                                                                checked={filterOption === "reverseName"}
                                                                onChange={(e) => setfilterOption(e.target.value)}
                                                            />
                                                            <p className="location" style={{ paddingTop: "0.3rem" }}>Reverse Alphabetical</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-2" style={{ marginTop: "1rem" }}>
                                                {clubsMostReviews.filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).length !== 0 ? (
                                                    <p className="smallish-text" style={{ margin: "0 0 0.5rem 1rem" }}>{indexOfFirstPost + 1}-{indexOfLastPost} of {clubsMostReviews.filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).length} clubs</p>
                                                ) : null}

                                                {filterOption === "name" ? (clubs.filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).slice(indexOfFirstPost, indexOfLastPost).map(club => (<Club key={club._id} schoolId={schoolId} club={club} ></Club>))) :
                                                    filterOption === "reverseName" ? (clubs.slice().reverse().filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).slice(indexOfFirstPost, indexOfLastPost).map(club => (<Club key={club._id} schoolId={schoolId} club={club} ></Club>))) :
                                                        filterOption === "reverseReview" ? (clubsMostReviews.slice().reverse().filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).slice(indexOfFirstPost, indexOfLastPost).map(club => (<Club key={club._id} schoolId={schoolId} club={club} ></Club>))) :
                                                            filterOption === "reverseRating" ? (clubsHighestRating.slice().reverse().filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).slice(indexOfFirstPost, indexOfLastPost).map(club => (<Club key={club._id} schoolId={schoolId} club={club} ></Club>))) :
                                                                filterOption === "review" ? (clubsMostReviews.filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).slice(indexOfFirstPost, indexOfLastPost).map(club => (<Club key={club._id} schoolId={schoolId} club={club}></Club>))) :
                                                                    filterOption === "rating" ? (clubsHighestRating.filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).slice(indexOfFirstPost, indexOfLastPost).map(club => (<Club key={club._id} schoolId={schoolId} club={club} ></Club>))) : null}
                                                <Pagination
                                                    clubsPerPage={clubsPerPage}
                                                    totalClubs={clubsMostReviews.filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).length}
                                                    currentPage={currentPage}
                                                    paginate={paginate}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) :
                                (
                                    <div style={{ marginTop: "4rem" }}>
                                        <div class="row top">
                                            <div class="col-1" style={{ marginRight: "auto", marginLeft: "auto", marginBottom: "1rem" }}>
                                                <div>
                                                    <img className="small" src={school.image} alt={school.name}></img>
                                                </div>
                                                <div>
                                                    <div className="school-info">
                                                        <h2 className="school-name">{school.name}</h2>
                                                        <p className="location">{school.city + ", "}{school.state}</p>
                                                    </div>
                                                    <p className="spacer"> _________________________</p>
                                                    <SearchBar placeholder="Search clubs" handleChange={(e) => setSearchField(e.target.value)}></SearchBar>
                                                    <div style={{ display: "flex", marginBottom: "-2rem" }}>
                                                        <p style={{ color: "black", marginRight: "0.5rem" }}>Don't see your club?</p>
                                                        <Link to={`/new/club/${schoolId}`}>
                                                            <p className="noClub">Add it!</p>
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <p style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "-1rem" }}>Filter Options</p>
                                                        <div className="filter-row">
                                                            <input
                                                                type='radio'
                                                                value="review"
                                                                checked={filterOption === "review"}
                                                                onChange={(e) => setfilterOption(e.target.value)}
                                                            />
                                                            <p className="location" style={{ paddingTop: "0.3rem" }}>Most Reviews</p>
                                                        </div>
                                                        <div className="filter-row">
                                                            <input
                                                                type='radio'
                                                                value="reverseReview"
                                                                checked={filterOption === "reverseReview"}
                                                                onChange={(e) => setfilterOption(e.target.value)}
                                                            />
                                                            <p className="location" style={{ paddingTop: "0.3rem" }}>Least Reviews</p>
                                                        </div>
                                                        <div className="filter-row">
                                                            <input
                                                                type='radio'
                                                                value="rating"
                                                                checked={filterOption === "rating"}
                                                                onChange={(e) => setfilterOption(e.target.value)}
                                                            />
                                                            <p className="location" style={{ paddingTop: "0.3rem" }}>Highest Rating</p>
                                                        </div>
                                                        <div className="filter-row">
                                                            <input
                                                                type='radio'
                                                                value="reverseRating"
                                                                checked={filterOption === "reverseRating"}
                                                                onChange={(e) => setfilterOption(e.target.value)}
                                                            />
                                                            <p className="location" style={{ paddingTop: "0.3rem" }}>Lowest Rating</p>
                                                        </div>
                                                        <div className="filter-row">
                                                            <input
                                                                type='radio'
                                                                value="name"
                                                                checked={filterOption === "name"}
                                                                onChange={(e) => setfilterOption(e.target.value)}
                                                            />
                                                            <p className="location" style={{ paddingTop: "0.3rem" }}>Alphabetical</p>
                                                        </div>
                                                        <div className="filter-row">
                                                            <input
                                                                type='radio'
                                                                value="reverseName"
                                                                checked={filterOption === "reverseName"}
                                                                onChange={(e) => setfilterOption(e.target.value)}
                                                            />
                                                            <p className="location" style={{ paddingTop: "0.3rem" }}>Reverse Alphabetical</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-2" style={{ marginTop: "1rem" }}>
                                                {clubsMostReviews.filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).length !== 0 ? (
                                                    <p className="smallish-text" style={{ margin: "0 0 0.5rem 1rem" }}>{indexOfFirstPost + 1}-{indexOfLastPost} of {clubsMostReviews.filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).length} clubs</p>
                                                ) : null}

                                                {filterOption === "name" ? (clubs.filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).slice(indexOfFirstPost, indexOfLastPost).map(club => (<Club key={club._id} schoolId={schoolId} club={club}></Club>))) :
                                                    filterOption === "reverseName" ? (clubs.slice().reverse().filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).slice(indexOfFirstPost, indexOfLastPost).map(club => (<Club key={club._id} schoolId={schoolId} club={club} ></Club>))) :
                                                        filterOption === "reverseReview" ? (clubsMostReviews.slice().reverse().filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).slice(indexOfFirstPost, indexOfLastPost).map(club => (<Club key={club._id} schoolId={schoolId} club={club} ></Club>))) :
                                                            filterOption === "reverseRating" ? (clubsHighestRating.slice().reverse().filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).slice(indexOfFirstPost, indexOfLastPost).map(club => (<Club key={club._id} schoolId={schoolId} club={club} ></Club>))) :
                                                                filterOption === "review" ? (clubsMostReviews.filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).slice(indexOfFirstPost, indexOfLastPost).map(club => (<Club key={club._id} schoolId={schoolId} club={club}></Club>))) :
                                                                    filterOption === "rating" ? (clubsHighestRating.filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).slice(indexOfFirstPost, indexOfLastPost).map(club => (<Club key={club._id} schoolId={schoolId} club={club} ></Club>))) : null}
                                                <Pagination
                                                    clubsPerPage={clubsPerPage}
                                                    totalClubs={clubsMostReviews.filter(function (aClub) { return aClub.name.toLowerCase().includes(searchField.toLowerCase()); }).length}
                                                    currentPage={currentPage}
                                                    paginate={paginate}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                    }
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}