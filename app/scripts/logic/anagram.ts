class Anagram {
    wordDict:{};

    constructor(wordList:Array<string>) {
        this.makeDictFrom(wordList);
    }

    makeDictFrom(wordList:Array<string>) {
        this.wordDict = {};
        for (var i = 0; i < wordList.length; i++) {
            var word = wordList[i];
            var key = this.keyFrom(word);
            if (key in this.wordDict) {
                this.wordDict[key].push(word);
            } else {
                this.wordDict[key] = [word];
            }
        }
    }

    unscramble(word:string):Array<string> {
        var answer = word === undefined ? [] : this.wordDict[this.keyFrom(word)];
        return answer === undefined ? [] : answer;
    }

    keyFrom(word:string):string {
        return word.split("").sort().join("");
    }

    findSimilar(word:string):Array<string> {
        var similarWords = [];
        var keys = Object.keys(this.wordDict);
        var toMatch = this.keyFrom(word);
        for (var key in keys) {
            var toTest = keys[key];
            if (toTest.indexOf(toMatch) > -1 && toTest != toMatch && toTest.length == toMatch.length + 1) {
                similarWords.push(keys[key]);
            }
        }
        return similarWords;
    }

    giveSuggestions(word:string):{} {
        var result = {};
        var similarWords = this.findSimilar(word);
        for (var w in similarWords) {
            var letter = this.subtractString(similarWords[w], this.keyFrom(word));
            result[letter] = this.wordDict[similarWords[w]];
        }
        return result;
    }

    subtractString(str1, str2) {
        var pos = str1.indexOf(str2);
        if (pos == -1) {
            return str1;
        }
        else {
            var result = str1.substr(0, pos) + str1.substr(pos + str2.length);
            return result;
        }
    }
}