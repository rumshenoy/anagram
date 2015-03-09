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

    findSimilar(word:string): {} {
        var similarWords = {};
        var keys = Object.keys(this.wordDict);
        var toMatch = this.keyFrom(word);
        for (var key in keys) {
            var s = this.stringSubtract(toMatch, keys[key]);
            if((s).length == 1 && keys[key].length == word.length + 1){
                similarWords[s] = this.wordDict[keys[key]];
            }
        }
        return similarWords;
    }

    stringSubtract(first:string, second:string): string{
        for(var i=0; i < first.length; i++){
            second = second.replace(first[i], "");
        }
        return second;
    }

}