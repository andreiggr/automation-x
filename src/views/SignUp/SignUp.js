import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, IconButton, TextField, Link, FormHelperText, Checkbox, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Google as GoogleIcon } from 'icons';
import { googleLogin, gitLogin, signUp, clearErrors } from "actions/auth";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';


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
	},
	policy: {
		presence: { allowEmpty: false, message: 'is required' },
		checked: true
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
	textField: {
		marginTop: theme.spacing(2)
	},
	policy: {
		marginTop: theme.spacing(1),
		display: 'flex',
		alignItems: 'center'
	},
	policyCheckbox: {
		marginLeft: '-14px'
	},
	signUpButton: {
		margin: theme.spacing(2, 0)
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
}));

const SignUp = (props) => {
	const { history, signUp, signupError, loginError, user, googleAuth, gitAuth, resetErrors } = props;

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

	const handleBack = () => {
		history.replace('');
	};

	const handleSignUp = (event) => {
		event.preventDefault();
		const { email, password } = formState.values;
		signUp(email, password);
	};

	const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

	const handleGoogleSignUp = () => {
		googleAuth();
	}

	const handleGitSignUp = () => {
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
							<form className={classes.form} onSubmit={handleSignUp}>
								<Typography className={classes.title} variant="h2">
									Sign up
								</Typography>
								<Typography
									color="textSecondary"
									gutterBottom
								>
									Create new account with social
                </Typography>
								<Grid
									className={classes.socialButtons}
									container
									spacing={2}
								>

									<Grid item>
										<Button
											onClick={() => handleGoogleSignUp()}
											size="large"
											variant="contained"
											color="primary"
										>
											<GoogleIcon className={classes.socialIcon} />
											SignUp with Google
                    </Button>
									</Grid>
									<Grid item>
										<Button
											onClick={() => handleGitSignUp()}
											color="primary"
											size="large"
											variant="contained"
										>
											<GitHubIcon className={classes.socialIcon} />
											SignUp with GitHub
                    </Button>
									</Grid>
								</Grid>

								<Typography color="textSecondary" style={{ marginTop: "20px" }}>
									Or use your email to create new account
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
								<div className={classes.policy}>
									<Checkbox
										checked={formState.values.policy || false}
										className={classes.policyCheckbox}
										color="primary"
										name="policy"
										onChange={handleChange}
									/>
									<Typography className={classes.policyText} color="textSecondary" variant="body1">
										I have read the{' '}
										<Link
											color="primary"
											component={RouterLink}
											to="#"
											underline="always"
											variant="h6"
										>
											Terms and Conditions
										</Link>
									</Typography>
								</div>
								{hasError('policy') && (
									<FormHelperText error>{formState.errors.policy[0]}</FormHelperText>
								)}

								{signupError && <Typography color="error">{signupError}</Typography>}
								{loginError && <Typography color="error">{loginError}</Typography>}
								<GoogleReCaptchaProvider
									reCaptchaKey="6Ldz7N0UAAAAALfJ_2U0-aeqlJD4PMrK2MF0J81O"
									language="en"
								>
									<Button
										className={classes.signUpButton}
										color="primary"
										disabled={!formState.isValid}
										fullWidth
										size="large"
										type="submit"
										variant="contained"
									>
										Sign up now
								</Button>

								</GoogleReCaptchaProvider>

								<Typography color="textSecondary" variant="body1">
									Have an account?{' '}
									<Link component={RouterLink} to="/sign-in" variant="h6">
										Sign in
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

SignUp.propTypes = {
	history: PropTypes.object
};

const mapStateToProps = (state) => {
	return {
		state,
		user: state.auth.user,
		signupError: state.auth.signupError,
		loginError: state.auth.loginError,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (email, password) => dispatch(signUp(email, password)),
		googleAuth: () => dispatch(googleLogin()),
		gitAuth: () => dispatch(gitLogin()),
		resetErrors: () => dispatch(clearErrors())
	};
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(SignUp);
