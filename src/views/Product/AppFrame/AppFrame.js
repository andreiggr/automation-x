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
		position: 'relative',
	},
	expiredFrame: {
		display: 'flex',
		justifyContent: 'center',
		paddingLeft: '50px',
		position: 'relative',
		pointerEvents: 'none'

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

const AppFrame = ({ appId, runApp, expired, handleFrameStart }) => {

	const src = `https://appetize.io/embed/${appId}?device=android&orientation=portrait&scale=43&xdocMsg=true&deviceColor=white&debug=false&screenOnly=false`;

	var iframe = document.querySelector('iframe');

	const requestSession = () => {
		iframe.contentWindow.postMessage('requestSession', '*');
	}


	const endSession = () => {
		iframe.contentWindow.postMessage('endSession', '*');
	}

	useEffect(() => {
		var messageEventHandler = function(event){
			if(event.data == 'sessionRequested'){
				console.log(event.data);
				handleFrameStart();
			}
		};
		
		window.addEventListener('message', messageEventHandler, false);

		if (runApp === true) {
			requestSession()
		}
		if (expired === true) {
			endSession()
		}

	}, [runApp, expired])

	const classes = useStyles();
	return (
		<div className={expired ? classes.expiredFrame : classes.appFrame}>
			<div className={classes.phoneContent}>
				<iframe
					frameBorder="0"
					height="520px"
					scrolling="no"
					src={src}
					width="300px"
				/>
				<div className={classes.countdown}>
					{runApp && <CountdownCircleTimer
						colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
						durationSeconds={40}
						isPlaying={runApp}
						size={50}
					/>}
					{expired &&
						<Typography
							align="left"
							color="textSecondary"
							variant="h5"
						>
							Your time has expired
				</Typography>
					}
				</div>
			</div>
		</div>
	);
};
export default AppFrame;
