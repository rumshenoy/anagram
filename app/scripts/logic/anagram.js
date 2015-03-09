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
        var similarWords = {};
        var keys = Object.keys(this.wordDict);
        var toMatch = this.keyFrom(word);
        for (var key in keys) {
            var s = this.stringSubtract(toMatch, keys[key]);
            if ((s).length == 1 && keys[key].length == word.length + 1) {
                similarWords[s] = this.wordDict[keys[key]];
            }
        }
        return similarWords;
    };
    Anagram.prototype.stringSubtract = function (first, second) {
        for (var i = 0; i < first.length; i++) {
            second = second.replace(first[i], "");
        }
        return second;
    };
    return Anagram;
})();
//# sourceMappingURL=anagram.js.map