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

export const isValidNoun = async (word) => {
    const response = await wordpos.lookupNoun(word);
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

const filterNounsOrAdjs = async (words, areNouns) => {
    let filteredWords = [];
    for (const w of words) {
        if (areNouns ? await isValidNoun(w) : await isValidAdj(w)) {
            filteredWords.push(w);
        }
    }
    return filteredWords;
}

export const filterWords = async (words) => {
    // First, remove any bad words
    const filteredWords = filter.clean(words);

    // Then, get the parts-of-speech of the words and filter the nouns and adjectives
    const response = await wordpos.getPOS(filteredWords);
    const filteredNouns = await filterNounsOrAdjs(response.nouns, true);
    const filteredAdjs = await filterNounsOrAdjs(response.adjectives, false);
    console.log(response);

    // Construct array of filtered words and then turn that array into a dictionary where the key
    // is the word and the value is whether it has been found yet
    const wordsArr = response.adverbs.concat(filteredAdjs, filteredNouns, response.verbs);
    const wordsDict = wordsArr.reduce((acc, curr) => (acc[curr] = false, acc), {});
    console.log(wordsDict, Object.keys(wordsDict).length);

    return wordsDict;
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
    return true;
}

