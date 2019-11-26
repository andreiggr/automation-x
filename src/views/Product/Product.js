import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import { ProductsToolbar } from '../ProductList/components';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { GitCard } from './GitCard';
import { ContentCard } from './ContentCard';

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

const gitURL = 'https://github.com/mitesh77/Best-Flutter-UI-Templates'


const Product = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ProductsToolbar />
            <div className={classes.content}>
                <Grid
                    container
                    direction="row"
                    spacing={3}
                    xs={12}
                >
                    <Grid
                        container
                        direction="column"
                        xs={7}
                    >
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
                        <GitCard git={gitURL} />
                        <ContentCard git={gitURL} />
                    </Grid>
                    <Grid
                        alignContent="center"
                        container
                        direction="column"
                        xs={5}
                    >
                        <div style={{}}>
                            <img
                                src={phoneImg}
                                style={{ maxHeight: '900px' }}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Product;
