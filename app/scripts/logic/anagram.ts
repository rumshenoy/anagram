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

    findSimilar(word:string):{} {
        var similarWords = {};
        var keys = Object.keys(this.wordDict);
        var toMatch = word === undefined ? "" : this.keyFrom(word);
        if (toMatch != "") {
            for (var key in keys) {
                var toTest = keys[key];
                var s = this.stringSubtract(toMatch, toTest);
                if ((s).length == 1 && toTest.length == word.length + 1) {
                    similarWords[s] = this.wordDict[toTest];
                }
            }
        }
        return similarWords;
    }

    stringSubtract(first:string, second:string):string {
        for (var i = 0; i < first.length; i++) {
            second = second.replace(first[i], "");
        }
        return second;
    }

}