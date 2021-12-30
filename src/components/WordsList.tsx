import React, {useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMore from '@mui/icons-material/ExpandMore';
import makeStyles  from '@mui/styles/makeStyles';
import '../App.css';

interface WordsListProps {
    foundWords: Array<string>
}

const useStyles = makeStyles(() => ({
    accordionRoot: {
        minHeight: 0,
        borderRadius: 4,
        backgroundColor: 'white',
        marginTop: '12px!important',
        "&$expanded": {
            margin: 0,
            minHeight: 0
        }
    },
    summaryContent: {
        width: '100%'
    },
    accordionDetailsRoot: {
        maxHeight: '60vh', 
        textAlign: 'left', 
        paddingX: '4px',
        marginBottom: '8px',
        overflow: 'scroll'
    },
    recentWordsContainer: {
        display: 'flex',
        maxWidth: '100%',
        margin: '0 8px',
        overflow: 'hidden'
    },
    wordContainer: {
        width: '100%',
        marginTop: 6,
        borderBottom: '1px solid rgb(233, 233, 233)',
        overflow: 'hidden'
    }
  }));

function WordsList(props: WordsListProps) {
    const classes = useStyles();

    const alphabetizedWords = [...props.foundWords].sort();

    const [expanded, setExpanded] = useState<boolean>(false);

    const handleChange = () => (event: React.SyntheticEvent) => {
        setExpanded(!expanded);
      };

    return (
        <Accordion classes={{root: classes.accordionRoot}} expanded={expanded} onChange={handleChange()}>
            <AccordionSummary
                expandIcon={<ExpandMore htmlColor='black'/>}
                classes={{content: classes.summaryContent}}
            >
                {expanded 
                    ?   <Typography variant='body2' color='black'>You have found {props.foundWords.length} words</Typography>
                    :   <Box className={classes.recentWordsContainer}>
                            {props.foundWords.slice(0).reverse().map((word, index) => {
                                return (
                                    <Typography key={index} variant='body2' color='black' sx={{marginRight: 1}}>{word}</Typography> 
                                )
                            })}
                        </Box>
                }
            </AccordionSummary>
            <AccordionDetails classes={{root: classes.accordionDetailsRoot}}>
                <Grid container direction='row' sx={{maxHeight: '100%'}} spacing={2}>
                    <Grid container item direction='column' xs={6} sm={6} md={6} sx={{paddingTop: '0!important' }}>
                        {alphabetizedWords.slice(0, Math.ceil(alphabetizedWords.length / 2)).map((word, index) => {
                            return (
                                <Box key={index} className={classes.wordContainer}>
                                    <Typography variant='body2' color='black'>{word}</Typography> 
                                </Box>
                            )
                        })}
                    </Grid>
                    <Grid container item direction='column' xs={6} sm={6} md={6} sx={{paddingTop: '0!important' }}>
                        {alphabetizedWords.slice(Math.ceil(alphabetizedWords.length / 2)).map((word, index) => {
                            return (
                                <Box key={index} className={classes.wordContainer}>
                                    <Typography key={index} variant='body2' color='black'>{word}</Typography> 
                                </Box>
                            )
                        })}
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default WordsList

