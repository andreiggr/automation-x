import React, { useState, useEffect } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, IconButton, TextField, Link, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { loginUser, googleLogin, gitLogin, clearErrors } from '../../actions/auth'

import { Google as GoogleIcon } from 'icons';
import GitHubIcon from '@material-ui/icons/GitHub';

const schema = {
	email: {
		presence: { allowEmpty: false, message: 'is required' },
		email: true,
		length: {
			maximum: 64
		}
	},
	password: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 128
		}
	}
};

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%'
	},
	grid: {
		height: '100%'
	},
	quoteContainer: {
		[theme.breakpoints.down('md')]: {
			display: 'none'
		}
	},
	quote: {
		backgroundColor: theme.palette.neutral,
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundImage: 'url(/images/auth.jpg)',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center'
	},
	quoteInner: {
		textAlign: 'center',
		flexBasis: '600px'
	},
	quoteText: {
		color: theme.palette.white,
		fontWeight: 300
	},
	name: {
		marginTop: theme.spacing(3),
		color: theme.palette.white
	},
	bio: {
		color: theme.palette.white
	},
	contentContainer: {},
	content: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	contentHeader: {
		display: 'flex',
		alignItems: 'center',
		paddingTop: theme.spacing(5),
		paddingBototm: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	logoImage: {
		marginLeft: theme.spacing(4)
	},
	contentBody: {
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center',
		[theme.breakpoints.down('md')]: {
			justifyContent: 'center'
		}
	},
	form: {
		paddingLeft: 100,
		paddingRight: 100,
		paddingBottom: 125,
		flexBasis: 700,
		[theme.breakpoints.down('sm')]: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2)
		}
	},
	title: {
		marginTop: theme.spacing(3)
	},
	socialButtons: {
		marginTop: theme.spacing(3)
	},
	socialIcon: {
		marginRight: theme.spacing(1)
	},
	sugestion: {
		marginTop: theme.spacing(2)
	},
	textField: {
		marginTop: theme.spacing(2)
	},
	signInButton: {
		margin: theme.spacing(2, 0)
	}
}));

const SignIn = (props) => {
	const { history, logIn, loginError, user, googleAuth, gitAuth, resetErrors } = props;

	const classes = useStyles();

	const [formState, setFormState] = useState({
		isValid: false,
		values: {},
		touched: {},
		errors: {}
	});

	useEffect(
		() => {
			const errors = validate(formState.values, schema);
			if (user) {
				history.replace('/');
			}
			setFormState((formState) => ({
				...formState,
				isValid: errors ? false : true,
				errors: errors || {}
			}));
		},
		[formState.values, user]
	);

	const handleBack = () => {
		history.replace('/');
	};

	const handleChange = (event) => {
		event.persist();
		resetErrors()
		setFormState((formState) => ({
			...formState,
			values: {
				...formState.values,
				[event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
			},
			touched: {
				...formState.touched,
				[event.target.name]: true
			}
		}));
	};

	const handleSignIn = (event) => {
		event.preventDefault();

		const { email, password } = formState.values;

		logIn(email, password);
	};

	const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

	const handleGoogleLogin = () => {
		googleAuth()
	}
	const handleGitLogin = () => {
		gitAuth()
	}

	return (
		<div className={classes.root}>
			<Grid className={classes.grid} container>
				<Grid className={classes.quoteContainer} item lg={5}>
					<div className={classes.quote}>
						<div className={classes.quoteInner}>
							<Typography className={classes.quoteText} variant="h1">
								Connect with us and get to experience more of Flutterra!
							</Typography>
							<div className={classes.person}>
								<Typography className={classes.name} variant="body1">
									Michael Proferou
								</Typography>
								<Typography className={classes.bio} variant="body2">
									Flutter developer, Flutterra
								</Typography>
							</div>
						</div>
					</div>
				</Grid>
				<Grid className={classes.content} item lg={7} xs={12}>
					<div className={classes.content}>
						<div className={classes.contentHeader}>
							<IconButton onClick={handleBack}>
								<ArrowBackIcon />
							</IconButton>
						</div>
						<div className={classes.contentBody}>
							<form className={classes.form} onSubmit={handleSignIn}>
								<Typography className={classes.title} variant="h2">
									Sign in
								</Typography>
								<Typography
									color="textSecondary"
									gutterBottom
								>
									Sign in with social media
                </Typography>
								<Grid
									className={classes.socialButtons}
									container
									spacing={2}
								>

									<Grid item>
										<Button
											size="large"
											variant="contained"
											color="primary"
											onClick={() => handleGoogleLogin()}
										>
											<GoogleIcon className={classes.socialIcon} />
											Login with Google
                    </Button>
									</Grid>
									<Grid item>
										<Button
											color="primary"
											size="large"
											variant="contained"
											onClick={() => handleGitLogin()}
										>
											<GitHubIcon className={classes.socialIcon} />
											Login with GitHub
                    </Button>
									</Grid>
								</Grid>
								<Typography
									align="center"
									className={classes.sugestion}
									color="textSecondary"
									variant="body1"
								>
									or login with email address
                </Typography>
								<TextField
									className={classes.textField}
									error={hasError('email')}
									fullWidth
									helperText={hasError('email') ? formState.errors.email[0] : null}
									label="Email address"
									name="email"
									onChange={handleChange}
									type="text"
									value={formState.values.email || ''}
									variant="outlined"
								/>
								<TextField
									className={classes.textField}
									error={hasError('password')}
									fullWidth
									helperText={hasError('password') ? formState.errors.password[0] : null}
									label="Password"
									name="password"
									onChange={handleChange}
									type="password"
									value={formState.values.password || ''}
									variant="outlined"
								/>
								{loginError && (
									<Typography color="error" variant="body1">
										{loginError}
									</Typography>
								)}

								<GoogleReCaptchaProvider
									reCaptchaKey="6Ldz7N0UAAAAALfJ_2U0-aeqlJD4PMrK2MF0J81O"
									language="en"
								>
									<Button
										className={classes.signInButton}
										color="primary"
										disabled={!formState.isValid}
										fullWidth
										//onClick={handleSignIn}
										type="submit"
										size="large"
										variant="contained"
									>
										Sign in now
								</Button>

								</GoogleReCaptchaProvider>

								<Typography color="textSecondary" variant="body1">
									Don't have an account?{' '}
									<Link component={RouterLink} to="/sign-up" variant="h6">
										Sign up
									</Link>
								</Typography>
							</form>
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

SignIn.propTypes = {
	history: PropTypes.object
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		loginError: state.auth.loginError
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logIn: (email, password) => dispatch(loginUser(email, password)),
		googleAuth: () => dispatch(googleLogin()),
		gitAuth: () => dispatch(gitLogin()),
		resetErrors: () => dispatch(clearErrors())
	};
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(SignIn);
