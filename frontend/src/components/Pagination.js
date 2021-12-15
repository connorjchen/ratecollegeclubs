import React, { useRef, useEffect, useState } from 'react'

const Pagination = ({ clubsPerPage, totalClubs, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalClubs / clubsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (currentPage > pageNumbers.length) {
        currentPage = pageNumbers.length
        paginate(currentPage)
    }

    if (currentPage === 0 && pageNumbers.length !== 0) {
        paginate(1)
    }

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
                <div>
                    {pageNumbers.length === 0 ? (
                        <p style={{ marginTop: "0", marginLeft: "1rem" }}>No results found</p>
                    ) : pageNumbers.length === 1 ? (
                        <nav>
                            <ul style={{ display: "flex", marginLeft: "1rem" }}>
                                <li key={1} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(1)} style={{ border: "1px solid #b31b1b" }} >
                                        <div>1</div>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    ) : currentPage !== 1 && currentPage !== pageNumbers.length ? (
                        <nav>
                            <ul style={{ display: "flex", marginLeft: "1rem" }}>
                                <li key={-1} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(currentPage - 1)}  >
                                        <div>Previous</div>
                                    </button>
                                </li>
                                <li key={1} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(1)}  >
                                        <div>1</div>
                                    </button>
                                </li>

                                <li key={-2} style={{ marginRight: "0.5rem", marginTop: "2.2rem", marginBottom: "1rem" }}>...</li>

                                <li key={currentPage} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => console.log("stay on page")} style={{ border: "1px solid #b31b1b" }}>
                                        <div>{currentPage}</div>
                                    </button>
                                </li>

                                <li key={-3} style={{ marginRight: "0.5rem", marginTop: "2.2rem", marginBottom: "1rem" }}>...</li>

                                <li key={pageNumbers.length} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(pageNumbers.length)}  >
                                        <div>{pageNumbers.length}</div>
                                    </button>
                                </li>
                                <li key={-4} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(currentPage + 1)}  >
                                        <div>Next</div>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    ) : currentPage === 1 ? (
                        <nav>
                            <ul style={{ display: "flex", marginLeft: "1rem" }}>
                                <li key={1} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(1)} style={{ border: "1px solid #b31b1b" }} >
                                        <div>1</div>
                                    </button>
                                </li>

                                <li key={-3} style={{ marginRight: "0.5rem", marginTop: "2.2rem", marginBottom: "1rem" }}>...</li>

                                <li key={pageNumbers.length} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(pageNumbers.length)}  >
                                        <div>{pageNumbers.length}</div>
                                    </button>
                                </li>
                                <li key={-4} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(currentPage + 1)}  >
                                        <div>Next</div>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    ) : (
                        <nav>
                            <ul style={{ display: "flex", marginLeft: "1rem" }}>
                                <li key={-1} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(currentPage - 1)}  >
                                        <div>Previous</div>
                                    </button>
                                </li>
                                <li key={1} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(1)}  >
                                        <div>1</div>
                                    </button>
                                </li>

                                <li key={-3} style={{ marginRight: "0.5rem", marginTop: "2.2rem", marginBottom: "1rem" }}>...</li>

                                <li key={pageNumbers.length} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(pageNumbers.length)} style={{ border: "1px solid #b31b1b" }} >
                                        <div>{pageNumbers.length}</div>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}

                </div>
            ) : (
                <div>
                    {pageNumbers.length === 0 ? (
                        <p style={{ marginTop: "0", marginLeft: "1rem", textAlign: "center" }}>No results found</p>
                    ) : pageNumbers.length === 1 ? (
                        <nav>
                            <ul style={{ display: "flex", marginLeft: "1rem" }}>
                                <li key={1} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(1)} style={{ border: "1px solid #b31b1b" }} >
                                        <div>1</div>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    ) : currentPage !== 1 && currentPage !== pageNumbers.length ? (
                        <nav>
                            <ul style={{ display: "flex", marginLeft: "1rem" }}>
                                <li key={-1} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(currentPage - 1)}  >
                                        <div>Previous</div>
                                    </button>
                                </li>
                                <li key={1} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(1)}  >
                                        <div>1</div>
                                    </button>
                                </li>

                                <li key={-2} style={{ marginRight: "0.5rem", marginTop: "2.2rem", marginBottom: "1rem" }}>...</li>

                                <li key={currentPage} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => console.log("stay on page")} style={{ border: "1px solid #b31b1b" }}>
                                        <div>{currentPage}</div>
                                    </button>
                                </li>

                                <li key={-3} style={{ marginRight: "0.5rem", marginTop: "2.2rem", marginBottom: "1rem" }}>...</li>

                                <li key={pageNumbers.length} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(pageNumbers.length)}  >
                                        <div>{pageNumbers.length}</div>
                                    </button>
                                </li>
                                <li key={-4} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(currentPage + 1)}  >
                                        <div>Next</div>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    ) : currentPage === 1 ? (
                        <nav>
                            <ul style={{ display: "flex", marginLeft: "1rem" }}>
                                <li key={1} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(1)} style={{ border: "1px solid #b31b1b" }} >
                                        <div>1</div>
                                    </button>
                                </li>

                                <li key={-3} style={{ marginRight: "0.5rem", marginTop: "2.2rem", marginBottom: "1rem" }}>...</li>

                                <li key={pageNumbers.length} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(pageNumbers.length)}  >
                                        <div>{pageNumbers.length}</div>
                                    </button>
                                </li>
                                <li key={-4} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(currentPage + 1)}  >
                                        <div>Next</div>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    ) : (
                        <nav>
                            <ul style={{ display: "flex", marginLeft: "1rem" }}>
                                <li key={-1} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(currentPage - 1)}  >
                                        <div>Previous</div>
                                    </button>
                                </li>
                                <li key={1} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(1)}  >
                                        <div>1</div>
                                    </button>
                                </li>

                                <li key={-3} style={{ marginRight: "0.5rem", marginTop: "2.2rem", marginBottom: "1rem" }}>...</li>

                                <li key={pageNumbers.length} style={{ marginRight: "0.5rem", marginTop: "0rem", marginBottom: "1rem" }}>
                                    <button onClick={() => paginate(pageNumbers.length)} style={{ border: "1px solid #b31b1b" }} >
                                        <div>{pageNumbers.length}</div>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}

                </div>
            )}

        </div>
    );
};

export default Pagination;