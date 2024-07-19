import React from 'react';
import './PageNotFound.css';

const PageNotFound = () => {
    return (
        <div className="page-not-found">
            <div className="content">
                <h1>ERROR</h1>
                <h2>404</h2>
                <p>Page not found</p>
                <p className="quote">The page you want to enter does not exist</p>
                <a href="/staygo" className="back-button">Back to Home</a>
            </div>
            <footer>
                <p>&copy; All rights reserved | Design by CodeCookers </p>
            </footer>
        </div>
    );
}

export default PageNotFound;
