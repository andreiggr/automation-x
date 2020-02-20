import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { SearchInput } from 'components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { filters } from './filterData';
import { setActiveFilter, setSearchData } from 'actions';
import Categories from 'layouts/Main/components/Topbar/Categories/Categories';

const useStyles = makeStyles((theme) => ({
	root: {},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 95
	},
	row: {
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
	const { className, user, setActiveFilter, setSearchData, searchData, activeFilter, ...rest } = props;

	const classes = useStyles();

	const [search, setSearch] = useState('');

	const onSearch = (data) => {
		const searchData = data.toLowerCase().replace(/[^a-zA-Z]/g, '');
		setActiveFilter('');
		setSearch(data);
		setSearchData(searchData);
	};
	var answer = '5A';
	answer = answer.replace(/[^a-zA-Z]/g, '');

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<div className={classes.row}>
				<Categories categories={filters} />
				<span className={classes.spacer} />
				<SearchInput
					className={classes.searchInput}
					onChange={(event) => onSearch(event.target.value)}
					placeholder="Search product"
					value={search}
				/>
				<Link to={user ? "" : "/sign-in"}>
					<Button color="primary" variant="contained">
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
		searchData: state.searchData,
		user: state.auth.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setActiveFilter: (activeFilter) => dispatch(setActiveFilter(activeFilter)),
		setSearchData: (searchData) => dispatch(setSearchData(searchData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsToolbar);
