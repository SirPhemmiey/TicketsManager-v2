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
            loading: false,
            complain: '',
            subject: '',
            message: ''
        }

        this.handleForm = this.handleForm.bind(this);
        this.handleComplain = this.handleComplain.bind(this);
        this.handleSubject = this.handleSubject.bind(this);
    }
    componentWillMount() {
      if (window.localStorage.getItem('token') === null) {
        return <Redirect to="/user/login"/>
      }
      //console.log(window.localStorage.getItem('firstName'));
    }
    handleComplain(e) {
      this.setState({
        complain: e.target.value
      });
    }
    handleSubject(e) {
       this.setState({
        subject: e.target.value
       });
    }

    async handleForm(e) {
      e.preventDefault();
      this.setState({ loading: true });
      let { complain, subject } = this.state;
      const token = window.localStorage.getItem('token');
     // alert(token);
      if (complain !== '' && subject !== '') {
        const result = await axios.post('/tickets',
        { complain, subject },
        { headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }});
        if (result.data.success) {
          this.setState({
            loading: false,
            message: 'Successfully added ticket'
          });
         // alert("Successfully added ticket");

        }
        else {
          this.setState({
            loading: false
          });
          alert("Could not create ticket");
          alert(result.data.message);
        }
      }
      //else {
        //alert("Fill all fields");
      //}
    }
    componentDidMount() {
      //const token = window.localStorage.getItem('token');
      //alert(token);
    }

    render() {

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
            <Dots animating={this.state.loading}/>
              <i className="fas fa-table"></i>
              Submit a Ticket </div>
          {
            this.state.message ?
            <div className="alert alert-warning alert-dismissible" role="alert">
            <button type="button" className="close" dataDismiss="alert" ariaLabel="Close"><span ariaHidden="true">&times;</span></button>
            {this.state.message}
          </div>
            : ''
          }

            <div className="card-body">
            <form>
            <div className="form-group">
              <div className="form-label-group">
                <input type="text" id="subject" className="form-control" onChange={this.handleSubject}/>
                <label htmlFor="inputEmail">Subject</label>
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <textarea id="complain" value={this.state.complain} className="form-control" placeholder="Write your complain here..."  cols="30" rows="10" onChange={this.handleComplain} ></textarea>
              </div>
            </div>
            <input onClick={this.handleForm} className="btn btn-primary btn-block" type="submit" value={this.state.loading ? 'Submitting..' : 'Add'} disabled={this.state.loading ? true : false }/>
          </form>
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