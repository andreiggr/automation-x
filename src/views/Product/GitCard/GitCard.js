import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Divider
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
        margin: '8px',
        cursor: 'pointer'
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    }
}));

const GitCard = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardContent>
                <Typography
                    align="left"
                    variant="h6"
                >
                    GitHub
                </Typography>

                <div className={classes.row}>
                    <div className={classes.link}>
                        <GitHubIcon className={classes.icon} />
                        <Link> github.com/blablabla </Link>
                    </div>
                    <div>
                        <VisibilityIcon className={classes.icon} />
                        <CallSplitIcon className={classes.icon} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

GitCard.propTypes = {
    className: PropTypes.string,
    product: PropTypes.object.isRequired
};

export default GitCard;
