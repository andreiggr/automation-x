import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import ReactMarkdown from 'react-markdown';
import MarkdownGithub from 'react-markdown-github';
import { Card, CardContent, Typography } from '@material-ui/core';
import Axios from 'axios';
import { Image, ImageOrLink } from './Image';
import selectedProduct from 'reducers/selectedProduct';

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: '20px',
		marginTop: '20px',
		padding: '7px'
	},
	content: {
		marginTop: '12px',
		display: 'flex',
		alignItems: 'center'
	},
	markdown: {
		width: '700px'
	}
}));

const ContentCard = (props) => {


	const { className, git, title, ...rest } = props;

	const classes = useStyles();

	const [markdown, setMarkdown] = useState('');

	const rawGit = git.split('github').join('raw.githubusercontent') + '/master';
	const rawReadme = rawGit + '/README.md';

	useEffect(() => {
		Axios.get(rawReadme).then((res) => setMarkdown(res.data));
	}, []);

	const transformImageUri = (input) => (/^https?:/.test(input) ? input : `${rawGit}/${input}`);

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}
		>
			<CardContent>
				<Typography
					align="center"
					variant="h2"

				>
					{title}
				</Typography>
				<div className={classes.content}>
					<MarkdownGithub
						className={classes.markdown}
						renderers={{ image: Image }}
						skipHtml
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

export default ContentCard;
