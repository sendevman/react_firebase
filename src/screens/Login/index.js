import React, { Component } from 'react';
import PropTypes from 'prop-types';

// React Router Dom
import { withRouter } from 'react-router-dom';

// My Firebase
import { auth } from '../../firebase/index';

// Material-UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

// My routes

// My Assets
import imgDefault from 'assets/images/imgDefault.png';

const INITIAL_STATE = {
  email: '',
  emailError: false,
  emailErrorText: 'ex. email@sample.co',
  password: '',
  passwordError: false,
  passwordErrorText: 'should be at least 8 characters',
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentWillMount() {
    this._handleInputChange = this._handleInputChange.bind(this);

    this.email = React.createRef();
    this.password = React.createRef();
  }

  _handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  }

  validEmail = () => {
    if (/[a-zA-Z0-9._]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}/.test(this.state.email)) {
      this.setState({ emailErrorText: '' });
      this.setState({ emailError: false });
      return true;
    }

    this.setState({ emailErrorText: 'ex. email@sample.co' });
    this.setState({ emailError: true });
    return false;
  }

  validPassword = () => {
    if (this.isEmpty(this.state.password) || this.state.password.length < 8) {
      this.setState({ passwordErrorText: 'should be at least 8 characters' });
      this.setState({ passwordError: true });
      return false;
    }

    this.setState({ passwordErrorText: '' });
    this.setState({ passwordError: false });
    return true;
  }

  isEmpty = (str) => (!str || !str.trim() || str.length === 0);

  _signIn = () => {
    if (this.validEmail() && this.validPassword()) {
      this.signIn();
    }
  }

  signIn = () => {
    const { email, password } = this.state;
    const { history } = this.props;

    /* eslint no-unused-vars: 0 */
    auth.doSignIn(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        history.push('/');
      })
      .catch(error => { this.handleError(error); });
  }

  handleError(error) {
    if (error.code === 'auth/invalid-email') {
      this.setState({ emailErrorText: error.message, emailError: true });
    } else if (error.code === 'auth/user-disabled') {
      this.setState({ emailErrorText: error.message, emailError: true });
    } else if (error.code === 'auth/user-not-found') {
      this.setState({ emailErrorText: error.message, emailError: true });
    } else if (error.code === 'auth/wrong-password') {
      this.setState({ passwordErrorText: error.message, passwordError: true });
    }
  }

  _onKeyDownInput = (event) => {
    const key = event.keyCode || event.charCode;
    if (key === 13) {
      if (this.validEmail() && this.validPassword()) {
        this.signIn();
      }
    }
  }

  render() {
    return (
      <div className="Container-box">
        <Card className="Card">
          <CardMedia
            component="img"
            alt="Img Default"
            className="Media"
            height="390"
            image={imgDefault}
            title="Img Default"
          />
          <CardContent>
            <form className="Form-Container" noValidate autoComplete="off">
              <TextField
                ref={this.email}
                className="Text-Field"
                error={this.state.emailError}
                type="email"
                name="email"
                label="Email"
                value={this.state.email}
                onChange={this._handleInputChange}
                onKeyDown={this._onKeyDownInput}
                autoComplete="email"
                autoFocus
                required
                margin="normal"
              />
              {this.state.emailError && <FormHelperText className="Text-Field-Error" error>{this.state.emailErrorText}</FormHelperText>}

              <TextField
                ref={this.password}
                className="Text-Field"
                error={this.state.passwordError}
                type="password"
                name="password"
                label="Password"
                value={this.state.password}
                onChange={this._handleInputChange}
                onKeyDown={this._onKeyDownInput}
                autoComplete="current-password"
                required
                margin="normal"
              />
              {this.state.passwordError && <FormHelperText className="Text-Field-Error" error>{this.state.passwordErrorText}</FormHelperText>}

              <Button variant="contained" size="medium" color="primary" className="Submit-Button" onClick={() => this._signIn()}>
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const LogInPage = ({ history }) => <LoginForm history={history} />;

LogInPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(LogInPage);

LoginForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export { LoginForm };
