import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { SearchInput } from 'components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
	uiFilters,
	mediaFilters,
	componentsFilters,
	appsFilters,
	elementsFilters,
	menuFilters,
	inputFilters
} from './filterData';
import { setActiveFilter, setSearchData } from 'actions';

const useStyles = makeStyles((theme) => ({
	root: { marginBottom: 100 },
	formControl: {
		margin: theme.spacing(1),
		minWidth: 95
	},
	row: {
		height: '42px',
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		marginTop: theme.spacing(1)
	},
	spacer: {
		flexGrow: 1
	},
	importButton: {
		marginRight: theme.spacing(1)
	},
	exportButton: {
		marginRight: theme.spacing(1)
	},
	searchInput: {
		marginRight: theme.spacing(1),
		height: '36px',
		maxWidth: '200px'
	}
}));

const ProductsToolbar = (props) => {
	const { className, setActiveFilter, setSearchData, searchData, activeFilter, ...rest } = props

	const [uiFilter, setUiFilter] = useState('');
	const [mediaFilter, setMediaFilter] = useState('');
	const [componentsFilter, setComponentsFilter] = useState('');
	const [appFilter, setAppFilter] = useState('');
	const [elementsFilter, setElementsFilter] = useState('');
	const [menuFilter, setMenuFilter] = useState('');
	const [inputFilter, setInputFilter] = useState('');

	const classes = useStyles();

	const onSearch = (data) => {
		const searchData = data.toLowerCase();
		resetFilters();
		setSearchData(searchData);
	};

	const resetFilters = () => {
		setUiFilter('');
		setMediaFilter('');
		setComponentsFilter('');
		setAppFilter('');
		setElementsFilter('');
		setMenuFilter('');
		setInputFilter('');
		setActiveFilter('');
	};

	return (
		<div
			{...rest}
			className={clsx(classes.root, className)}
		>
			<div className={classes.row}>
				<FormControl className={classes.formControl}>
					<InputLabel id="UI">UI</InputLabel>
					<Select
						labelId="UI"
						onChange={(event) => {
							resetFilters();
							setSearchData('');
							setActiveFilter(event.target.value);
							setUiFilter(event.target.value);
						}}
						value={uiFilter}
					>
						{uiFilters.map((item, i) => (
							<MenuItem
								index={i}
								value={item}
							>
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl className={classes.formControl}>
					<InputLabel id="media">Media</InputLabel>
					<Select
						labelId="media"
						onChange={(event) => {
							resetFilters();
							setSearchData('');
							setActiveFilter(event.target.value);
							setMediaFilter(event.target.value);
						}}
						value={mediaFilter}
					>
						{mediaFilters.map((item, i) => (
							<MenuItem
								index={i}
								value={item}
							>
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl className={classes.formControl}>
					<InputLabel id="el">Elements</InputLabel>
					<Select
						labelId="el"
						onChange={(event) => {
							resetFilters();
							setSearchData('');
							setActiveFilter(event.target.value);
							setElementsFilter(event.target.value);
						}}
						value={elementsFilter}
					>
						{elementsFilters.map((item, i) => (
							<MenuItem
								index={i}
								value={item}
							>
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl className={classes.formControl}>
					<InputLabel id="input">Input</InputLabel>
					<Select
						labelId="input"
						onChange={(event) => {
							resetFilters();
							setSearchData('');
							setActiveFilter(event.target.value);
							setInputFilter(event.target.value);
						}}
						value={inputFilter}
					>
						{inputFilters.map((item, i) => (
							<MenuItem
								index={i}
								value={item}
							>
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl className={classes.formControl}>
					<InputLabel id="menu">Menu</InputLabel>
					<Select
						labelId="menu"
						onChange={(event) => {
							resetFilters();
							setSearchData('');
							setActiveFilter(event.target.value);
							setMenuFilter(event.target.value);
						}}
						value={menuFilter}
					>
						{menuFilters.map((item, i) => (
							<MenuItem
								index={i}
								value={item}
							>
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl className={classes.formControl}>
					<InputLabel id="COMP">Components</InputLabel>
					<Select
						labelId="COMP"
						onChange={(event) => {
							resetFilters();
							setSearchData('');
							setActiveFilter(event.target.value);
							setComponentsFilter(event.target.value);
						}}
						value={componentsFilter}
					>
						{componentsFilters.map((item, i) => (
							<MenuItem
								index={i}
								value={item}
							>
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl className={classes.formControl}>
					<InputLabel id="APPS">Apps</InputLabel>
					<Select
						labelId="APPS"
						onChange={(event) => {
							resetFilters();
							setSearchData('');
							setActiveFilter(event.target.value);
							setAppFilter(event.target.value);
						}}
						value={appFilter}
					>
						{appsFilters.map((item, i) => (
							<MenuItem
								index={i}
								value={item}
							>
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<span className={classes.spacer} />
				<SearchInput
					className={classes.searchInput}
					onChange={(event) => onSearch(event.target.value)}
					placeholder="Search product"
					value={searchData}
				/>
				<Link to="/upload">
					<Button
						color="primary"
						variant="contained"
					>
						Add product
					</Button>
				</Link>
			</div>
		</div>
	);
};

ProductsToolbar.propTypes = {
	className: PropTypes.string
};

const mapStateToProps = (state) => {
	return {
		activeFilter: state.activeFilter,
		searchData: state.searchData
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setActiveFilter: (activeFilter) => dispatch(setActiveFilter(activeFilter)),
		setSearchData: (searchData) => dispatch(setSearchData(searchData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsToolbar);
