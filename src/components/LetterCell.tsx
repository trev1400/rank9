import React from 'react'
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

interface LetterCellProps {
    cellNumber: number,
    letter: string,
    onClick: (cellNumber: number) => void
}

const getCellPosition = (cellNumber: number):string => {
    switch(cellNumber) {
        case 0:
            return 'translate(0%, 0%)';
        case 1:
            return 'translate(0%, -110%)';
        case 2:
            return 'translate(110%, -110%)';
        case 3:
            return 'translate(110%, 0%)';
        case 4:
            return 'translate(110%, 110%)';
        case 5:
            return 'translate(0%, 110%)';
        case 6:
            return 'translate(-110%, 110%)';
        case 7:
            return 'translate(-110%, 0%)';
        case 8:
            return 'translate(-110%, -110%)';
        default:
            return 'translate(0%, 0%)';
    }
}

const useStyles = makeStyles(() => ({
    root: {
        position: 'absolute',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: (props: LetterCellProps) => getCellPosition(props.cellNumber),
        cursor: 'pointer',
        '&:hover': {
            opacity: '80%'
        }
    }, 
    square: {
        height: '5.2rem',
        width: '5.2rem',
        backgroundColor: (props: LetterCellProps) => props.cellNumber === 0 ? '#6CDCFF' : 'white',
    },
    letter: {
        position: 'absolute',
        color: 'black',
        fontSize: '2rem',
        fontWeight: 700
    }
}));


function LetterCell(props: LetterCellProps) {
    const classes = useStyles(props);

    const handleOnClick = () => {
        props.onClick(props.cellNumber)
    }

    return (
        <div className={classes.root} onClick={handleOnClick} >
                <div className={classes.square}/> 
                <Typography component='span' className={classes.letter}>{props.letter.toUpperCase()}</Typography>
        </div>
    )
}


export default LetterCell

