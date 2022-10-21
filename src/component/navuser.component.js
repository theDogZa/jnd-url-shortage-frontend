import * as React from 'react'

function navuser() {

    const username = sessionStorage.getItem("username")

    return (
        <div>
        {username && (
            <h6 className='header mb-4 text-right'>username : {username}</h6>
        )}
    </div>
    );
}

export default navuser