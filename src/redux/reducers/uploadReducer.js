const initialState = [];

export default function uploadReducer(state = initialState, action) {
  switch (action.type) {
    case '@@FIREBASE/upload/start': {
      return action.payload.files.map(f => ({ progress: 0 }));
    }
    case '@@FIREBASE/upload/done': {
      return state.filter((f, i) => i !== action.payload.file.fileIndex);
    }
    case '@@FIREBASE/upload/progress': {
      return state.map(
        (f, i) => i === action.payload.file.fileIndex
          ? {
              ...f,
              progress: action.payload.progress,
              key: action.payload.file.key
            }
          : f
      );
    }
    default: {
      return state;
    }
  }
}
