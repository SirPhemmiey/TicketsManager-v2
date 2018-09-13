import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
     logout() {
        //const tokens = window.localStorage.getItem('token');
        const remove =  window.localStorage.clear();
        if (remove) {
            return <Redirect to="/user/login"/>
        } else {
            alert('nope');
        }
    }
    render() {
        return (
          <ul className="sidebar navbar-nav">
          <li className="nav-item active">
              <Link className="nav-link" to="/user/addTicket">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
              </Link>
          </li>

          <li className="nav-item">
            <Link to="/user/addTicket" className="nav-link">
              <i className="fas fa-fw fa-table"></i>
              <span>Add Ticket</span>
              </Link>
          </li>

          <li className="nav-item">
            <Link to="/user/tickets" className="nav-link">
              <i className="fas fa-fw fa-table"></i>
              <span>Tickets</span>
              </Link>
          </li>

          <li className="nav-item">
            <Link to="/user/login" onClick={this.logout} className="nav-link">
              <i className="fas fa-fw fa-table"></i>
              <span>Logout</span>
              </Link>
          </li>

        </ul>
        );
    }
}