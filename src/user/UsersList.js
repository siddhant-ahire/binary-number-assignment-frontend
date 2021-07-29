import React, { useEffect, useState } from 'react'
import {withRouter} from 'react-router-dom'
import { isAuthenticated } from '../auth';
import { getUsersList } from './apiUser';
import Signout from './Signout';



const UsersList = ({history}) => {
    const {user:{user_id, username, role},token} = isAuthenticated();
    const [users, setUsers] = useState([]);


    useEffect(() =>{
        getUsersList(user_id,token)
        .then(data => setUsers(data))
    },[])



    const getUserById = (id) => {
        console.log(history)
        history.push(`/users/${id}`)
    }


    return (
        <div className="container">
            <div className="row mb-3 mt-3">
            <div className="col-6">
                <h3>{username}</h3>
                <h3>Role: {role==0 ? 'User':'Banker'}</h3>
            </div>
            <div className="col-6 text-right mt-auto">
                <Signout/>
            </div>
            </div>
            <table className='table table-sm'>
                <thead>
                    <tr>
                        <th scope="col">User ID</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((v,i)=> (
                    <tr className="userrow" key={i} onClick={()=>getUserById(v.user_id)} style={{cursor:'pointer'}}>
                        <th scope="row">{v.user_id}</th>
                        <td>{v.username}</td>
                        <td>{v.current_amount}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default withRouter(UsersList)
