![GhostWriter Logo](./src/assets/readme-logo.png)

GhostWriter provides a simple browser interface for co-writing with public domain authors (or *ghosts*, as they're referred to in the app). While writing, the app continuously provides text suggestion sourced from the selected author's work. 

Additional texts can be searched and downloaded from [Project Gutenberg](https://www.gutenberg.org/), an online library of free e-books. The text is then processed into an efficient graph abstraction with my [suggestion-machine](https://github.com/shrimpactivity/suggestion-machine) package. 

This is a front-end application built with React.js. For the backend api, see [ghostwriter-api](https://github.com/shrimpactivity/ghostwriter-api)

## Features
- custom browser text editor
- text suggestion computed from a seed text and the user's previous input
- Express.js backend
  - suggestion api for texts located on server
  - api for searching/retrieving texts from Project Gutenberg
  - and more!
- client side routing with [React Router](https://reactrouter.com/en/main)
- local storage state persistence
- Goober, the ghost mascot

## Planned Features
- user authentication and composition storage (in-progress)
- more advanced suggestion algorithm for better coherence
- better text parser to allow non-alphabetic characters in suggestions 

## Suggestion Algorithm
First, texts are processed into a sequence of word tokens. Non-alphabetic characters and extra whitespace are removed for the sake of simplicity due to the inconsistent formatting and characters in Project Gutenberg documents.

Using [suggestion-machine](https://github.com/shrimpactivity/suggestion-machine), the tokens are used to create a graph with two edge types: strong and weak. The below image visualizes an example graph for the seed sequence: `[the, dog, and, the, cat, are, the, best, friends, and, how]`

![Graph visualization](/src/assets/algo.png)

- Strong edges (blue): point to the next token node in the sequence
- Weak edges (red): point from the first occurence of a token node to all successors of its other occurences

When a suggestion is requested, the SuggestionMachine object keeps a list of possible suggestions. Requesting a suggestion for some input sequence will follow branching 'paths' of strong and weak neighbors to update the possible suggestions. Once the whole input has been processed, a random token node is selected from that list. 

## Credits
- Hustler's Rough Font: [Gilang Purnama Jaya - Decade Type Foundry](https://www.fontspace.com/decade-type-foundry)
