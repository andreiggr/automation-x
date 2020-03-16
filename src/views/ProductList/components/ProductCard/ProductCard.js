import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardActions, Typography, Grid, Divider } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectProduct } from 'actions';
import data from 'views/Dashboard/components/LatestOrders/data';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		maxWidth: '350px',
		'&:hover': {
			boxShadow: '0px 0px 2px 1px #3F51B5'
		}
	},
	imageContainer: {
		height: 200,
		margin: '0 auto',
		borderRadius: '5px',
		overflow: 'hidden',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		marginBottom: 10,
		boxShadow: '0 0 20px 3px lightgrey'
	},
	statsItem: {
		display: 'flex',
		alignItems: 'center'
	},
	statsIcon: {
		color: theme.palette.icon,
		marginRight: theme.spacing(1)
	},
	title: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		display: '-webkit-box',
		webkitBoxOriend: 'vertical',
		webkitLineClamp: 2,
		height: 50
	},
	statusTag: {
		position: 'absolute'
	},
	buildSuccess: {
		background: '#10C95A',
		width: '20px',
		borderRadius: '30px',
		marginRight: '10px'
	},
	buildFailed: {
		background: 'red',
		width: '20px',
		borderRadius: '30px',
		marginRight: '10px'
	},
	buidStatus: {
		position: 'absolute',
		top: '20px',
		background: '#F5F5F5',
		right: '20px',
		display: 'flex',
		padding: '5px',
		borderRadius: '10px'
	}
}));

const ProductCard = (props) => {
	const { className, selectProduct, product, ...rest } = props;

	const classes = useStyles();

	const productRoute = `/product/${product.id}`;

	var title = product.title.length < 45 ? product.title : product.title.substring(0, 45) + '..';

	const hasBuild = product.appId === 'null' ? false : true;

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardContent>
				<Link to={productRoute} className={classes.imageContainer} onClick={() => selectProduct(product)}>
					<img alt="Product" className={classes.image} src={product.imageUrl} />
				</Link>
				<Link to={productRoute} onClick={() => selectProduct(product)}>
					<div className={classes.title}>
						<Typography align="center" variant="h4">
							{title}
						</Typography>
					</div>
				</Link>
				<div className={classes.buidStatus}>
					<div className={hasBuild ? classes.buildSuccess : classes.buildFailed} />
					<Typography variant="h6">Build {hasBuild ? 'success' : 'failed'}</Typography>
				</div>
			</CardContent>
			<Divider />
			<CardActions>
				<Grid container justify="space-between">
					<Grid className={classes.statsItem} item>
						<AccessTimeIcon className={classes.statsIcon} />
						<Typography display="inline" variant="body2">
							{product.date.toLowerCase()}
						</Typography>
					</Grid>
					<Grid className={classes.statsItem} item>
						<CallSplitIcon className={classes.statsIcon} />
						<Typography display="inline" variant="body2">
							{product.forksRepo} Forks
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
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		selectProduct: (product) => dispatch(selectProduct(product))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
