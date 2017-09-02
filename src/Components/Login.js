import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Input } from 'react-toolbox/lib/input';
import { login } from '../Actions/Login'
import '../Styles/style.css'

const signInIcon = {
    paddingRight: '5%'
};
const inputStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '75%'
};
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
        this.attemptLogin = this.attemptLogin.bind(this);
        this.changeEmail = ev => this.setState({ email: ev });
        this.changePassword = ev => this.setState({ password: ev });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isLogin === true) {
            hashHistory.push('home');
        } else if (nextProps.isLogin === null) {
            this.setState({ error: 'Wrong Username or Password'});
        }
    }

    componentDidMount()
    {
        if(localStorage.getItem('isLogin'))
        {
          hashHistory.push('home');
        }
    }
    async attemptLogin(ev) {
        ev.preventDefault();
        try {
            const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (emailPattern.test(this.state.email)) {
                this.setState({ error: '' });
                if (this.state.password.length) {
                    await this.props.dispatch(login(this.state.email, this.state.password));
                } else {
                    this.setState({ error: 'Password should not be blank' })
                }
            } else {
                this.setState({ error: 'Please enter valid email address' });
            }
        } catch (error) {
            this.setState({ error: 'Wrong username or password!' });
        }
    }
    render() {
        return (
            <Grid className="login-page">
                <Row>
                    <Col xs={6} xsOffset={3}>
                        <Col className="login-box">
                            <Col className="login-title">Login</Col>
                            <form onSubmit={this.attemptLogin}>
                                <fieldset>
                                    <fieldset className="form-group" style={inputStyle}>
                                        <Input
                                            type="text"
                                            label="Email"
                                            placeholder="Enter email"
                                            value={this.state.email}
                                            onChange={this.changeEmail}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group" style={inputStyle}>
                                        <Input
                                            type="password"
                                            label="Password"
                                            placeholder="Enter password"
                                            value={this.state.password}
                                            onChange={this.changePassword}
                                        />
                                    </fieldset>
                                    <Col className="login-btn">
                                        <Button
                                            className="btn btn-md btn-primary"
                                            type="submit">
                                            <i className="fa fa-sign-in" style={signInIcon} />
                                            LOGIN
                                    </Button>
                                    </Col>
                                    <Col className="login-error">{this.state.error}</Col>
                                </fieldset>
                            </form>
                        </Col>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.authentication.isLogin,
    };
};
Login.propTypes = {
    dispatch: PropTypes.func
};

export default connect(mapStateToProps)(Login);
