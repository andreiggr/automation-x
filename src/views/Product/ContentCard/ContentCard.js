import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import { Link } from 'react-router-dom';
import Iframe from 'react-iframe';
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
    content: {
        marginTop: '12px',
        display: 'flex',
        alignItems: 'center',
    },
    iframe: {
        height: '450px'
    }

}));

const ContentCard = props => {
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
                    variant="h3"
                >
                    Flutter Layout Grid
                </Typography>
                <div className={classes.content}>
                    <Iframe
                        className={classes.iframe}
                        url="http://github.com/mitesh77/Best-Flutter-UI-Templates/blob/master/README.md"
                    />
                </div>
            </CardContent>
        </Card>
    );
};

ContentCard.propTypes = {
    className: PropTypes.string,
    product: PropTypes.object.isRequired
};

export default ContentCard;
