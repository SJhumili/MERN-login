import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import {connect} from 'react-redux';
import {signUserIn, signGoogle} from '../../actions';
import GoogleLogin from 'react-google-login';
import Particles from 'react-particles-js';

import "./SignIn.css";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    padding:theme.spacing.unit * 10,
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: ""
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSiginGoogleSuccess = this.handleSiginGoogleSuccess.bind(this);
        this.handleSiginGoogleFailure = this.handleSiginGoogleFailure.bind(this);
    }
    
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSiginGoogleSuccess = (response) => {
        let profile = {
            name: response.w3.ig,
            email: response.w3.U3,
        }
        this.props.signGoogle(profile);
                
    }
    handleSiginGoogleFailure = (response) => {
        console.log(response);
    }
    handleSubmit = (event, d) => {
        event.preventDefault();
        /*
        this.props.dispatch({type:'AUTH_USER'});
        this.props.history.push('/');
        console.log(this.props);
        */
        this.props.signUserIn(this.state);
    }
    
    render(){
        const { classes } = this.props;

        return (
            <div id='particles-js'>
            
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <form className={classes.form}>
                        <FormControl margin="normal" onChange={this.handleChange} required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email"  autoFocus />
                        </FormControl>

                        <FormControl margin="normal" onChange={this.handleChange} required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password"/>

                        </FormControl>

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick ={this.handleSubmit}
                            >
                            Sign in
                        </Button>
                    </form>
                    
                    <Typography component="h6" variant="h5" color='secondary'>
                        {this.props.errorMsg}
                    </Typography>
                    <Typography component="h6" variant="h5">
                        {"Don't you have any accout?"} <a href='/signup'>Sign Up</a>
                    </Typography>
                    <GoogleLogin
                        clientId="282561027541-43r6pkvaqe0e54r4a5v75mu1u81mtmv9.apps.googleusercontent.com"
                        buttonText="Continue with Google"
                        onSuccess={this.handleSiginGoogleSuccess}
                        onFailure={this.handleSiginGoogleFailure}
                    />
                    
                </Paper>
            </main>
                <div id='particle-container'>
                        <Particles className='myCanvas'
                            params={{
                            "particles": {
                                "number": {
                                    "value": 160,
                                    "density": {
                                        "enable": false
                                    }
                                },
                                "size": {
                                    "value": 3,
                                    "random": true,
                                    "anim": {
                                        "speed": 4,
                                        "size_min": 0.3
                                    }
                                },
                                "line_linked": {
                                    "enable": false
                                },
                                "move": {
                                    "random": true,
                                    "speed": 1,
                                    "direction": "top",
                                    "out_mode": "out"
                                }
                            },
                            "interactivity": {
                                "events": {
                                    "onhover": {
                                        "enable": true,
                                        "mode": "bubble"
                                    },
                                    "onclick": {
                                        "enable": true,
                                        "mode": "repulse"
                                    }
                                },
                                "modes": {
                                    "bubble": {
                                        "distance": 250,
                                        "duration": 2,
                                        "size": 0,
                                        "opacity": 0
                                    },
                                    "repulse": {
                                        "distance": 400,
                                        "duration": 4
                                    }
                        }
                    }
                }} />
            </div>
            
            </div>
            );
    }
  
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStatetoProps  = ({auth}) =>{
    return {
      authenticated: auth.authenticated,
      errorMsg: auth.error
    }
  }

export default connect(mapStatetoProps, {signUserIn, signGoogle})(withStyles(styles)(SignIn));