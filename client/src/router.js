import React from 'react';
import { Switch, Route } from 'react-router-dom';

/**
 * ADMIN
 */
import AdminHome from './components/Admin/Index'
import AllTickets from './components/Admin/AllTickets';
import AllUsers from './components/Admin/AllUsers';
import AdminRegister from './components/Admin/Register';
import AdminLogin from './components/Admin/Login';
import RespondTicket from './components/Admin/RespondTicket';



/**
 * USER
 */
import AddTicket from './components/User/AddTicket';
import Tickets from './components/User/Tickets';
import EditTicket from './components/User/EditTicket';
import UserLogin from './components/User/Login';
import Register from './components/User/Register';


const Router = () => (
    <div>
        <Switch>
            <Route exact path="/admin/register" component={AdminRegister}/>
            <Route exact path="/admin/login" component={AdminLogin}/>
            <Route exact path="/admin" component={AdminHome}/>
            <Route exact path="/admin/allTickets" component={AllTickets}/>
            <Route exact path="/admin/respondTicket/:ticketID" component={RespondTicket}/>
            <Route path="/user/addTicket" component={AddTicket} />
            <Route path="/user/tickets" component={Tickets}/>
            <Route path="/user/register" component={Register}/>
            <Route path="/user/login" component={UserLogin}/>
            <Route path="/user/editTicket/:ticketID" component={EditTicket}/>
        </Switch>
    </div>
);

export default Router;