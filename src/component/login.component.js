import * as React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { login } from "../service/auth.service"

function Login() {

    const [state, setState] = React.useState({
        username: null,
        password: null,
    });
    const [err, setErr] = React.useState({
        username: null,
        password: null,
        login: null
    });

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
            const response = await login(state);
            if (response.status.code === 200) {
                sessionStorage.setItem("username", response.data.username);
                sessionStorage.setItem("token", response.data.token);

                navigate('/home')
            } else { 
                setErr(previousInputs => ({ ...previousInputs, login: response.status.message}))
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
        setErr(previousInputs => ({ ...previousInputs, login: null}))
        
    };

    const inputValid = (name, value) => {
        let messageError;
        switch (name) {
        case "username":
            messageError = value.length < 4 ? "Atleast 4 characaters required" : "";
            break;
        case "password":
            messageError = value.length < 6 ? "Atleast 6 characaters required" : "";
            break;
        default:
            break;
        }
        return messageError;
    };

    return (
        <div>
            <div className="row col-12 d-flex justify-content-center mb-4">
                <h3>Login</h3>
            </div>

                {err.login && (  
                <div className="alert alert-danger" role="alert">
                    <div className="px-2">
                        {err.login}
                    </div>
                </div>
                )}
                        
                <div className="form">
                <form onSubmit={onSubmit} noValidate>
                    <div className="form-group">
                        <label>Username or email address</label>
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

                    <button type="submit" className="btn btn-block btn-success">Login</button>
                </form>
                </div>

                <div className="d-flex justify-content-center mt-4">
                        <Link key="register" to="/register">Register</Link>
                </div>
        </div>
    )
}

export default Login;