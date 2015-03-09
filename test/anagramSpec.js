/// <reference path="../lib/jasmine.d.ts"/>
/// <reference path="../app/scripts/logic/anagram.ts"/>
describe('Anagram tests', function () {
    describe("should unscramble", function () {
        it("single words", function () {
            var anagram = new Anagram(["apple", "simple"]);
            expect(anagram.unscramble("leppa")).toEqual(["apple"]);
            expect(anagram.unscramble("emplis")).toEqual(["simple"]);
        });
        it("multiple words", function () {
            var anagram = new Anagram(["door", "odor"]);
            expect(anagram.unscramble("rood")).toEqual(["door", "odor"]);
        });
        it("handles missing output", function () {
            var anagram = new Anagram(["door", "odor"]);
            expect(anagram.unscramble("blah")).toEqual([]);
            expect(anagram.unscramble("")).toEqual([]);
        });
        it("handles undefined input", function () {
            var anagram = new Anagram(["door", "odor"]);
            expect(anagram.unscramble(undefined)).toEqual([]);
        });
    });
    it("makes key from word", function () {
        var anagram = new Anagram(["apple"]);
        expect(anagram.keyFrom("apple")).toEqual("aelpp");
    });
    it("should save make dictionary in constructor", function () {
        var anagram = new Anagram(["apple", "simple"]);
        expect(anagram.wordDict).toNotBe(null);
        expect(anagram.wordDict["aelpp"]).toEqual(["apple"]);
        expect(anagram.wordDict["eilmps"]).toEqual(["simple"]);
    });
    describe("should make dictionary with keys", function () {
        it("for one to one mappings", function () {
            var anagram = new Anagram(["apple", "simple"]);
            var keys = Object.keys(anagram.wordDict);
            expect(keys.length).toBe(2);
            var expectedKeys = ["aelpp", "eilmps"];
            for (var i = 0; i < expectedKeys.length; i++) {
                expect(keys.indexOf(expectedKeys[i]) !== -1).toBe(true);
            }
        });
        it("for one to many mappings", function () {
            var anagram = new Anagram(["odor", "door", "easel", "lease"]);
            var keys = Object.keys(anagram.wordDict);
            expect(keys.length).toBe(2);
            var expectedKeys = ["door", "aeels"];
            for (var i = 0; i < expectedKeys.length; i++) {
                expect(keys.indexOf(expectedKeys[i]) !== -1).toBe(true);
            }
            var doorWords = ["odor", "door"];
            var aeelsWords = ["easel", "lease"];
            expect(anagram.wordDict["door"]).toEqual(doorWords);
            expect(anagram.wordDict["aeels"]).toEqual(aeelsWords);
        });
    });
    describe("should give suggestions", function () {
        it("which have just one character more than the input word", function () {
            var anagram = new Anagram(["horse", "sores", "scores"]);
            expect(anagram.findSimilar("rose")).toEqual({ 'h': ["horse"], 's': ["sores"] });
        });
        it("ignore words that have more than one character than the input word", function () {
            var anagram = new Anagram(["bores", "stored", "scores", "aroused"]);
            expect(anagram.findSimilar("rose")).toEqual({ 'b': ["bores"] });
        });
        it("handling null input", function () {
            var anagram = new Anagram(["bores", "stored", "scores", "aroused"]);
            expect(anagram.findSimilar("")).toEqual({});
        });
        it("handling undefined input", function () {
            var anagram = new Anagram(["bores", "stored", "scores", "aroused"]);
            expect(anagram.findSimilar(undefined)).toEqual({});
        });
    });
    describe("should subtract two strings", function () {
        it("by first occurrence of characters of the first word", function () {
            var anagram = new Anagram([]);
            expect(anagram.stringSubtract("rose", "rosefrose")).toEqual("frose");
        });
        it("which are equal and return nothing", function () {
            var anagram = new Anagram([]);
            expect(anagram.stringSubtract("rose", "rose")).toEqual("");
        });
        it("which are empty", function () {
            var anagram = new Anagram([]);
            expect(anagram.stringSubtract("", "")).toEqual("");
        });
        it("which are undefined", function () {
            var anagram = new Anagram([]);
            expect(anagram.stringSubtract(undefined, undefined)).toEqual(undefined);
        });
    });
});
//# sourceMappingURL=anagramSpec.js.map