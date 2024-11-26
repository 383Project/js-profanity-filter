const words = require("./data/words.json");

const findAndFilter = (
    sentence,
    placeholder = "*",
    languages = ['en'],
    allowed_words = [],
    myList = []
) => {
    const selected_languages = [];
    try {
        let found = [];
        //find sweras according to selected languages
        for (let i = 0; i < languages.length; i++) {
            if (words[languages[i]] === undefined) {
                console.warn(`Language ${languages[i]} not found`);
                continue;
            } else {
                selected_languages.push(languages[i]);
            }

            let language = languages[i];
            found = [
                ...found,
                ...words[language].filter((e) => sentence.toLowerCase().includes(e)),
            ];
            found = [
                ...found,
                ...myList.filter((e) => sentence.toLowerCase().includes(e)),
            ];
        }
        //sort founded words by length
        found.sort((a, b) => b.length - a.length);
        //crete a spoiler for each founded word with same length and return the result
        if (found.length !== 0) {
            for (let i = 0; i < found.length; i++) {
                if (!allowed_words.includes(found[i])) {
                    const spoilString = new Array(found[i].length)
                        .fill(placeholder)
                        .join("");
                    sentence = sentence.replaceAll(
                        new RegExp(found[i], "gi"),
                        spoilString
                    );
                }
            }
            return {
                found: true,
                selected_languages,
                bad_words: found,
                filtered_sentence: sentence,
                allowed_words: allowed_words,
            };
        }
        //if there is no swear in the sentence return false
        return {
            found: false,
        };
    } catch (error) {
        console.warn("error in findAndFilter", error);
        throw error;
    }
};

module.exports = {
    findAndFilter,
};