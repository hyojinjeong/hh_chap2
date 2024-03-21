export function createHooks(callback) {
  let stateIdx = 0;
  let stateArr = [];
  let setStateArr = [];

  const useState = (initState) => {
    let state;
    let setState;

    if (stateArr[stateIdx] === undefined) {
      state = initState;
    } else {
      state = stateArr[stateIdx];
    }
    if (setStateArr[stateIdx] === undefined) {
      setState = (newState) => {
        if (state === newState) {
          return;
        }
        state = newState;
        callback();
      }
      setStateArr.push(setState);
    } else {
      setState = setStateArr[stateIdx]
    }
    stateIdx++
    return [state, setState]
  }


  const useMemo = (fn, refs) => {
    return fn();
  };

  const resetContext = () => {
    stateIdx = 0;
  }

  return { useState, useMemo, resetContext };
}
