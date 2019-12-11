import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { SearchInput } from 'components';
import { Link } from 'react-router-dom';

import { uiFilters, mediaFilters, componentsFilters, appsFilters, elementsFilters, menuFilters, inputFilters } from './filterData';

const useStyles = makeStyles(theme => ({
  root: { marginBottom: 100 },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 95,
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

const ProductsToolbar = props => {
  const { className, ...rest } = props;

  const [uiFilter, setUiFilter] = useState('');
  const [mediaFilter, setMediaFilter] = useState('');
  const [componentsFilter, setComponentsFilter] = useState('');
  const [appFilter, setAppFilter] = useState('');
  const [elementsFilter, setElementsFilter] = useState('');
  const [menuFilter, setMenuFilter] = useState('');
  const [inputFilter, setInputFilter] = useState('');


  const classes = useStyles();

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
            onChange={(event) => setUiFilter(event.target.value)}
            value={uiFilter}
          >
            {uiFilters.map(item =>
              <MenuItem value={item}>{item}</MenuItem>

            )}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="media">Media</InputLabel>
          <Select
            labelId="media"
            onChange={(event) => setMediaFilter(event.target.value)}
            value={mediaFilter}
          >
            {mediaFilters.map(item =>
              <MenuItem value={item}>{item}</MenuItem>

            )}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="el">Elements</InputLabel>
          <Select
            labelId="el"
            onChange={(event) => setElementsFilter(event.target.value)}
            value={elementsFilter}
          >
            {elementsFilters.map(item =>
              <MenuItem value={item}>{item}</MenuItem>

            )}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="input">Input</InputLabel>
          <Select
            labelId="input"
            onChange={(event) => setInputFilter(event.target.value)}
            value={inputFilter}
          >
            {inputFilters.map(item =>
              <MenuItem value={item}>{item}</MenuItem>

            )}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="menu">Menu</InputLabel>
          <Select
            labelId="menu"
            onChange={(event) => setMenuFilter(event.target.value)}
            value={menuFilter}
          >
            {menuFilters.map(item =>
              <MenuItem value={item}>{item}</MenuItem>

            )}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="COMP">Components</InputLabel>
          <Select
            labelId="COMP"
            onChange={(event) => setComponentsFilter(event.target.value)}
            value={componentsFilter}
          >
            {componentsFilters.map(item =>
              <MenuItem value={item}>{item}</MenuItem>

            )}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="APPS">Apps</InputLabel>
          <Select
            labelId="APPS"
            onChange={(event) => setAppFilter(event.target.value)}
            value={appFilter}
          >
            {appsFilters.map(item =>
              <MenuItem value={item}>{item}</MenuItem>

            )}
          </Select>
        </FormControl>
        <span className={classes.spacer} />
        <SearchInput
          className={classes.searchInput}
          placeholder="Search product"
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

export default ProductsToolbar;
