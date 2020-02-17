import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: '20px',
		marginTop: '20px',
		padding: '7px'
	},
	row: {
		marginTop: '12px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	icon: {
		cursor: 'pointer',
		color: '#66788A'
	},
	gitIcon: {
		cursor: 'pointer',
		color: 'black',
		margin: "5px"
	}
	,
	gitLink: {
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer'
	},
	link: {
		color: '#4183C4',
		fontWeight: 'bold'
	},
	gitTag: {
		marginLeft: '10px',
		marginRight: '10px',
		display: "flex",
		alignItems: 'center',
		justifyContent: "center",
		backgroundColor: "#F5F5F5",
		padding: "2px 9px",
		borderRadius: '15px'
	},
	tagText: {
		marginLeft: "3px", marginRight: "3px", color: '#66788A'
	}
}));

const GitCard = (props) => {
	const { className, git, watchers, forks, ...rest } = props;

	const classes = useStyles();

	const gitLink = git.replace("https://github.com/", "")

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}
		>
			<CardContent>
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Typography
						align="left"
						variant="h5"
					>
						GitHub
				</Typography>
					<div className={classes.gitTag}>
						<VisibilityIcon className={classes.icon} />
						<Typography
							className={classes.tagText}
							align="left"
						>
							Watch
				</Typography>
						<Typography
							className={classes.tagText}
							variant="h5">{watchers}</Typography>
					</div>
					<div className={classes.gitTag}>
						<CallSplitIcon className={classes.icon} />
						<Typography
							className={classes.tagText}
							align="left"
						>
							Fork
				</Typography>
						<Typography
							className={classes.tagText}
							variant="h5">{forks}</Typography>
					</div>
				</div>

				<div className={classes.row}>
					<div
						className={classes.gitLink}
						onClick={() => window.open(git, '_blank')}
					>
						<GitHubIcon className={classes.gitIcon} />
						<a className={classes.link}>{gitLink}</a>
					</div>

				</div>
			</CardContent>
		</Card>
	);
};

GitCard.propTypes = {
	className: PropTypes.string,
};

export default GitCard;
