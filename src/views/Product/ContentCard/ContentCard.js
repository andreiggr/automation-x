import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import MarkdownGithub from 'react-markdown-github';
import { Card, CardContent, Typography } from '@material-ui/core';
import Axios from 'axios';
import { Image, ImageOrLink } from './Image';
import { connect } from 'react-redux';
import CodeBlock from './CodeBlock/CodeBlock';

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: '20px',
		marginTop: '20px',
	},
	content: {
		display: 'flex',
		padding: '0 20px',
		justifyContent: 'center'
	},
	markdown: {
		fontFamily: "Roboto",
		display: 'flex',
		flexDirection: 'column',
		'& a': {
			color: '#3F51B5',
			textDecoration:"none"
		},
		'& .headline-primary': {
			paddingBottom: '5px',
			borderBottom: '1px solid #eaecef',
			marginBottom: '20px',
			marginTop: '20px'
		},
		'& img': {
			marginTop: "10px",
			marginBottom: "10px",
			maxWidth:"100%"
		}
	}
}));

const ContentCard = (props) => {
	const { className, selectedProduct, ...rest } = props;

	const classes = useStyles();

	const [markdown, setMarkdown] = useState('');

	const { rawGit, rawReadme, title } = selectedProduct;

	useEffect(() => {
		Axios.get(rawReadme).then((res) => setMarkdown(res.data))
	}, []);

	const transformImageUri = (input) => (input.includes('http') ? input : `${rawGit}/${input}`);

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}
		>
			<CardContent>
				<div className={classes.content}>
					<MarkdownGithub
						className={classes.markdown}
						escapeHtml={false}
						skipHtml= {false}
						renderers={{
							image: Image,
							code: CodeBlock,
							link: ImageOrLink
						}}
						source={markdown}
						sourceUri={rawReadme}
						transformImageUri={({ uri }) => transformImageUri(uri)}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

ContentCard.propTypes = {
	className: PropTypes.string,
	git: PropTypes.string
};

const mapStateToProps = (state) => {
	return {
		selectedProduct: state.selectedProduct
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		//selectProduct: (product) => dispatch(selectProduct(product))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentCard);
