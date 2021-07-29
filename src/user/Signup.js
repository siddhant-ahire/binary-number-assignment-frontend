import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { signup } from '../auth'

const Signup = () => {

    const [values, setValues] = useState({
        username: '',
        password: '',
        error: '',
        success: ''
    });

    const {  username, password, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    };



    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false })
        console.log(username, password)
        const role = 0
        signup({ username, password ,role})
        .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        username: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
    }


    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to='/signin'>Signin</Link>
        </div>
    )

    const signUpForm = () => (
        <div className="row justify-content-md-center mt-5">
        <form className="col-12 col-md-6 ">
            <div className="form-group">
                <label className="text-muted">username</label>
                <input onChange={handleChange('username')} type="username" className="form-control" value={username} />
            </div>
            <div className="form-group">
                <label className="text-muted">password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} type='submit' className="btn btn-success">Submit</button>
            <div className="mt-2">
                <Link to="/signin">Go to Login</Link>
            </div>
        </form>
        </div>
    )

    return (
        <div className="container">
                {showError()}
                {showSuccess()}
                {signUpForm()}
        </div>
    )
}

export default Signup
