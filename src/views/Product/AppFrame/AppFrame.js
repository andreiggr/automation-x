import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
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
		bottom: '18px',
		left: '104px'
	},
	expiredText: {
		bottom: "30px",
		position: "absolute",
		left:"55px"
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

	useEffect(() => {
		var messageEventHandler = function (event) {
			if (event.data == 'sessionRequested') {
				handleFrameStart();
			}
		};

		window.addEventListener('message', messageEventHandler, false);

		if (runApp === true) {
			iframe.contentWindow.postMessage('requestSession', '*');
		}
		if (expired === true) {
			iframe.contentWindow.postMessage('endSession', '*');
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
				{runApp &&
					<div className={classes.countdown}>
						<CountdownCircleTimer
							colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
							durationSeconds={40}
							isPlaying={runApp}
							size={45}
						/>

					</div>
				}
				{expired &&
					<Typography
						className={classes.expiredText}
						align="center"
						color="error"
						variant="h5"
					>
						Your time has expired!
				</Typography>
				}
			</div>
		</div>
	);
};
export default AppFrame;
