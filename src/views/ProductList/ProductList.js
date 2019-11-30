import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import { ProductsToolbar, ProductCard } from './components';
import mockData from './data';
import { fetchData } from 'actions';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3)
	},
	categoryTitle: {
		fontSize: 22,
		marginBottom: 29,
		marginTop: 29
	},
	content: {
		marginTop: theme.spacing(2)
	},
	pagination: {
		marginTop: theme.spacing(3),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end'
	}
}));

const ProductList = ({ fetchData }) => {
	useEffect(() => {
		fetchData();
	}, []);
	const classes = useStyles();

	const [ products ] = useState(mockData);

	return (
		<div className={classes.root}>
			<ProductsToolbar />
			<div className={classes.content}>
				<Typography className={classes.categoryTitle}>Featured Flutter Projects</Typography>
				<Grid container spacing={1}>
					{products.map((product) => (
						<Grid item key={product.id} sm={3} xs={6}>
							<ProductCard product={product} />
						</Grid>
					))}
				</Grid>
				<Typography className={classes.categoryTitle}>Recent</Typography>
				<Grid container spacing={1}>
					{products.map((product) => (
						<Grid item key={product.id} sm={3} xs={6}>
							<ProductCard product={product} />
						</Grid>
					))}
				</Grid>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		data: state.data
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: () => dispatch(fetchData())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
