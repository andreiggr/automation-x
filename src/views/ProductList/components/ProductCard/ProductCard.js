import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardActions, Typography, Grid, Divider } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectProduct } from 'actions';
import data from 'views/Dashboard/components/LatestOrders/data';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '350px'
	},
	imageContainer: {
		height: 100,
		width: 100,
		margin: '0 auto',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: '5px',
		overflow: 'hidden',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		marginBottom: 10
	},
	image: {
		width: '100%'
	},
	statsItem: {
		display: 'flex',
		alignItems: 'center'
	},
	statsIcon: {
		color: theme.palette.icon,
		marginRight: theme.spacing(1)
	}
}));

const ProductCard = (props) => {
	const { className, selectProduct, product, ...rest } = props;

	const classes = useStyles();

	const productRoute = `/product/${product.id}`;

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardContent>
				<Link to={productRoute} className={classes.imageContainer} onClick={() => selectProduct(product)}>
					<img alt="Product" className={classes.image} src={product.imageUrl} />
				</Link>
				<Link to={productRoute} onClick={() => selectProduct(product)}>
					<Typography align="center" gutterBottom style={{ cursor: 'pointer' }} variant="h4">
						{product.title}
					</Typography>
				</Link>
				<Typography align="center" variant="body1">
					{product.description}
				</Typography>
			</CardContent>
			<Divider />
			<CardActions>
				<Grid container justify="space-between">
					<Grid className={classes.statsItem} item>
						<AccessTimeIcon className={classes.statsIcon} />
						<Typography display="inline" variant="body2">
							Updated 2hr ago
						</Typography>
					</Grid>
					<Grid className={classes.statsItem} item>
						<GetAppIcon className={classes.statsIcon} />
						<Typography display="inline" variant="body2">
							{product.totalDownloads} Downloads
						</Typography>
					</Grid>
				</Grid>
			</CardActions>
		</Card>
	);
};

ProductCard.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
