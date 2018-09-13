import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dots from 'react-activity/lib/Dots';
import 'react-activity/lib/Dots/Dots.css';

export default class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirm_password: '',
            loading: false
        }
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleFirstName(e) {
        this.setState({ firstName: e.target.value });
    }
    handleLastName(e) {
        this.setState({ lastName: e.target.value });
    }
    handleEmail(e) {
        this.setState({ email: e.target.value });
    }
    handlePassword(e) {
        this.setState({ password: e.target.value });
    }
    handleConfirmPassword(e) {
        this.setState({ confirm_password: e.target.value });
    }
   async handleRegister(e) {
        e.preventDefault();
        this.setState({ loading: true });
        const { firstName, lastName, email, password, confirm_password } = this.state;
        if (firstName != '' || lastName != '' || email != '' || password != '') {
            if (password == confirm_password) {
                const send = await axios.post('/users/signup', {
                    firstName, lastName, email, password
                });

                if (send.data.success) {
                    this.setState({loading: false})
                    alert(send.data.message);
                }
                else {
                    this.setState({ loading: false });
                    alert(send.data.message)
                }
            }
            else {
                alert("Passwords do not match");
            }
        }
        else {
            alert("Please fill all fields");
        }
    }

    render() {
        return (
            <div className="bg-dark">
            <div className="container">
            <div className="card card-register mx-auto mt-5">
        <div className="card-header">Register an Account</div>
        <div className="card-body">
        <Dots animating={this.state.loading}/>
          <form>
            <div className="form-group">
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-label-group">
                  <label htmlFor="firstName">First name</label>
                    *<input type="text" name="firstName" className="form-control" placeholder="First name" required="required" autofocus="autofocus" onChange={this.handleFirstName.bind(this)}/>

                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-label-group">
                    *<input type="text" name="lastName" className="form-control" placeholder="Last name" required="required" onChange={this.handleLastName.bind(this)}/>
                    <label htmlFor="lastName">Last name</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                *<input type="email" name="email" className="form-control" placeholder="Email address" required="required" onChange={this.handleEmail.bind(this)}/>
                <label htmlFor="inputEmail">Email address</label>
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-label-group">
                    *<input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required="required" onChange={this.handlePassword.bind(this)}/>
                    <label htmlFor="inputPassword">Password</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-label-group">
                    *<input type="password" id="confirmPassword" className="form-control" placeholder="Confirm password" required="required" onChange={this.handleConfirmPassword.bind(this)} />
                    <label htmlFor="confirmPassword">Confirm password</label>
                  </div>
                </div>
              </div>
            </div>
            <Dots animating={this.state.loading}/>
            <button className="btn btn-primary btn-block" onClick={this.handleRegister} disabled={this.state.loading ? true : false}>{this.state.loading ? 'Registering...': 'Register'}</button>
          </form>
          <div className="text-center">
            <Link to="login" className="d-block small mt-3">Login</Link>
            <Link to="#" className="d-block small">Forgot Password?</Link>
          </div>
        </div>
      </div>
        </div>
        </div>
        );
    }
}