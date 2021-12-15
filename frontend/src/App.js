import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import SchoolScreen from './screens/SchoolScreen';
import ClubScreen from './screens/ClubScreen';
import ClubInterviewScreen from './screens/ClubInterviewScreen';
import ReviewPostScreen from './screens/ReviewPostScreen';
import ClubPostScreen from './screens/ClubPostScreen';
import AdminScreen from './screens/AdminScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import SchoolPostScreen from './screens/SchoolPostScreen';
import { listSchools } from './actions/schoolActions';



function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listSchools());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <div>
                <Route path="/" component={HomeScreen} exact></Route>
                <Route path="/admin" component={AdminScreen}></Route>
                <Route path="/school/:id" component={SchoolScreen}></Route>
                <Route path="/new/school" component={SchoolPostScreen}></Route>
                <Route path="/new/club/:schoolId" component={ClubPostScreen}></Route>
                <Route path="/club/:schoolId/:clubId" component={ClubScreen}></Route>
                <Route path="/interview/:schoolId/:clubId" component={ClubInterviewScreen}></Route>
                <Route path="/review/post/:schoolId/:clubId" component={ReviewPostScreen}></Route>
            </div>
        </BrowserRouter>
    );
}

export default App;
