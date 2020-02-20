import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, CircularProgress, Button } from '@material-ui/core';
import { ProductsToolbar, ProductCard, InfiniteList } from './components';
import { fetchData, setActiveFilter, setSearchData } from 'actions';
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

const ProductList = ({ fetchData, data, activeFilter, setActiveFilter, searchData, setSearchData }) => {
	const classes = useStyles();

	useEffect(() => {
		fetchData();
		onClearFilters();
		onClearSearch();
	}, []);

	const onClearFilters = () => {
		setActiveFilter('');
	};

	const onClearSearch = () => {
		setSearchData('');
	};

	const featured = data.slice(0, 4);
	const filteredResults = activeFilter ? data.filter((product) => product.tags ? product.tags.includes(activeFilter) : "") : data;
	const searchResults = searchData ? data.filter((product) => { let res = product.title.toLowerCase().search(searchData) !== -1; return res; }) : filteredResults;

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
		setActiveFilter: (filter) => dispatch(setActiveFilter(filter)),
		setSearchData: (searchData) => dispatch(setSearchData(searchData))
	};
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ProductList);
