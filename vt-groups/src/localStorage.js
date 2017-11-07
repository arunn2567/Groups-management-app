// loadState to get the state from the localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}
//saveState to save the state in the localStorage
export const saveState = (state) => {
  try {

    const serializedState = JSON.stringify(state);

    localStorage.setItem('state', serializedState);

  } catch (err) {}
}
