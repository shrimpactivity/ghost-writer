import { MarkovCoil } from "markov-coil";

const testMarkov = new MarkovCoil("this is a test".split(" "));
const testMarkov2 = new MarkovCoil("the quick brown fox".split(" "));

export const ghosts = [
  { id: 1, name: "Test Ghost 1", data: testMarkov.serialize() },
  { id: 2, name: "Test Ghost 2", data: testMarkov2.serialize() }
]