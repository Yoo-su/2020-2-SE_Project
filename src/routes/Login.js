import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import {Link} from "react-router-dom"
import "./Login.css";

export default class Login extends Component {
    render() {
        return (
            <div className="LoginPage">
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button><br></br>
            </form>
            </div>
        );
    }
}

