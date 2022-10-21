import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage () {

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>
                PAGE NOT FOUND
            </h1>
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
          </div>
    )
}

export default NotFoundPage;