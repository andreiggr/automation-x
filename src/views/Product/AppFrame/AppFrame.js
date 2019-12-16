import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
    appFrame: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '50px'
    },
}));



const AppFrame = ({ src, runApp }) => {

    const [timer, setTimer] = useState(30)

    setInterval(() => {
        setTimer(timer - 1);
        console.log(timer)
    }, 1000);

    const classes = useStyles();
    return (

        <div className={classes.appFrame}>
            {runApp &&
                <iframe
                    frameBorder="0"
                    height="650px"
                    scrolling="no"
                    src={src}
                    width="300px"
                />}
            {!runApp &&
                <iframe
                    frameBorder="0"
                    height="650px"
                    scrolling="no"
                    width="300px"
                />}
        </div>
    )
}
export default AppFrame;