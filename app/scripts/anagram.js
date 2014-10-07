var Anagram = (function () {
    function Anagram(wordList) {
        this.wordList = wordList;
    }
    Anagram.prototype.unscramble = function (word) {
        var answer = new Array();
        for (var i = 0; i < this.wordList.length; i++) {
            if (this.keyFrom(word) === this.keyFrom(this.wordList[i])) {
                answer.push(this.wordList[i]);
            }
        }
        return answer;
    };

    Anagram.prototype.keyFrom = function (word) {
        return word.split("").sort().join("");
    };
    return Anagram;
})();
//# sourceMappingURL=anagram.js.map
