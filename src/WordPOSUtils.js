/* eslint-disable no-undef */

let Filter = require('bad-words');
const filter = new Filter();

let wordpos = new WordPOS({
    dictPath: 'https://cdn.jsdelivr.net/npm/wordpos-web@1.0.2/dict',
    profile: true,
    preload: true,
    debug: true,
});

const isProperNoun = (wordInfo) => {
    return wordInfo.lemma.charAt(0) === wordInfo.lemma.charAt(0).toUpperCase();
} 

const getWordScore = (word, letters) => {
    // Check if word has all letters, in which case score it as a pangram
    if (new Set(word).size === new Set(word + letters).size) {
        return word.length + 9;
    } 
    // If word isn't a pangram, it's score is its length - 3 (which maps 4 letter words to 1, 5 letter words to 2, etc.)
    else {
        return word.length - 3;
    }
};

export const isValidNoun = async (word) => {
    const response = await wordpos.lookupNoun(word);
    // console.log(response);
    for (const def of response) {
        // Handles country currencies
        if (def.lexName.endsWith('quantity') && def.def.toLowerCase() !== def.def) {
            return false;
        }
        // If any of the word's definitions aren't proper nouns, it's valid
        else if (!isProperNoun(def)) {
            return true;
        } 
    }
    // If we reach here, all of the word's definitions are proper nouns or there are no definitions
    return false;
}

export const isValidAdj = async (word) => {
    const response = await wordpos.lookupAdjective(word);
    for (const def of response) {
        // If any of the word's definitions aren't proper nouns/related to proper nouns, it's valid
        if (!isProperNoun(def)) {
            return true;
        } 
    }
    // If we reach here, all of the word's definitions are proper nouns/related to proper nounrs or there are no definitions
    return false;
}

export const filterNounsOrAdjs = async (words, areNouns) => {
    let filteredWords = [];
    for (const w of words) {
        if (areNouns ? await isValidNoun(w) : await isValidAdj(w)) {
            filteredWords.push(w);
        }
    }
    return filteredWords;
}

export const filterWords = async (words, letters) => {
    // First, remove any bad words
    const filteredWords = filter.clean(words);

    // Then, get the parts-of-speech of the words and filter the nouns and adjectives
    const response = await wordpos.getPOS(filteredWords);
    const filteredNouns = await filterNounsOrAdjs(response.nouns, true);
    const filteredAdjs = await filterNounsOrAdjs(response.adjectives, false);

    // Construct array of filtered words and then turn that array into a dictionary where the key
    // is the word and the value is whether it has been found yet
    const wordsArr = response.adverbs.concat(filteredAdjs, filteredNouns, response.verbs);

    let wordsDict = {};
    let scoresDict = {};
    let maxScore = 0;
    for (const word of wordsArr) {
        wordsDict[word] = false;
        const score = getWordScore(word, letters);
        scoresDict[word] = score;
        maxScore += score;
    }
    console.log(wordsDict, Object.keys(wordsDict).length);
    console.log(scoresDict, Object.keys(scoresDict).length);
    console.log(maxScore);

    return {words: wordsDict, scores: scoresDict, maxScore: maxScore};
}

export const isValidPangram = async (pangram) => {
    const response = await wordpos.getPOS(pangram);
    // If it's a noun, make sure it's a valid one
    if (response.nouns.length !== 0) {
        return isValidNoun(pangram);
    }
    if (response.adjectives.length !== 0) {
        return isValidAdj(pangram);
    }
    // If it's not a noun, make sure that it's also either an adjective, adverb, or verb
    return response.rest.length === 0;
}

