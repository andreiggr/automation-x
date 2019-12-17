import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { CardContent, Typography, Card, Grid } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const useStyles = makeStyles((theme) => ({
	appFrame: {
		display: 'flex',
		justifyContent: 'center',
		paddingLeft: '50px',
		position: 'relative'
	},
	countdown: {
		position: 'absolute'
	},
	runCard: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '20px'
	}
}));

const renderTime = (value) => {
	if (value === 0) {
		return <div className="timer">Too late...</div>;
	}

	return (
		<div className="timer">
			<div className="text">Remaining</div>
			<div className="value">{value}</div>
			<div className="text">seconds</div>
		</div>
	);
};

const AppFrame = ({ src, runApp, expired }) => {
	const classes = useStyles();
	return (
		<div className={classes.appFrame}>
			{runApp && (
				<div style={{ position: 'relative' }}>
					<iframe frameBorder="0" height="520px" scrolling="no" src={src} width="300px" />
					<CountdownCircleTimer
						isPlaying
						durationSeconds={30}
						colors={[ [ '#004777', 0.33 ], [ '#F7B801', 0.33 ], [ '#A30000' ] ]}
						size={50}
						className={classes.countdown}
					/>
				</div>
			)}
			{!runApp &&
			!expired && (
				<div>
					<Card>
						<CardContent>
							<Grid direction="column" className={classes.runCard}>
								<InfoIcon fontSize="large" color="action" />
								<Typography align="center" variant="h4">
									Press Run to Start
								</Typography>
							</Grid>
						</CardContent>
					</Card>
				</div>
			)}
			{expired && (
				<div>
					<Card>
						<CardContent>
							<Grid direction="column" className={classes.runCard}>
								<TimerOffIcon fontSize="large" color="action" />
								<Typography align="center" variant="h4">
									Your time has expired
								</Typography>
							</Grid>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
};
export default AppFrame;
