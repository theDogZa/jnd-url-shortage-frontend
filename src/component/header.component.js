import * as React from 'react'

function header() {

    const username = sessionStorage.getItem("username")

    return (
      <h6 className='header mb-4 text-right'>username : {username}</h6>
    );
}

export default header