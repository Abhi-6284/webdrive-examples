"use client";
import { useReducer, useCallback } from "react";

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

type HistoryAction<T> =
  | { type: "PUSH"; payload: T }
  | { type: "UNDO" }
  | { type: "REDO" };

function createReducer<T>() {
  return function reducer(
    state: HistoryState<T>,
    action: HistoryAction<T>
  ): HistoryState<T> {
    switch (action.type) {
      case "PUSH":
        return {
          past: [...state.past, state.present].slice(-20),
          present: action.payload,
          future: [],
        };
      case "UNDO":
        if (state.past.length === 0) return state;
        return {
          past: state.past.slice(0, -1),
          present: state.past[state.past.length - 1],
          future: [state.present, ...state.future],
        };
      case "REDO":
        if (state.future.length === 0) return state;
        return {
          past: [...state.past, state.present],
          present: state.future[0],
          future: state.future.slice(1),
        };
      default:
        return state;
    }
  };
}

export function usePlaygroundHistory<T>(initialState: T) {
  const reducer = createReducer<T>();
  const [state, dispatch] = useReducer(reducer, {
    past: [],
    present: initialState,
    future: [],
  });

  const push = useCallback(
    (newState: T) => dispatch({ type: "PUSH", payload: newState }),
    []
  );
  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => dispatch({ type: "REDO" }), []);

  return {
    config: state.present,
    push,
    undo,
    redo,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  };
}
