import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, CircularProgress, Button } from '@material-ui/core';
import { ProductsToolbar, ProductCard, InfiniteList } from './components';
import { fetchData, setActiveFilter } from 'actions';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3)
	},
	categoryTitle: {
		fontSize: 22,
		marginBottom: 20,
		marginTop: 29
	},
	content: {
		marginTop: theme.spacing(2)
	},
	product: {
		maxHeight: '400px'
	},
	pagination: {
		marginTop: theme.spacing(3),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	loader: {
		position: 'fixed',
		bottom: '10px',
		right: '5px'
	},
	filter: {
		cursor: 'pointer',
		fontWeight: 'bold',
		width: '30px'
	}
}));

const ProductList = ({ fetchData, data, activeFilter, setActiveFilter, searchData }) => {
	const classes = useStyles();

	useEffect(
		() => {
			fetchData();
		},
		[ data ]
	);

	const onClearFilters = () => {
		setActiveFilter('');
	};

	const filterData = (data, filter) => {
		let filtered = data.filter((product) => {
			let title = product.title.toLowerCase().search(filter) !== -1;
			return title;
		});
		return filtered;
	};

	const featured = data.slice(0, 4);
	const listData = data.slice(0, 300);
	const filteredResults = activeFilter ? listData.filter((product) => product.tags.includes(activeFilter)) : listData;
	const searchResults = searchData ? filterData(data, searchData) : filteredResults;

	return (
		<div className={classes.root}>
			<ProductsToolbar />
			<div className={classes.content}>
				{!activeFilter &&
				!searchData && (
					<React.Fragment>
						<Typography className={classes.categoryTitle}>Featured Flutter Projects</Typography>
						<Grid container p={5} spacing={1}>
							{featured.map((product, index) => (
								<Grid className={classes.product} item key={product.id} sm={3} xs={6}>
									<ProductCard product={product} />
								</Grid>
							))}
						</Grid>
					</React.Fragment>
				)}
				<Typography className={classes.categoryTitle}>
					{!activeFilter && !searchData ? 'Recent' : `Results found: ${searchResults.length}`}
				</Typography>
				{activeFilter && (
					<Button classname={classes.filter} onClick={() => onClearFilters()}>
						<CloseIcon color="primary" size="small" />
						<Typography color="primary">{activeFilter}</Typography>
					</Button>
				)}
				<InfiniteList data={searchResults} />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		data: state.data,
		activeFilter: state.activeFilter,
		searchData: state.searchData
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: () => dispatch(fetchData()),
		setActiveFilter: (filter) => dispatch(setActiveFilter(filter))
	};
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ProductList);
