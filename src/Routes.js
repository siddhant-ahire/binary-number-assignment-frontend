import React from 'react'
import { BrowserRouter,Switch,Route} from 'react-router-dom'
import AdminRoute from './auth/AdminRoute'
import PrivateRoute from './auth/PrivateRoute'
import Signin from './user/Signin'
import Signup from './user/Signup'
import Transaction from './user/Transaction'
import TransactionList from './user/TransactionList'
import TransactionListById from './user/TransactionListById'
import UsersList from './user/UsersList'


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signin" exact component={Signin} />
                 <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/" exact component = {TransactionList} />
                <PrivateRoute path="/transaction" exact component = {Transaction} />
                <AdminRoute path="/users" exact component = {UsersList} />
                <AdminRoute path="/users/:userId" exact component = {TransactionListById} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
