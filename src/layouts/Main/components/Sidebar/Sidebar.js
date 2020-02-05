import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AirplayIcon from '@material-ui/icons/Airplay';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import { logoutUser } from '../../../../actions/auth';

import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: 240,
		[theme.breakpoints.up('lg')]: {
			marginTop: 64,
			height: 'calc(100% - 64px)'
		}
	},
	root: {
		backgroundColor: theme.palette.white,
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		padding: theme.spacing(2)
	},
	divider: {
		margin: theme.spacing(2, 0)
	},
	nav: {
		marginBottom: theme.spacing(2)
	}
}));

const Sidebar = (props) => {
	const { open, variant, onClose, className, user, logout, ...rest } = props;

	const classes = useStyles();

	const publicPages = [
		{
			title: 'Apps',
			href: '/products',
			icon: <AirplayIcon />
		},
		{
			title: 'Upload App (Soon..)',
			// href: '/upload',
			icon: <CloudUploadIcon />
		}
	];

	const userPages = [
		{
			title: 'Settings',
			href: '/settings',
			icon: <SettingsIcon />
		}
	];

	const logoutPage = [
		{
			title: 'Logout',
			href: '/',
			icon: <KeyboardTabIcon />
		}
	];

	const signInPage = [
		{
			title: 'Sign In',
			href: '/sign-in',
			icon: <KeyboardReturnIcon />
		}
	];

	var pages = publicPages.concat(user ? userPages : []).concat(user ? logoutPage : signInPage);

	return (
		<Drawer anchor="left" classes={{ paper: classes.drawer }} onClose={onClose} open={open} variant={variant}>
			<div {...rest} className={clsx(classes.root, className)}>
				{user && (
					<React.Fragment>
						<Profile />
						<Divider className={classes.divider} />
					</React.Fragment>
				)}
				<SidebarNav className={classes.nav} pages={pages} />
				{/* <UpgradePlan /> */}
			</div>
		</Drawer>
	);
};

Sidebar.propTypes = {
	className: PropTypes.string,
	onClose: PropTypes.func,
	open: PropTypes.bool.isRequired,
	variant: PropTypes.string.isRequired
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

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Sidebar);
