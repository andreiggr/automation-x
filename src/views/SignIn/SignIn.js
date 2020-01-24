import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, IconButton, TextField, Link, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { loginUser } from '../../actions/auth';

import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';

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
	const { history, logIn, loginError, user } = props;

	const classes = useStyles();

	const [ formState, setFormState ] = useState({
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
		[ formState.values, user ]
	);

	const handleBack = () => {
		history.replace('/');
	};

	const handleChange = (event) => {
		event.persist();

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

	const handleSignIn = async (event) => {
		event.preventDefault();

		const { email, password } = formState.values;

		logIn(email, password);
		// {
		// 	(await !loginError) && history.push('/');
		// }
	};

	const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

	return (
		<div className={classes.root}>
			<Grid className={classes.grid} container>
				<Grid className={classes.quoteContainer} item lg={5}>
					<div className={classes.quote}>
						<div className={classes.quoteInner}>
							<Typography className={classes.quoteText} variant="h1">
								Hella narwhal Cosby sweater McSweeney's, salvia kitsch before they sold out High Life.
							</Typography>
							<div className={classes.person}>
								<Typography className={classes.name} variant="body1">
									Takamaru Ayako
								</Typography>
								<Typography className={classes.bio} variant="body2">
									Manager at inVision
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
								{/* <Typography
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
                      color="primary"
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      <FacebookIcon className={classes.socialIcon} />
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      <GoogleIcon className={classes.socialIcon} />
                      Login with Google
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
                </Typography> */}
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
								<Button
									className={classes.signInButton}
									color="primary"
									disabled={!formState.isValid}
									fullWidth
									onClick={handleSignIn}
									//type="submit"
									size="large"
									variant="contained"
								>
									Sign in now
								</Button>
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
		logIn: (email, password) => dispatch(loginUser(email, password))
	};
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(SignIn);
