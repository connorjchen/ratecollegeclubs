import React, { useRef, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function HeaderAutoCompleteText(props) {
    const { schools } = props;
    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState('');
    const [visible, setVisible] = useState(false)

    const onTextChanged = (e) => {
        const value = e.target.value;
        setText(value)
        setSuggestions([]);
        if (value.length > 0) {
            setSuggestions(schools.sort().filter(function (aClub) { return aClub.name.toLowerCase().includes(value.toLowerCase()); }))
        }
    }

    const renderSuggestions = () => {
        if (text.length === 0 || !visible) {
            return null
        }
        return (
            <ul className="dropdown-content">
                {suggestions.map(suggestion => (
                    < li style={{ paddingLeft: "1rem", fontSize: "1.3rem" }} onClick={() => suggestionSelected(suggestion)}>
                        {suggestion.name}
                    </li>
                ))
                }
                <li style={{ textDecoration: "none" }} onClick={() => addSchoolClicked()}>
                    <div style={{ display: "flex", backgroundColor: "#c0c0c0", borderBottomLeftRadius: "0.5rem", borderBottomRightRadius: "0.5rem" }}>
                        <p style={{ paddingLeft: "1rem", color: "black", marginRight: "0.5rem", marginTop: 0, marginBottom: 0, fontSize: "1.3rem" }}>Don't see your school?</p>
                        <p className="noClub" style={{ margin: 0, fontSize: "1.3rem" }}>Add it!</p>
                    </div>
                </li>
            </ul>
        )
    }

    let history = useHistory();
    const suggestionSelected = (value) => {
        setText('')
        setSuggestions([])
        let path = `/school/${value._id}`;
        history.push(path);
    }

    const addSchoolClicked = () => {
        let path = '/new/school';
        history.push(path);
    }

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

    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setVisible(false);
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div ref={wrapperRef}>
            {windowWidth > 930 ? (
                <div className="dropdown" style={{ marginRight: "1rem", marginTop: ".7rem" }}>
                    <input
                        value={text}
                        onFocus={() => setVisible(true)}
                        placeholder="Search schools"
                        onChange={(e) => onTextChanged(e)}
                        type="text"
                    />
                    {renderSuggestions()}
                </div>
            ) :
                (
                    <div className="dropdown" style={{ marginTop: ".7rem", right: "0", left: ".7rem", marginLeft: "auto", marginRight: "auto" }}>
                        <input
                            value={text}
                            onFocus={() => setVisible(true)}
                            placeholder="Search schools"
                            onChange={(e) => onTextChanged(e)}
                            type="text"
                        />
                        {renderSuggestions()}
                    </div>
                )
            }

        </div >
    )
}
