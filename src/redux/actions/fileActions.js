export default function fileActions({ fileRepo }) {
  return {
    subscribeDirectories: () => dispatch => {
      fileRepo.subscribeDirectories(directories => dispatch({
        type: '@@FIREBASE/update/directories',
        payload: {
          directories
        }
      }));
    },
    addDirectory: name => dispatch => fileRepo.addDirectory({ name })
  };
}
