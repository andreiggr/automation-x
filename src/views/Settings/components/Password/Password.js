import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, CardActions, Divider, Button, TextField, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { doPasswordUpdate } from '../../../../actions/auth';

const useStyles = makeStyles(() => ({
	root: {}
}));

const Password = (props) => {
	const { className, updatePassword, history, user, ...rest } = props;

	const classes = useStyles();

	const [ values, setValues ] = useState({
		oldPassword: '',
		password: '',
		errorChange: false,
		successChange: false
	});

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		});
	};

	const handlePasswordUpdate = () => {
		updatePassword(values.oldPassword, values.password);
		setValues({ ...values, errorChange: false });
		setValues({ ...values, successChange: true });
		// else {
		// 	setValues({ ...values, successChange: false });
		// 	setValues({ ...values, errorChange: true });
		// }
	};

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<form>
				<CardHeader subheader="Update password" title="Password" />
				<Divider />
				<CardContent>
					<TextField
						fullWidth
						label="Old Password"
						name="oldPassword"
						onChange={handleChange}
						type="password"
						value={values.oldPassword}
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="New password"
						name="password"
						onChange={handleChange}
						style={{ marginTop: '1rem' }}
						type="password"
						value={values.confirm}
						variant="outlined"
					/>
				</CardContent>
				{values.errorChange && <Typography>Passwords do not match. Please try again!</Typography>}
				{values.successChange && <Typography>Password changed!</Typography>}
				<Divider />
				<CardActions>
					<Button color="primary" variant="outlined" onClick={handlePasswordUpdate}>
						Update
					</Button>
				</CardActions>
			</form>
		</Card>
	);
};

Password.propTypes = {
	className: PropTypes.string
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		passError: state.auth.passwordError
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updatePassword: (currentPassword, password) => dispatch(doPasswordUpdate(currentPassword, password))
	};
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Password);
