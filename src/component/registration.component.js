import * as React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { register } from "../service/auth.service"
import { getIPv4 } from "../service/ip.service"
import Header from './header.component.js';

const regExp = RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
)

function Registration() {

    const [state, setState] = React.useState({
        username: null,
        password: null,
        email: null,
        confirm_password: null,
        ip: null,
    });
    const [err, setErr] = React.useState({
        username: null,
        password: null,
        email: null,
        confirm_password: null,
        register: null
    });
    const [suss, setSuss] = React.useState({ register: null})

    const navigate = useNavigate();

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
            const response = await register(state);
            if (response.status.code === 200) {

                let message = response.status.message + ' : The system will take you to the login page within 5 seconds.'
                setSuss(previousInputs => ({ ...previousInputs, register: message }))
                setErr(previousInputs => ({ ...previousInputs, register: null }))

                setState();
                setTimeout(() => {
                    navigate('/login')
                }, 5000);
                
            } else { 
                setSuss(previousInputs => ({ ...previousInputs, register: null }))
                setErr(previousInputs => ({ ...previousInputs, register: response.status.message}))
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

        setState(previousInputs => ({ ...previousInputs, [name]: value }))
        setErr(previousInputs => ({ ...previousInputs, register: null}))
        
    };

    const inputValid = (name, value) => {
        let messageError;
        switch (name) {
        case "username":
            messageError = value.length < 4 ? "Atleast 4 characaters required" : "";
            break;
        case "email":
            messageError = regExp.test(value) ? "" : "Email address is invalid";
            break;
        case "password":
            messageError = value.length < 6 ? "Atleast 6 characaters required" : "";
            break;
        case "confirm_password": 
            messageError = value.length < 6 ? "Atleast 6 characaters required" : value !== state.password ? "Confirm Password not match" : "";
            break;
        default:
            break;
        }
        return messageError;
    };

    React.useEffect(() => { 
        const fetchData = async (e) => { 
            const ip = await getIPv4()
            setState(previousInputs => ({ ...previousInputs, ip: ip }))
        }

        fetchData().catch(console.error);
    },[])

        return (
            <div>
                <Header />
                <div className="row col-12 d-flex justify-content-center mb-4">
                    <h3>Register</h3>
                </div>

                {err.register && (  
                <div className="alert alert-danger" role="alert">
                    <div className="px-2">
                        {err.register}
                    </div>
                </div>
                )}

                {suss.register && (  
                <div className="alert alert-success" role="alert">
                    <div className="px-2">
                        {suss.register}
                    </div>
                </div>
                )}

                <div className="form">
                <form onSubmit={onSubmit} noValidate>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className={err.username ? "is-invalid form-control" : "form-control"}
                            name="username"
                            onChange={formValChange}
                        />
                        {err.username && (
                            <span className="invalid-feedback">{err.username}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className={err.email ? "is-invalid form-control" : "form-control"}
                            name="email"
                            onChange={formValChange}
                        />
                        {err.email && (
                            <span className="invalid-feedback">{err.email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className={err.password ? "is-invalid form-control" : "form-control"}
                            name="password"
                            onChange={formValChange}
                            autoComplete="on"
                        />
                        {err.password && (
                            <span className="invalid-feedback">{err.password}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className={err.confirm_password ? "is-invalid form-control" : "form-control"}
                            name="confirm_password"
                            onChange={formValChange}
                            autoComplete="on"
                        />
                        {err.confirm_password && (
                            <span className="invalid-feedback">{err.confirm_password}</span>
                        )}
                    </div>

                    <button type="submit" className="btn btn-block btn-success">Register</button>
                </form>
                </div>

                <div className="d-flex justify-content-center mt-4">
                        <Link  key="login" to="/login">Login</Link>
                </div>
            </div>
        )
}

export default Registration;