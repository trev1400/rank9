import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

interface WordInputProps {
    letters: Array<string>,
    centerLetter: string,
    currentWord: Array<string>,
}

const useStyles = makeStyles(() => ({
    wordInputContainer: {
        fontSize: '1.75rem',
        width: '100%',
        textTransform: 'uppercase',
    },
    wordInputContent: {
        height: '100%',
        display: 'inline-block',
        position: 'relative',
        minWidth: 1,
        '&:after': {
            content: "''",
            display: 'inline-block',
            position: 'absolute',
            top: -2,
            width: 2,
            height: '100%',
            marginLeft: 4,
            background: '#6CDCFF',
            animation: '$cursor-blink 1000ms steps(2) infinite'
        }
    },
    "@keyframes cursor-blink": {
        '0%': {
            opacity: 0
        }
    },
    letter: {
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: '2rem'
    }
  }));

function WordInput(props: WordInputProps) {
    const classes = useStyles();

    const getLetterColor = (letter: string) => {
        if (letter === props.centerLetter) {
            return '#6CDCFF'
        } else if (props.letters.includes(letter)) {
            return 'white'
        } else {
            return '#808080'
        }
    }

    return (
        <Box className={classes.wordInputContainer}>
            <Box className={classes.wordInputContent}>
                {props.currentWord.map((letter, index) => {
                    const color = getLetterColor(letter);
                    return (
                        <Typography component='span' key={index} className={classes.letter} style={{color}}>{letter}</Typography>
                    )
                })}
            </Box>
        </Box>
    )
}

export default WordInput

