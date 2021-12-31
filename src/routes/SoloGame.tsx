import React, {useEffect, useState, useCallback, useRef} from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ProgressSlider from '../components/ProgressSlider';
import WordsList from '../components/WordsList';
import WordInput from '../components/WordInput';
import AlertSection from '../components/AlertSection';
import LetterGrid from '../components/LetterGrid';
import ControlButtons from '../components/ControlButtons';
import { filterWords, isValidPangram, isValidNoun, isValidAdj, filterNounsOrAdjs } from '../WordPOSUtils';

interface BooleanDict {
    // Key is word, value is if it has been found yet
    [key: string|number]: boolean
}

interface NumberDict {
    // Key is word, value is if it has been found yet
    [key: string|number]: number
}

const isLetter = (c: string) => {
    return c.toLowerCase() !== c.toUpperCase();
}

const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const shuffle = (array: Array<string>) => {
    let currentIndex = array.length,  randomIndex;
    
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

function SoloGame() {
    const currTimeoutID = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [letters, setLetters] = useState<Array<string>>([]);
    const [centerLetter, setCenterLetter] = useState<string>('');
    const [score, setScore] = useState<number>(0);
    const [rank, setRank] = useState<number>(0);
    const [allWords, setAllWords] = useState<BooleanDict>({});
    const [wordScores, setWordScores] = useState<NumberDict>({});
    const [maxScore, setMaxScore] = useState<number>(0);
    const [foundWords, setFoundWords] = useState<Array<string>>([]);
    const [currentWord, setCurrentWord] = useState<Array<string>>([]);
    const [alertMessage, setAlertMessage] = useState<string>('');

    const updateAlertMessage = useCallback((message: string) => {
        if (currTimeoutID.current) {
            clearTimeout(currTimeoutID.current);
        }
        setAlertMessage(message);
        currTimeoutID.current = setTimeout(() => setAlertMessage(''), 3000);
    }, []);

    const enterWord = useCallback(() => {
        // Create current word from its character array
        const currentWordString = currentWord.join('');

        // Check if word is valid and if it hasn't been found
        if (allWords.hasOwnProperty(currentWordString) && !allWords[currentWordString]) {
            const wordScore = wordScores[currentWordString];
            // Increase overall score, add word as found, set it as found in allWords
            setScore(s => s + wordScore);
            setFoundWords([...foundWords, capitalizeFirstLetter(currentWordString)]);
            updateAlertMessage(wordScore === currentWordString.length + 9 ? `Pangram! +${wordScore}` : `Keep it up! +${wordScore}`);
            allWords[currentWordString] = true;
        } else if (!currentWord.every(letter => letters.includes(letter))) {
            updateAlertMessage('Invalid letters!')
        } else if (currentWord.length < 4) {
            updateAlertMessage('Words must be at least 4 letters long!')
        } else if (allWords[currentWordString]) {
            updateAlertMessage('You\'ve already found this word!')
        } else if (!currentWord.includes(centerLetter)) {
            updateAlertMessage('Words must include the center letter!')
        }
        setCurrentWord([]);

    }, [allWords, currentWord, foundWords, centerLetter, letters, wordScores, updateAlertMessage]);

    const onKeydown = useCallback((event: KeyboardEvent) => {
        // Check if key was a valid letter
        if(currentWord.length < 16 && event.key.length === 1 && isLetter(event.key)) {
            setCurrentWord([...currentWord, event.key.toLowerCase()]);
        } 
        // Delete last letter
        else if (event.key === 'Backspace') {
            setCurrentWord(currentWord.slice(0, -1));
        }
        // Enter current word
        else if (event.key === 'Enter') {
            enterWord();
        }
    }, [currentWord, enterWord]);

    const adjustLetters = (letters: Array<string>) => {
        // If first letter in shuffled array is a vowel, that can be our center letter
        if (['a', 'e', 'i', 'o', 'u'].indexOf(letters[0].toLowerCase()) === -1) {
            return letters;
        } else {
            // Otherwise, find first consonant, move it to front of array, and return it as center letter
            for (let i = 1; i < letters.length; i++) {
                if (['a', 'e', 'i', 'o', 'u'].indexOf(letters[i].toLowerCase()) === -1) {
                    [letters[0], letters[i]] = [letters[i], letters[0]];
                    return letters;
                }
            }
            return letters;
        }
    }

    const generatePangram = async () => {
        // ^(?:([a-rt-z])(?!.*\1))*$
        const pangramResponse = await fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true&letterPattern=%5E(%3F%3A(%5Ba-rt-z%5D)(%3F!.*%5C1))*%24&letters=9&frequencyMin=2.0', {
            'method': 'GET',
            'headers': {
                'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
                'x-rapidapi-key': `${process.env.REACT_APP_WORDS_API_KEY!}`
            }
        })  
        const pangramData = await pangramResponse.json();
        console.log(pangramData);
        return pangramData.word;
    }

    const generateLettersAndAnswers = async () => {
        let pangram = await generatePangram();
        let validPangram = await isValidPangram(pangram);

        while (!validPangram) {
            pangram = await generatePangram();
            validPangram = await isValidPangram(pangram);
        }

        // Convert string to Set first to remove duplicates, then back to Array
        const letters = adjustLetters(shuffle(Array.from(new Set(pangram.split('')))));
        setLetters(letters);
        setCenterLetter(letters[0]);

        const answersResponse = await fetch(`https://wordsapiv1.p.rapidapi.com/words/?letterPattern=%5E(%3F%3D%5B${pangram}%5D%7B4%2C%7D%24)%5B${pangram}%5D*${letters[0]}%5B${pangram}%5D*%24&limit=1000&frequencyMin=1.5`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                "x-rapidapi-key": `${process.env.REACT_APP_WORDS_API_KEY!}`
            }
            })
        const answersData = await answersResponse.json();
        
        if (answersData.results.data) {
            const unfilteredWords = answersData.results.data.join(' ')
            const filteredWords = await filterWords(unfilteredWords, letters.join(''));
            setAllWords(filteredWords.words as BooleanDict);
            setWordScores(filteredWords.scores as NumberDict);
            setMaxScore(filteredWords.maxScore);
            setLoaded(true);
        } 
    }

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        generateLettersAndAnswers();
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', onKeydown);
        return () => {
            window.removeEventListener('keydown', onKeydown);
        };
    }, [onKeydown]);

    const shuffleLetters = () => {
        // Keep first letter (the center letter) in the same position and shuffle the rest of them
        setLetters([letters[0]].concat(shuffle(letters.slice(1))));
    }

    const deleteLetter = () =>  {
        if (currentWord) {
            setCurrentWord(currentWord.slice(0, currentWord.length-1));
        }
    }

    return (
        <Box className='gameRoot'>
            <Stack
                direction='column'
                spacing={4}
                sx={{width: '85%', paddingY: '5%'}}
            >
                <Stack spacing={2} alignItems='center'>
                    <ProgressSlider score={score}/>
                    <Typography variant='h6' color='white' sx={{marginTop: '8px!important'}}>Rank {rank} | 50 points until Rank {rank+1}</Typography>
                </Stack>
                <WordsList foundWords={foundWords}/>
                <AlertSection message={alertMessage} />
                <WordInput letters={letters} centerLetter={centerLetter} currentWord={currentWord} />
                {loaded 
                    ? <LetterGrid letters={letters} centerLetter={centerLetter} currentWord={currentWord} setCurrentWord={setCurrentWord} />
                    : <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '35vh'}}><CircularProgress size='4rem'/></Box>
                }
                <ControlButtons shuffleLetters={shuffleLetters} deleteLetter={deleteLetter} enterWord={enterWord}/>
            </Stack>
        </Box>
    )
}

export default SoloGame

