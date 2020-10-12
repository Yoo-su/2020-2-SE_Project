import React, { Component } from "react";
import {FormGroup} from 'react-bootstrap'
import "./Signup.css";

export default class Login extends Component {
    render() {
        return (
            <div className="SignupPage">
            <form>
                <h3>Sign up</h3>

                <div className="form-group">
                    <label>NickName</label>
                    <input type="email" className="form-control" placeholder="Enter Nickname" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="confirm password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
            </div>
        );
    }
}

