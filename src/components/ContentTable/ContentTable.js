import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Grid,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import mockData from './data';
import { StatusBullet } from 'components';

const phoneImage = "../../assets/phone.png";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 30
    },
    content: {
        padding: 0
    },
    inner: {
        minWidth: 800
    },
    statusContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    status: {
        marginRight: theme.spacing(1)
    },
    actions: {
        justifyContent: 'flex-end'
    }
}));

const statusColors = {
    delivered: 'success',
    pending: 'info',
    refunded: 'danger'
};

const ContentTable = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const [data] = useState(mockData);

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
            >
                <CardHeader
                    title="Build Processes"
                />
                <Typography variant="body2" color="textSecondary" component="p">
                    3200 total
                 </Typography>
            </Grid>
            <Divider />
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Process</TableCell>
                                    <TableCell>Duration</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map(order => (
                                    <TableRow
                                        hover
                                        key={order.id}
                                    >
                                        <TableCell>{order.customer.name}</TableCell>
                                        <TableCell>
                                            {moment(order.createdAt).format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell>
                                            <div className={classes.statusContainer}>
                                                <StatusBullet
                                                    className={classes.status}
                                                    color={statusColors[order.status]}
                                                    size="sm"
                                                />
                                                {order.status}
                                            </div>
                                        </TableCell>
                                        <TableCell><MoreVertIcon /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
                <Button
                    color="primary"
                    size="small"
                    variant="text"
                >
                    View all <ArrowRightIcon />
                </Button>
            </CardActions>
            
        </Card>
    );
};

ContentTable.propTypes = {
    className: PropTypes.string
};

export default ContentTable;
