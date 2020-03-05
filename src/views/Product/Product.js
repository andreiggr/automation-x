import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { GitCard } from './GitCard';
import { ContentCard } from './ContentCard';
import { fetchData, selectProduct } from 'actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppFrame from './AppFrame/AppFrame';
import { CommentsCard } from './CommentsCard';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3),
		display: 'flex'
	},
	categoryTitle: {
		fontSize: 22,
		marginBottom: 29,
		marginTop: 29
	},
	backButton: {
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center'
	},
	contentBar: {
		display: 'flex',
		flexDirection: 'row',
		height: '42px',
		justifyContent: 'space-between',
		flex: 0
	},
	contentGrid: {
		flex: 1,
		flexBasis: 'auto'
	},
	soloGrid: {
		maxWidth: '800px',
		flexBasis: 'auto'
	}
}));

const Product = ({ selectedProduct, user }) => {
	const classes = useStyles();

	const [run, setRun] = useState(false);
	const [expired, setExpired] = useState(false);

	const isSigned = user ? true : false;
	const sessionTime = isSigned ? 90000 : 40000;
	const hasAppFrame = selectedProduct.appId === 'null' ? false : true;

	const onStartApp = () => {
		setRun(true);
		onEndSession();
	};

	const onEndSession = () => {
		setTimeout(() => {
			setRun(false);
			setExpired(true);
		}, sessionTime);
	};

	return (
		<Grid className={classes.root} container direction="row">
			<Grid className={hasAppFrame ? classes.soloGrid : classes.contentGrid} direction="column">
				<div className={classes.contentBar}>
					<Link className={classes.backButton} to="/">
						<ArrowBackIosIcon fontSize="small" />
						<Typography className={classes.categoryTitle}>Go back</Typography>
					</Link>
					{hasAppFrame && (
						<Button color="primary" disabled={expired} onClick={onStartApp} variant="contained">
							Run on Emulator
						</Button>
					)}
				</div>
				<GitCard
					forks={selectedProduct.forksRepo}
					git={selectedProduct.linkRepo}
					watchers={selectedProduct.watchersRepo}
				/>
				<ContentCard />
				<CommentsCard/>
			</Grid>
			{hasAppFrame && (
				<Grid className={classes.contentGrid} direction="column" item>
					<AppFrame
						sessionTime={sessionTime}
						expired={expired}
						runApp={run}
						appId={selectedProduct.publicKey}
						handleFrameStart={onStartApp}
					/>
				</Grid>
			)}
		</Grid>
	);
};

Product.propTypes = {};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		data: state.data,
		selectedProduct: state.selectedProduct
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		selectProduct: (product) => dispatch(selectProduct(product))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
