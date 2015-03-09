var Anagram = (function () {
    function Anagram(wordList) {
        this.makeDictFrom(wordList);
    }
    Anagram.prototype.makeDictFrom = function (wordList) {
        this.wordDict = {};
        for (var i = 0; i < wordList.length; i++) {
            var word = wordList[i];
            var key = this.keyFrom(word);
            if (key in this.wordDict) {
                this.wordDict[key].push(word);
            }
            else {
                this.wordDict[key] = [word];
            }
        }
    };
    Anagram.prototype.unscramble = function (word) {
        var answer = word === undefined ? [] : this.wordDict[this.keyFrom(word)];
        return answer === undefined ? [] : answer;
    };
    Anagram.prototype.keyFrom = function (word) {
        return word.split("").sort().join("");
    };
    Anagram.prototype.findSimilar = function (word) {
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
    };
    Anagram.prototype.giveSuggestions = function (word) {
        var result = {};
        var similarWords = this.findSimilar(word);
        for (var w in similarWords) {
            var letter = this.subtractString(similarWords[w], this.keyFrom(word));
            result[letter] = this.wordDict[similarWords[w]];
        }
        return result;
    };
    Anagram.prototype.subtractString = function (str1, str2) {
        var pos = str1.indexOf(str2);
        if (pos == -1) {
            return str1;
        }
        else {
            var result = str1.substr(0, pos) + str1.substr(pos + str2.length);
            return result;
        }
    };
    return Anagram;
})();
//# sourceMappingURL=anagram.js.map