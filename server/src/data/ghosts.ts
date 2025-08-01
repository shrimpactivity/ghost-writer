import { MarkovCoil } from "markov-coil";
import { Ghost } from "../types/ghost";

const testMarkov = new MarkovCoil("this is a test".split(" "));
const testMarkov2 = new MarkovCoil("the quick brown fox".split(" "));

export const ghosts: Ghost[] = [
  { id: 1, title: "Test Ghost 1", data: testMarkov.serialize() },
  { id: 2, title: "Test Ghost 2", data: testMarkov2.serialize() }
]