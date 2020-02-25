import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import styles from './Styles';

const useStyles = makeStyles((theme) => styles);

const AppFrame = ({ appId, runApp, expired, handleFrameStart, sessionTime }) => {
	const src = `https://appetize.io/embed/${appId}?device=android&orientation=portrait&scale=55&xdocMsg=true&deviceColor=white&debug=false&screenOnly=false`;
	const countDownTime = sessionTime / 1000;

	var iframe = document.querySelector('iframe');

	useEffect(
		() => {
			var messageEventHandler = function(event) {
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
		},
		[ runApp, expired ]
	);

	const classes = useStyles();
	return (
		<div className={expired ? classes.expiredFrame : classes.appFrame}>
			<div className={classes.phoneContent}>
				<iframe frameBorder="0" height="720px" scrolling="no" src={src} width="400px" />
				{runApp && (
					<div className={classes.countdown}>
						<CountdownCircleTimer
							colors={[ [ '#004777', 0.33 ], [ '#F7B801', 0.33 ], [ '#A30000' ] ]}
							durationSeconds={countDownTime}
							isPlaying={runApp}
							size={45}
						/>
					</div>
				)}
				{expired && (
					<Typography className={classes.expiredText} align="center" color="textSecondary" variant="h4">
						Your time has expired!
					</Typography>
				)}
			</div>
		</div>
	);
};
export default AppFrame;
