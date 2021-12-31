import React, {Dispatch, SetStateAction, useEffect} from 'react'
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import LetterCell from './LetterCell';

interface LetterGridProps {
    letters: Array<string>,
    centerLetter: string,
    currentWord: Array<string>,
    setCurrentWord: Dispatch<SetStateAction<Array<string>>>;
}

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '35vh'
    }
}))

function LetterGrid(props: LetterGridProps) {
    const classes = useStyles();

    const addLetter = (cellNumber: number) => {
        props.setCurrentWord([...props.currentWord, props.letters[cellNumber]]);
    }

    return (
        <Box className={classes.root}>
            {props.letters.map((letter, index) => {
                return (
                    <LetterCell key={index} cellNumber={index} letter={letter} onClick={addLetter} />
                )
            })}
        </Box>
    )
}


export default LetterGrid

