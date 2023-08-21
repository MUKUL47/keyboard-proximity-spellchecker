import wordsDataset from "./words-dataset.json";
class SpellChecker {
  private readonly keyboardProximityMap: Record<string, string[]> = {
    q: ["q", "w", "a"],
    w: ["w", "q", "e", "a", "s"],
    e: ["e", "w", "r", "s", "d"],
    r: ["r", "e", "t", "d", "f"],
    t: ["t", "r", "y", "f", "g"],
    y: ["y", "t", "u", "g", "h"],
    u: ["u", "y", "i", "h", "j"],
    i: ["i", "u", "o", "j", "k"],
    o: ["o", "i", "p", "k", "l"],
    p: ["p", "o", "l"],
    a: ["a", "q", "w", "s", "z"],
    s: ["s", "q", "w", "e", "a", "d", "z", "x"],
    d: ["d", "w", "e", "r", "s", "f", "x", "c"],
    f: ["f", "e", "r", "t", "d", "g", "c", "v"],
    g: ["g", "r", "t", "y", "f", "h", "v", "b"],
    h: ["h", "t", "y", "u", "g", "j", "b", "n"],
    j: ["j", "y", "u", "i", "h", "k", "n", "m"],
    k: ["k", "u", "i", "o", "j", "l", "m"],
    l: ["l", "i", "o", "p", "k"],
    z: ["z", "a", "s", "x"],
    x: ["x", "s", "d", "c", "z"],
    c: ["c", "d", "f", "v", "x"],
    v: ["v", "f", "g", "b", "c"],
    b: ["b", "g", "h", "n", "v"],
    n: ["n", "h", "j", "m", "b"],
    m: ["m", "j", "k", "n"],
  };
  private trie: Record<string, any>;

  constructor() {
    this.trie = {};
    wordsDataset.forEach((word) =>
      this.iterateTrie(word.toLowerCase().split(""), this.trie)
    );
  }

  private iterateTrie(chars: string[], t: Record<string, any>, idx = 0): void {
    const c = chars[idx++];
    if (!c) return;
    if (t[c]) {
      if (typeof t[c] === "boolean" && chars[idx]) {
        t[c] = {};
      }
      this.iterateTrie(chars, t[c], idx);
    } else {
      t[c] = !chars[idx] ? { _: true } : {};
      this.iterateTrie(chars, t[c], idx);
    }
  }

  public suggestCorrections(wrongSentence: string[]): Record<string, string[]> {
    const suggestions: Record<string, string[]> = {};
    wrongSentence.forEach((word) => {
      word = word.toLowerCase();
      if (this.isValidWord(word)) return;
      const chars = word.split("") as string[];
      const permutationStrs: Array<string[]> = chars.map(
        (char) => this.keyboardProximityMap[char] ?? []
      );
      const permuations = this.getStrPermuation(permutationStrs);
      suggestions[word] = permuations.filter((s) => this.isValidWord(s));
    });
    return suggestions;
  }

  private isValidWord(word: string, i = 0, t = this.trie): boolean {
    const c = word[i];
    if (word.length - 1 === i && !!t[c]?.["_"]) return true;
    if (t[c]) return this.isValidWord(word, i + 1, t[c]);
    return false;
  }

  private getStrPermuation(strs) {
    const finalPermuation = [];
    function iterate(i = 0, v = "") {
      const nodes = [];
      const nextNode = strs[i + 1];
      strs[i].forEach((s) => {
        if (!nextNode) {
          finalPermuation.push(v + s);
          return;
        }
        nodes.push(v + s);
      });
      if (!nextNode) return;
      nodes.forEach((node) => iterate(i + 1, node));
    }
    iterate();
    return Array.from(new Set(finalPermuation));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const spellChecker = new SpellChecker();
  const inputField = document.getElementById("inputField") as HTMLInputElement;
  const suggestButton = document.getElementById("suggestButton");
  const suggestionsDiv = document.getElementById(
    "suggestionsInput"
  ) as HTMLTextAreaElement;

  suggestButton?.addEventListener("click", () => {
    const input = inputField?.value?.trim();
    if (input) {
      const sentence = input.split(" ");
      const suggestions = spellChecker.suggestCorrections(sentence);
      suggestionsDiv.value = JSON.stringify(suggestions, null, 5);
    }
  });
});
