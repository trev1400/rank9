import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

interface AlertSectionProps {
    message: string
}

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginTop: '12px!important',
        height: '5vh'
    },
    alertRoot: {
        borderRadius: '4px',
        padding: '8px 12px',
        backgroundColor: '#6CDCFF',
        color: 'black'
    }
}));

function AlertSection(props: AlertSectionProps) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            {props.message !== '' && 
                <Box className={classes.alertRoot}>
                    <Typography variant='subtitle2'>{props.message}</Typography>
                </Box>
            }
        </Box>
    )
}

export default AlertSection

