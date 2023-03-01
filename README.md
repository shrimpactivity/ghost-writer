![GhostWriter Logo](./src/assets/readme-logo.png)

GhostWriter provides a simple browser interface for co-writing with public domain authors. While writing, the app continuously provides text suggestion sourced from the selected author's work. 

Additional texts (or *ghosts*, as they're referred to in the app) can be searched and downloaded from [Project Gutenberg](https://www.gutenberg.org/), an online library of free e-books. The text is then processed into a usable abstract data structure with my [suggestion-machine](https://github.com/shrimpactivity/suggestion-machine) Node.js package. 

This is a front-end application built with React.js. For the backend api, see https://github.com/shrimpactivity/ghostwriter-api

## Features

- real-time text suggestion computed from a seed text and the user's writing
- custom browser text editor
- Express.js backend
  - suggestion api for texts located on server
  - api for searching/retrieving texts from Project Gutenberg
  - and more!
- custom JWT user authentication
- save/load user compositions with MongoDB integration
- client side routing with [React Router](https://reactrouter.com/en/main)
- local storage state persistence
- Goober, the ghost mascot

## Planned Features
- more advanced suggestion algorithm for better coherence
- better text parser to allow non-alphabetic characters in suggestions 

## Suggestion Algorithm

First, texts are processed into a sequence of alphabetic tokens. Non-alphabetic characters and extra whitespace are removed for the sake of simplicity, however in future updates I would like to utilize more complex regular expressions to include punctuation. 

Using [suggestion-machine](https://github.com/shrimpactivity/suggestion-machine), the tokens are used to create a graph with two edge types: strong and weak. The below image visualizes an example graph for the seed sequence: `[the, dog, and, the, cat, are, the, best, friends, and, how]`

![Graph visualization](/src/assets/algo.png)

Strong edges are denoted in blue, weak in red. As you can see, a strong neighbor node is just the next token in the sequence. Only the first occurence of each token value can have weak neighbors. These weak neighbors are nodes that follow an occurence of that token value (aka, its occurences' strong neighbors). 

The SuggestionMachine class keeps track of a list of 'possible suggestions'. At first, this encompasses all tokens. If called to provide a suggestion without any input, it will spit out a random token from the seed sequence.

- Suppose we need a suggestion for input `[the]`. Weak neighbors of the first occurence of `the` (node 0) are used to narrow the list of possible suggestions down to nodes `[1-dog, 4-cat, 7-best]`. A suggestion is randomly chosen from these node values.  

- If our input is `[the, cat]`, we first use weak neighbors of `the` to narrow down the possible suggestions to `[1-dog, 4-cat, 7-best]`. Since `cat` occurs in this list, its strong neighbor becomes a possible suggestion. In this example, our possible suggestions end up only as `[5-are]`. 


## Credits

- Hustler's Rough Font: [Gilang Purnama Jaya - Decade Type Foundry](https://www.fontspace.com/decade-type-foundry)