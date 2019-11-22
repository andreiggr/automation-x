import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';
import { ProductsToolbar } from '../ProductList/components';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const phoneImg = require('../../assets/phone.png');

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    categoryTitle: {
        fontSize: 22,
        marginBottom: 29,
        marginTop: 29
    },
    content: {
        marginTop: theme.spacing(2)
    },
    pagination: {
        marginTop: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    backButton: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
    },
    contentBar: {
        display: 'flex',
        flexDirection: 'row',
        height: '42px',
        justifyContent: 'space-between'
    }
}));

const Product = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ProductsToolbar />
            <div className={classes.content}>
                <div className={classes.contentBar}>
                    <div className={classes.backButton}>
                        <ArrowBackIosIcon fontSize="small" />
                        <Typography className={classes.categoryTitle}>Project Name</Typography>
                    </div>
                    <Button
                        color="primary"
                        variant="contained"
                    >
                        Run on Emulator
                    </Button>
                </div>
                <div style={{}}>
                    <img style={{ maxHeight: "900px" }}
src={phoneImg}
alt="" />
                </div>
            </div>


        </div>
    );
};

export default Product;
