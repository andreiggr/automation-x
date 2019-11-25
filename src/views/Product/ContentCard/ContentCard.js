import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import ReactMarkdown from 'react-markdown';
import MarkdownGithub from 'react-markdown-github';
import {
    Card,
    CardContent,
    Typography,
} from '@material-ui/core';
import Axios from 'axios';
import Image from './Image';


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
    markdown: {
        width: '850px'
    }

}));

// const ImageOrLink = props => {
//     if (props.href.match(/\.(jpe?g|png|gif)$/)) {
//         return <img src={props.href} />
//     }

//     return <a href={props.href}>{props.children}</a>
// }

const ContentCard = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const [markdown, setMarkdown] = useState('')

    useEffect(() => {
        Axios.get('https://raw.githubusercontent.com/mitesh77/Best-Flutter-UI-Templates/master/README.md')
            .then((res) => setMarkdown(res.data))
    }, [])

    //const gitMarkdown = 'https://api.github.com/mitesh77';
    // /repos/:owner/:repo/MarkdownGithubwn).then(res => console.log(res))

    const transformImageUri = input =>
        /^https?:/.test(input)
            ? input
            : `https://raw.githubusercontent.com/mitesh77/Best-Flutter-UI-Templates/master/${input}`


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
                    {/* <MarkdownRender /> */}
                    <ReactMarkdown
                        className={classes.markdown}
                        escapeHtml={false}
                        renderers={{ image: Image }}
                        source={markdown}
                        transformImageUri={(uri) => transformImageUri(uri)}
                        transformLinkUri={(src) => transformImageUri(src)}
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
