const stateDefault = {
  executeScroll: () => {},
};

export const ScrollToReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "SCROLL_TO": {
      return { ...state, executeScroll: action.executeScroll };
    }
    default:
      return { ...state };
  }
};
