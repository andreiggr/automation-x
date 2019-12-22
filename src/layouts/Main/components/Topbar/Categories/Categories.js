import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FilterButton from '../FilterButton/FilterButton';

const Categories = (props) => {
	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-between'
		}
	}));
	const { className, categories, ...rest } = props;
	const classes = useStyles();

	return <div className={classes.root}>{categories.map((category) => <FilterButton category={category} />)}</div>;
};
export default Categories;
