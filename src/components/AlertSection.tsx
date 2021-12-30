import React from 'react'
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
    root: {
        marginTop: '12px!important',
        height: '5vh'
    }
}));

function AlertSection(props: any) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            
        </Box>
    )
}

export default AlertSection

