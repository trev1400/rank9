/* eslint-disable no-undef */

let wordpos = new WordPOS({
    dictPath: 'https://cdn.jsdelivr.net/npm/wordpos-web@1.0.2/dict',
    profile: true,
    preload: true,
    debug: true,
});

export const lookupNoun = async (word) => {
    await wordpos.lookupNoun(word, console.log);
}

export const filterWords = async (words) => {
    const response = await wordpos.getPOS(words);
    const wordsArr = response.adjectives.concat(response.adverbs, response.nouns, response.verbs);
    const wordsDict = wordsArr.reduce((acc, curr) => (acc[curr] = false, acc), {});
    console.log(wordsDict);
    return wordsDict;
}

export const isValidPangram = async (pangram) => {
    const response = await wordpos.getPOS(pangram);
    return response.rest.length === 0;
}

