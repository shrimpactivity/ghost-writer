/** Returns a random item from the list. */
const randomChoice = (list) => {
  const choiceIndex = Math.floor(Math.random() * list.length);
  return list[choiceIndex];
};

export default { randomChoice };
