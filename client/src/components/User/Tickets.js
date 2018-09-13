import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Header from './Header';
import SideBar from './Sidebar'
import Footer from './Footer';
import Dots from 'react-activity/lib/Dots';
import 'react-activity/lib/Dots/Dots.css';

export default class AddTicket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tickets: []
        }
       // this.deleteTicket = this.deleteTicket.bind(this);
    }
   async componentWillMount() {
      if (window.localStorage.getItem('token') === null) {
        return <Redirect to="/user/login"/>
      }
      await this.getTickets()
    }
    async getTickets() {
        const token = window.localStorage.getItem('token');
        const tickets = await axios.get('/tickets', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        if (tickets.data.success) {
            this.setState({
                tickets: tickets.data.tickets,
                loading: false
            });
            //alert(JSON.stringify(this.state.tickets));
        }
        else {
            this.setState({
                loading: false,
                message: tickets.data.message
            });
        }
    }
    // async deleteTicket() {
    //     this.setState({ loading: true });
    //     const token = window.localStorage.getItem('token');
    //     const deleteTicket = await axios.delete('/users/deleteTicket', {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //     if (deleteTicket.data.success) {
    //         this.setState({
    //             loading: false
    //         });
    //         alert("Deleted successfully");
    //     }
    //     else {
    //         alert(deleteTicket.data.message)
    //     }
    // }

    render() {
        const { tickets } = this.state;
        return (
            <div>
                <Header />
                <div id="wrapper">
                <SideBar />
                <div id="content-wrapper">
               <div className="container-fluid">

          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Welcome, {window.localStorage.getItem('firstName')}</li>
          </ol>

          <div className="card mb-3">
            <div className="card-header">

              <i className="fas fa-table"></i>
                All Tickets </div>
            <div className="card-body">
            <div class="table-responsive">
            <Dots animating={this.state.loading}/>
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Subject</th>
                      <th>Complain</th>
                      <th>Response</th>
                      <th>Date Created</th>
                      <th>Status</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((tickets, index) => {
                       return (
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td><Link to={`/user/editTicket/${tickets._id}`}>{tickets.subject}</Link></td>
                        <td><Link to={`/user/editTicket/${tickets._id}`}>{tickets.complain}</Link></td>
                        <td>{tickets.response.response ? tickets.response.response : 'not yet'}</td>
                        <td><Link to={`/user/editTicket/${tickets._id}`}>{tickets.date_created}</Link></td>
                        <td><Link to={`/user/editTicket/${tickets._id}`}>{tickets.status}</Link></td>
                        {/* <td><button className="btn btn-primary btn-block">Delete</button></td> */}
                      </tr>
                       )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
        <Footer />
            </div>
            </div>
            </div>
        );
    }
}