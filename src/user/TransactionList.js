import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth';
import {Link} from 'react-router-dom'
import { getTransactions, getUser } from './apiUser';
import Signout from './Signout';

const TransactionList = () => {
    const {user:{user_id, username, role},token} = isAuthenticated();
    const [transactions, setTransactions] = useState([]);

    useEffect(() =>{
        getTransactions(user_id,token)
        .then(data => setTransactions(data))
    },[])



    return (
        <div className="container">
            <div className="row mb-3 mt-3">
            <div className="col-6">
                <h3>{username}</h3>
                <h3>Role: {role==0 ? 'User':'Banker'}</h3>
            </div>
            <div className="col-6 text-right mt-auto">
                <Signout/>
                <Link to="/transaction"><h5>click here to make transaction</h5></Link>
            </div>
            </div>
            <table className='table table-sm'>
                <thead>
                    <tr>
                        <th scope="col">Transaction ID</th>
                        <th scope="col">Action</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Current_Amount</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((v,i)=> (
                    <tr key={i}>
                        <th scope="row">{v.transaction_id}</th>
                        <td>{v.action}</td>
                        <td>{v.amount}</td>
                        <td>{v.current_amount}</td>
                        <td>{v.created_at}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TransactionList
