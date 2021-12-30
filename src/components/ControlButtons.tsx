import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';

interface ControlButtonsProps {
    shuffleLetters: () => void,
    deleteLetter: () => void,
    enterWord: () => void
}

const useStyles = makeStyles(() => ({
    button: {
        fontWeight: 600,
        fontSize: '1.1rem',
        color: 'black',
        backgroundColor: 'white',
        padding: '8px 12px',
        '&:hover': {
            cursor: 'pointer',
            opacity: '80%',
            backgroundColor: 'white'
        }
    },
    middleButton: {
        margin: '0 24px',
    }
}));

function ControlButtons(props: ControlButtonsProps) {
    const classes = useStyles();

    const handleShuffle = () => {
        props.shuffleLetters();
    }

    const handleDelete = () => {
        props.deleteLetter();
    }

    const handleEnter = () => {
        props.enterWord();
    }

    return (
        <Box>
            <Button className={classes.button} onClick={handleDelete}>Delete</Button>
            <Button className={`${classes.button} ${classes.middleButton}`} onClick={handleShuffle}>Shuffle</Button>
            <Button className={classes.button} onClick={handleEnter}>Enter</Button>
        </Box>
    )
}

export default ControlButtons

