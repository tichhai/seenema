import { DISPLAY_LOADING, HIDE_LOADING } from "../actions/types/LoadingType";

const stateDefault = {
  isLoading: false,
};

export const LoadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    // eslint-disable-next-line no-lone-blocks
    case DISPLAY_LOADING: {
      return { ...state, isLoading: true };
    }
    case HIDE_LOADING: {
      return { ...state, isLoading: false };
    }
    default: {
      return { ...state };
    }
  }
};
