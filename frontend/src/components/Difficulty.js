import React from 'react'

export default function Difficulty(props) {
    const { difficulty, clubScreen } = props;

    return (
        <div className="difficulty">
            {difficulty === 0 ? (
                <span style={{ color: "#000000" }} ><i className={difficulty === 0 ? "fa fa-square" : null}><p className="font-family-override">{difficulty === 0 ? "No" : null}{clubScreen ? " application process noted" : null}</p></i></span>
            ) : null}
            {difficulty >= 1 && difficulty < 2 ? (
                <span style={{ color: "#00FF00" }} ><i className={difficulty >= 1 && difficulty < 2 ? "fa fa-square" : null}><p className="font-family-override">{difficulty >= 1 && difficulty < 2 ? "Very easy" : null}{clubScreen ? " application process" : null}</p></i></span>
            ) : null}
            {difficulty >= 2 && difficulty < 3 ? (
                <span style={{ color: "#7AFF00" }} ><i className={difficulty >= 2 && difficulty < 3 ? "fa fa-square" : null}><p className="font-family-override">{difficulty >= 2 && difficulty < 3 ? "Easy" : null}{clubScreen ? " application process" : null}</p></i></span>
            ) : null}
            {difficulty >= 3 && difficulty < 4 ? (
                <span style={{ color: "#FFFF00" }}><i className={difficulty >= 3 && difficulty < 4 ? "fa fa-square" : null}><p className="font-family-override">{difficulty >= 3 && difficulty < 4 ? "Average" : null}{clubScreen ? " application process" : null}</p></i></span>
            ) : null}
            {difficulty >= 4 && difficulty < 5 ? (
                <span style={{ color: "#FF7B00" }}><i className={difficulty >= 4 && difficulty < 5 ? "fa fa-square" : null}><p className="font-family-override">{difficulty >= 4 && difficulty < 5 ? "Hard" : null}{clubScreen ? " application process" : null}</p></i></span>
            ) : null}
            {difficulty >= 5 ? (
                <span style={{ color: "#FF0000" }}><i className={difficulty >= 5 ? "fa fa-square" : null}><p>{difficulty >= 5 ? "Very hard" : null}{clubScreen ? " application process" : null}</p></i></span>
            ) : null}
        </div>
    )
}
