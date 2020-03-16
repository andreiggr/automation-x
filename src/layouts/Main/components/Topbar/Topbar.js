import React, { useState } from 'react';
import { Link as RouterLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Button, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { withRouter } from 'react-router';
import InputIcon from '@material-ui/icons/Input';
import Categories from './Categories/Categories';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { logoutUser } from '../../../../actions/auth';

const useStyles = makeStyles((theme) => ({
	root: {
		boxShadow: 'none'
	},
	flexGrow: {
		flexGrow: 1
	},
	signOutButton: {
		marginLeft: theme.spacing(1)
	},
	logout: {
		color: 'white',
		fontSize: '15px',
		marginRight: '5px'
	},
	hireButton: {
		marginLeft: '82px'
	}
}));

const Topbar = (props) => {
	const { className, onSidebarOpen, user, logout, history, ...rest } = props;

	const classes = useStyles();

	const [ notifications ] = useState([]);

	const handleLogOut = () => {
		logout();
	};
	const handleLogin = () => {
		history.replace('/sign-in');
	};

	return (
		<AppBar {...rest} className={clsx(classes.root, className)}>
			<Toolbar>
				<RouterLink to="/">
					<img alt="Logo" src="/images/logos/logo--white.svg" />
				</RouterLink>
				<a className={classes.hireButton} href="https://www.linkedin.com/in/profiroiu-mihai-89895aa8/">
					<Button color="secondary" size="small" variant="contained">
						Hire a Flutter Dev
					</Button>
				</a>
				<div className={classes.flexGrow} />
				<Hidden mdDown>
					<IconButton color="inherit">
						{/* <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge> */}
					</IconButton>
					{user && (
						<IconButton className={classes.signOutButton} color="inherit" onClick={handleLogOut}>
							<Typography className={classes.logout}> Logout</Typography>
							<InputIcon />
						</IconButton>
					)}
					{!user && (
						<Button color="secondary" onClick={handleLogin} size="small" variant="contained">
							Log in
						</Button>
					)}
				</Hidden>
				<Hidden lgUp>
					<IconButton color="inherit" onClick={onSidebarOpen}>
						<MenuIcon />
					</IconButton>
				</Hidden>
			</Toolbar>
		</AppBar>
	);
};

Topbar.propTypes = {
	className: PropTypes.string,
	onSidebarOpen: PropTypes.func
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(logoutUser())
	};
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Topbar);
