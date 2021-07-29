import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
// import Layout from '../core/Layout';
// import { createNewProduct, getCategories } from './apiAdmin';
import { createTransaction } from './apiUser';

const Transaction = () => {

    const [values, setValues] = useState({
        amount: '',
        action: '',
        loading: false,
        error: '',
        TransactionValue:false,
    })

    const { 
        amount,
        action,
        loading,
        error,
        TransactionValue,
         } = values

    

    //destructure user and token from localstorage

    const { user, token } = isAuthenticated();
    
    const handleChange = name => event => {
        const value = event.target.value;
        setValues({...values, [name]:value, TransactionValue:false})
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error:'', loading:true})
        createTransaction(user.user_id, token, {amount:amount,action:action})
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error})
            } else {
                setValues({
                    ...values, amount:"",error:'', loading:false,TransactionValue:data.amount,action:''
                })
            }
            
        })
    }

    const Form = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Amount</label>
                <input onChange={handleChange("amount")} type="number" className="form-control" value={amount}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Action</label>
                <select onChange={handleChange("action")} className="form-control" value={action}>
                    <option >Please select</option>
                    <option value="deposite">Deposite</option>
                    <option value="withdraw">Withdraw</option>
                </select>
            </div>
            <button className="btn btn-outline-primary">Make Transaction</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display:error ? '' :'none'}}>
            {error}
        </div>
    )
    const showSuccess = () => (
        <div className="alert alert-info" style={{display:TransactionValue ? '' :'none'}}>
            <h2>Transaction successful</h2>
        </div>
    )

    const showLoading = () => (
        loading && (<div className="alert alert-success">
            <h2>loading...</h2>
        </div>)
    )
    const goBack = () => (
        <div className="mt-5">
            <Link to="/" className="text-warning">
                Back to Home
            </Link>
        </div>
    )


    return (
            <div className="row mt-5">
                <div className="col-md-6 offset-md-3">
                    {showError()}
                    {showLoading()}
                    {showSuccess()}
                    {Form()}
                    {goBack()}
                </div>
            </div>
    )
}

export default Transaction
