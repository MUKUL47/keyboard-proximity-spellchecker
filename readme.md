# Spell Checker

**Project Demo:** [Try it out here](https://mukul47.github.io/keyboard-proximity-spellchecker/)

The Spell Checker is a JavaScript implementation that suggests corrections for misspelled words by utilizing keyboard proximity and a trie-based approach.

## How it Works

### Keyboard Proximity Map

The spell checker starts with a pre-defined `keyboardProximityMap` that maps each key on a QWERTY keyboard to its neighboring keys. This map is crucial for generating suggestions based on neighboring keystrokes.

### Dataset Processing

The spell checker is equipped with a dataset of valid words. These words are processed to construct a trie data structure, which enables efficient word validation.

### Trie Data Structure

The trie, a tree-like structure, represents the valid words in a way that makes it easy to validate whether a given word is in the dataset. It is constructed by breaking down each word into characters and organizing them into nodes, ensuring efficient word validation.

### Suggestion Generation

1. **Input**: Users enter a sentence with intentional spelling mistakes.
2. **Processing**: The spell checker processes each word in the input sentence.
3. **Permutation Computation**: For each misspelled word, the spell checker generates permutations of characters based on the keyboard proximity map. It includes characters from neighboring keys and the original character itself.
4. **Word Validation**: The generated permutations are validated against the trie data structure to identify valid suggestions for misspelled words.
5. **Suggestions**: Valid suggestions are collected and presented as possible corrections for the misspelled word.

## Usage

1. Open the provided `index.html` file in a web browser.
2. Enter a sentence with intentional spelling mistakes.
3. Click the "Get Suggestions" button to see suggested corrections for misspelled words based on neighboring keystrokes.
