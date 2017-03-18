const initialState = {
  searchResults: []
};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case '@@OMDB/search': {
      return {
        ...state,
        searchResults: action.payload.movies
      };
    }
    case '@@OMDB/clear': {
      return { ...state, searchResults: [] };
    }
    default: {
      return state;
    }
  }
}
