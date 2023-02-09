const get = (key) => {
  return window.localStorage.getItem(key);
};

const set = (key, value) => {
  window.localStorage.setItem(key, value);
};

const isSet = (key) => {
  return window.localStorage.getItem(key) !== null;
};

export default { get, set, isSet };
