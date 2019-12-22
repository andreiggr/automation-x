import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { setActiveFilter, setSearchData } from 'actions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const FilterButton = (props) => {
	const useStyles = makeStyles((theme) => ({
		root: {
			position: 'relative',
			display: 'flex',
			alignItems: 'center'
		}
	}));
	const { className, category, setActiveFilter, setSearchData, ...rest } = props;

	const classes = useStyles();
	const [ open, setOpen ] = useState(false);

	const [ anchorEl, setAnchorEl ] = useState('');

	const a = [ 1, 2, 3, 4 ];

	const onMenuOpen = (e) => {
		setOpen(true);
		setAnchorEl(e.target);
	};

	const { id, items } = category;

	const onSetFilter = (filter) => {
		setSearchData('');
		setActiveFilter(filter);
	};

	return (
		<div className={classes.root}>
			<Button
				aria-owns={open ? 'simple-menu' : null}
				aria-haspopup="true"
				onMouseOver={(e) => onMenuOpen(e)}
				onMouseOut={() => setOpen(false)}
			>
				{id}
				<ExpandMoreIcon />
			</Button>
			<Menu
				className={classes.menu}
				id="simple-menu"
				anchorEl={anchorEl}
				open={open}
				MenuListProps={{
					onMouseEnter: () => setOpen(true),
					onMouseLeave: () => setOpen(false)
				}}
			>
				{items.map((item, index) => (
					<MenuItem onClick={() => onSetFilter(item)} key={index}>
						{item}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterButton);
