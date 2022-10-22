
import * as React from 'react'
import { useNavigate } from "react-router-dom";
import { getIPv4 } from "../service/ip.service"
import { getShorten } from "../service/shorten.service"
import NavUser from './navuser.component.js';
import Header from './header.component.js';

function Home() {

    const [state, setState] = React.useState({
        url: null,
        url_shorten: null,
        ip: null,
        token: null
    });
    const [err, setErr] = React.useState({ url: null });
    
    const navigate = useNavigate();

    const regExp = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    const urlOrigin = window.location.origin

    function setError(data) {

        let isValid = true;

        for (let [name, value] of data.entries()) {
            let isError;
            isError = inputValid(name, value)
            if (isError) {
                setErr(previousInputs => ({ ...previousInputs, [name]: isError}))
                isValid = false
            } else { 
                setErr(previousInputs => ({ ...previousInputs, [name]: null}))
            }
        }

        return isValid;
    }

    const onSubmit = async (e) => {

        e.preventDefault();
        
        const data = new FormData(e.target);
        let isValid = await setError(data)

        if (isValid) {     
            const response = await getShorten(state);
            if (response.status.code === 200) {
                console.log(response.status.message)
                let shorten = urlOrigin + "/" + response.data
                setState(previousInputs => ({ ...previousInputs, url_shorten: shorten }))
            }
        }
    }

    const formValChange = e => {
        e.preventDefault();
        let isError;
        const { name, value } = e.target;
        isError = inputValid(name, value)
        if (isError) {
            setErr(previousInputs => ({ ...previousInputs, [name]: isError}))
        } else {
            setErr(previousInputs => ({ ...previousInputs, [name]: null}))
        }

        setState(previousInputs => ({ ...previousInputs, [name]: value}))
        
    };

    const inputValid = (name, value) => {
        let messageError;
        switch (name) {
            case "url":

                if (!regExp.test(value)) {
                    messageError = "url is invalid"
                }
                if (value.length < 5 && messageError === undefined ) {
                    messageError = "url is required"
                }

                break;
            default:
                break;
            }
        return messageError;
    };

    const btnLogout = async (e) => {

        e.preventDefault();
        // CLEAR DATA FROM STORAGE
        // await logout(this.state)
        sessionStorage.clear();
        sessionStorage.removeItem('token');
        sessionStorage.clear();

        navigate("/login");
    }

    React.useEffect(() => { 
        const fetchData = async (e) => { 
            const ip = await getIPv4()
            setState(previousInputs => ({ ...previousInputs, ip: ip }))
            setState(previousInputs => ({ ...previousInputs, token: sessionStorage.getItem("token") }))
        }

        fetchData().catch(console.error);
    },[])

    return (
        
        <div>
            <NavUser />
            <Header />
                <div className="row col-12 d-flex justify-content-center mb-4">
                    <h3>Url Shorten</h3>
                </div>
                <div className="form">
                <form onSubmit={onSubmit} noValidate>
                    <div className="form-group">
                        <label>Enter URL to be Shorten</label>
                        <input
                            type="text"
                            className={err.url ? "is-invalid form-control" : "form-control"}
                            name="url"
                            onChange={formValChange}
                            autoComplete="off"
                            placeholder="Shorten your link"
                        />
                        {err.url && (
                            <span className="invalid-feedback">{err.url}</span>
                        )}
                    </div>
                    <button type="submit" className="btn btn-block btn-success">Shorten</button>
                </form>
                </div>
                {state.url_shorten && (
                    <div className="alert alert-success mt-4 pt-4 pb-4" role="alert">
                        <a target='_blank' rel='noopener noreferrer' href={state.url_shorten}>{state.url_shorten}</a>
                    </div>
                )}

                <div className="d-flex justify-content-center mt-4">
                    <a href="#" onClick={btnLogout}> Logout </a>
                </div>
            </div>   
    )
}

export default Home;
