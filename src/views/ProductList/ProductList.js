import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import { ProductsToolbar, ProductCard } from './components';
import { fetchData } from 'actions';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';

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

const ProductList = ({ fetchData, data, activeFilter, searchData }) => {

	const [dataLimit, setDataLimit] = useState(12);

	useEffect(
		() => {
			fetchData();
		},
		[data]
	);

	const fetchMoreData = () => {
		setTimeout(() => {
			setDataLimit(dataLimit + 8)
		}, 300);
	}

	const classes = useStyles();

	const filterData = (data, searchData) => {
		data.filter(product => {
			let title = product.title.toLowerCase();
			return title.indexOf(
				searchData.toLowerCase()) !== -1
		})
	}

	const featured = data.slice(0, 4);
	const recent = data.slice(0, dataLimit);
	const filteredResults = activeFilter ? recent.filter(product => product.tags.includes(activeFilter)) : recent;
	const searchResults = searchData ? filterData(data, searchData) : filteredResults;


	return (
		<div className={classes.root}>
			<ProductsToolbar />
			<button onClick={() => console.log(data)}>konsole</button>
			<div className={classes.content}>
				{!activeFilter &&
					<React.Fragment>
						<Typography className={classes.categoryTitle}>Featured Flutter Projects</Typography>
						<Grid
							container
							spacing={1}
						>
							{featured.map(
								(product, index) =>
									<Grid
										item
										key={product.id}
										key={index}
										sm={3}
										xs={6}
									>
										<ProductCard product={product} />
									</Grid>
							)}
						</Grid>
					</React.Fragment>
				}
				<Typography className={classes.categoryTitle}>{activeFilter ? 'Results' : 'Recent'}</Typography>
				<Grid
					container
					spacing={1}
				>
					<InfiniteScroll
						dataLength={filteredResults.length}
						hasMore
						next={fetchMoreData}
						style={{ minWidth: '1000px', display: 'flex', flexWrap: 'wrap' }}
					>

						{filteredResults.map(
							(product) =>
								<Grid
									item
									key={product.id}
									sm={3}
									xs={6}
								>
									<ProductCard product={product} />
								</Grid>
						)}
					</InfiniteScroll>
				</Grid>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		data: state.data,
		activeFilter: state.activeFilter,
		searchData: state.searchData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: () => dispatch(fetchData())
	};
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ProductList);
