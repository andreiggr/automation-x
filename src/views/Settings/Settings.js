import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Notifications, Password, AccountProfile, AccountDetails } from './components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4)
	}
}));

const Settings = ({ user, history }) => {
	const classes = useStyles();

	useEffect(() => {
		if (user === undefined) history.replace('/');
	});

	return (
		<div className={classes.root}>
			<Grid container spacing={4}>
				<Grid item md={5} xs={12}>
					{user && <AccountDetails />}
				</Grid>
				<Grid item md={5} xs={12}>
					{user && <AccountProfile />}
				</Grid>
			</Grid>
			<Grid container spacing={4}>
				{/* <Grid item md={7} xs={12}>
					<Notifications />
				</Grid> */}
				<Grid item md={5} xs={12}>
					<Password />
				</Grid>
			</Grid>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Settings);
