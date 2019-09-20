import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '@isomorphic/shared/isomorphic/components/uielements/input';
import Checkbox from '@isomorphic/shared/isomorphic/components/uielements/checkbox';
import Button from '@isomorphic/shared/isomorphic/components/uielements/button';
import authAction from '../../redux/auth/actions';
import IntlMessages from '@isomorphic/shared/isomorphic/components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';

const { login } = authAction;

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    previouslyLoggedIn: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (
        state.previouslyLoggedIn !== props.isLoggedIn &&
        props.isLoggedIn === true
    ) {
      return {
        redirectToReferrer: true,
        previouslyLoggedIn: props.isLoggedIn,
      }
    }

    return null;
  }

  handleLogin = () => {
    const { login } = this.props;
    login();
    this.props.history.push('/dashboard');
  };
  render() {
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input size="large" placeholder="Username" />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" type="password" placeholder="Password" />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={this.handleLogin}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>

              <p className="isoHelperText">
                <IntlMessages id="page.signInPreview" />
              </p>

              <div className="isoInputWrapper isoOtherLogin">
                <Button onClick={this.handleLogin} type="primary btnFacebook">
                  <IntlMessages id="page.signInFacebook" />
                </Button>
                <Button onClick={this.handleLogin} type="primary btnGooglePlus">
                  <IntlMessages id="page.signInGooglePlus" />
                </Button>
              </div>
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
                <Link to="">
                  <IntlMessages id="page.signInCreateAccount" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false,
  }),
  { login }
)(SignIn);
