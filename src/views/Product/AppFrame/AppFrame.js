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
	phoneContent: {
		position: 'relative'
	},
	countdown: {
		position: 'absolute',
		bottom: '12px',
		left: '104px'
	},
	runCard: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '20px',
		minHeight: '150px'
	},
	icon: {
		marginBottom: '30px',
		fontSize: '50px'
	}
}));

const AppFrame = ({ src, runApp, expired }) => {
	const classes = useStyles();
	return (
		<div className={classes.appFrame}>
			{runApp && (
				<div className={classes.phoneContent}>
					<iframe
						frameBorder="0"
						height="520px"
						scrolling="no"
						src={src}
						width="300px"
					/>
					<div className={classes.countdown}>
						<CountdownCircleTimer
							colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
							durationSeconds={40}
							isPlaying
							size={50}
						/>
					</div>
				</div>
			)}
			{!runApp &&
				!expired && (
					<div>
						<Card>
							<CardContent>
								<Grid
									className={classes.runCard}
									direction="column"
								>
									<InfoIcon
										className={classes.icon}
										color="action"
										fontSize="large"
									/>
									<Typography
										align="center"
										color="textSecondary"
										variant="h4"
									>
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
							<Grid
								className={classes.runCard}
								direction="column"
							>
								<TimerOffIcon
									className={classes.icon}
									color="action"
									fontSize="large"
								/>
								<Typography
									align="center"
									color="textSecondary"
									variant="h4"
								>
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
