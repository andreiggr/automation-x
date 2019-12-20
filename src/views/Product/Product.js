import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import { ProductsToolbar } from '../ProductList/components';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { GitCard } from './GitCard';
import { ContentCard } from './ContentCard';
import PropTypes from 'prop-types';
import { fetchData, selectProduct } from 'actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppFrame from './AppFrame/AppFrame';

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
		justifyContent: 'space-between'
	}
}));

const src =
	'https://appetize.io/embed/zj3d2tfftfhjnv1f118yqq68cr?device=android&orientation=portrait&scale=65&xdocMsg=true&deviceColor=white&debug=false&screenOnly=false&autoplay=true';

const Product = ({ selectedProduct }) => {
	const classes = useStyles();

	const [run, setRun] = useState(false);
	const [expired, setExpired] = useState(false);

	const onStartApp = () => {
		setRun(true);
		onEndSession();
	};

	const onEndSession = () => {
		setTimeout(() => {
			setRun(false);
			setExpired(true);
		}, 40000);
	};

	return (
		<Grid
			className={classes.root}
			container
			direction="row"
		>
			<Grid
				direction="column"
				item
			>
				<div className={classes.contentBar}>
					<Link
						className={classes.backButton}
						to="/products"
					>
						<ArrowBackIosIcon fontSize="small" />
						<Typography className={classes.categoryTitle}>Go back</Typography>
					</Link>
					<Button
						color="primary"
						disabled={expired}
						onClick={onStartApp}
						variant="contained"
					>
						Run on Emulator
					</Button>
				</div>
				<GitCard
					forks={selectedProduct.forksRepo}
					git={selectedProduct.linkRepo}
					watchers={selectedProduct.watchersRepo}
				/>
				<ContentCard />
			</Grid>
			<Grid
				direction="column"
				item
			>
				<AppFrame
					expired={expired}
					runApp={run}
					src={src}
				/>
			</Grid>
		</Grid>
	);
};

Product.propTypes = {
};

const mapStateToProps = (state) => {
	return {
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
