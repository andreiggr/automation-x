import React from 'react';
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

const phoneImg = require('../../assets/phone.png');

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

const Product = ({ selectedProduct }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<Grid
					container
					direction="row"
					spacing={3}
					xs={12}
				>
					<Grid
						container
						direction="column"
						xs={7}
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
								variant="contained"
							>
								Run on Emulator
							</Button>
						</div>
						<GitCard git={selectedProduct.linkRepo} />
						<ContentCard git={selectedProduct.linkRepo} />
					</Grid>
					<Grid
						alignContent="center"
						container
						direction="column"
						xs={5}
					>
						<div style={{}}>
							<img
								src={phoneImg}
								style={{ maxHeight: '900px' }}
							/>
						</div>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

Product.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		selectedProduct: state.selectedProduct
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		selectProduct: (product) => dispatch(selectProduct(product))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
