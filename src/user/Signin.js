import React, { useState } from 'react'
import { Redirect ,Link} from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../auth'

const Signin = () => {

    const [values, setValues] = useState({
        username: 'user1@bn.com',
        password: 'User@123',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { username, password, error, loading, redirectToReferrer } = values;
    const {user} = isAuthenticated();
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    };



    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading:true })
        signin({ username, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(
                        data,
                        () => {
                            setValues({
                                ...values,
                                redirectToReferrer:true
                            })
                        })
                }
            })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )
    )

    const redirectUser = () => {
        if(redirectToReferrer) {
            if(user.role === 1){
                return <Redirect to="/users" />
            } else {
                return <Redirect to="/" />
            }
        }
        if(isAuthenticated()) {
            if(user.role === 1){
                return <Redirect to="/users" />
            } else {
                return <Redirect to="/" />
            }
        }
    }

    const signInForm = () => (
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
                <Link to="/signup">create new account</Link>
            </div>
        </form>
        </div>
    )

    return (
        <div className="container">
                {showError()}
                {showLoading()}
                {signInForm()}
                {redirectUser()}
        </div>
    )
}

export default Signin
