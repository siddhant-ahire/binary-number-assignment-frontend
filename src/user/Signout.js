import React from 'react'
import { signout } from '../auth'
import {withRouter} from 'react-router-dom'

const Signout = ({history}) => {

    const signOutUser = () => {
        signout(() => {
            history.push('/');
        })
    }

    return (
        <div>
            <button onClick={signOutUser} className="btn btn-danger">Logout</button>
        </div>
    )
}

export default withRouter(Signout)
