const initialState = [];

export default function fileReducer(state = initialState, action) {
  switch (action.type) {
    case '@@FIREBASE/update/directories': {
      if (action.payload.directories) {
        return action.payload.directories;
      }
      return state;
    }
    default: {
      return state;
    }
  }
}
