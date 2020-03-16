import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Typography, Avatar, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { addComment, selectProduct } from 'actions/index';

const defaultPic = require('../../../assets/defaultPic.png');

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: '20px',
		marginTop: '20px',
		padding: '7px'
	},
	row: {
		marginTop: '12px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	icon: {
		color: '#66788A',
		margin: '10px',
		fontSize: '50px'
	},
	commentList: {
		marginTop: '15px'
	},
	commentCard: {
		boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
		padding: '7px',
		borderRadius: '5px',
		display: 'flex',
		alignItems: 'center',
		marginTop: '7px',
		marginBottom: '7px'
	},
	user: {
		color: '#3F51B5'
	},
	date: {
		color: 'grey',
		marginLeft: '5px',
		fontSize: '12px'
	},
	head: {
		display: 'flex',
		alignItems: 'baseline',
		marginBottom: '15px'
	},
	addComment: {
		marginTop: '15px',
		display: 'flex',
		alignItems: 'flex-end'
	},
	input: {
		marginRight: '10px',
		width: '60%'
	}
}));

const CommentsCard = (props) => {
	const { className, selectedProduct, history, user, handleComment, handleProduct, data, ...rest } = props;
	const classes = useStyles();

	useEffect(
		() => {
			handleProduct(data[selectedProduct.id]);
		},
		[ data ]
	);

	const comments = selectedProduct.comments;

	const [ comment, setComment ] = useState('');

	const onChange = (event) => {
		setComment(event.target.value);
	};

	const submitComment = () => {
		if (user) {
			handleComment(user.email, comment, selectedProduct);
		} else {
			history.replace('/sign-in');
		}
	};

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardContent>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
					<Typography align="left" variant="h3">
						Comments
					</Typography>
					<div className={classes.addComment}>
						<TextField
							multiline
							value={comment}
							className={classes.input}
							onChange={onChange}
							variant="outlined"
							label="Add comment"
						/>
						<Button variant="outlined" color="primary" onClick={submitComment}>
							{' '}
							Add Comment{' '}
						</Button>
					</div>
					<div className={classes.commentList}>
						{comments &&
							Object.keys(comments).map((i) => (
								<div key={i} className={classes.commentCard}>
									<Avatar
										alt="Person"
										className={classes.icon}
										src={
											//user.photoURL ? user.photoURL :
											defaultPic
										}
									/>
									<div className={classes.content}>
										<div className={classes.head}>
											<Typography className={classes.user} align="left" variant="h4">
												{comments[i].user}
											</Typography>
											<Typography className={classes.date} align="left">
												{comments[i].date}
											</Typography>
										</div>
										<Typography className={classes.comment} align="left">
											{comments[i].description}
										</Typography>
									</div>
								</div>
							))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const mapStateToProps = (state) => {
	return {
		selectedProduct: state.selectedProduct,
		user: state.auth.user,
		data: state.data
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleComment: (user, description, product) => dispatch(addComment(user, description, product)),
		handleProduct: (product) => dispatch(selectProduct(product))
	};
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(CommentsCard);
