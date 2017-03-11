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
    addDirectory: name => dispatch => fileRepo.addDirectory({ name }),
    uploadFiles: (parentDir, files) => dispatch => {
      dispatch({
        type: '@@FIREBASE/upload/start',
        payload: {
          files
        }
      });
      files.map((file, i) =>
        fileRepo
          .addFile({ parentDir, file, fileIndex: i })
          .on('state_changed', snapshot => {
            const progress = snapshot.bytesTransferred /
              snapshot.totalBytes *
              100;
            if (progress === 100) {
              dispatch({
                type: '@@FIREBASE/upload/done',
                payload: {
                  progress,
                  file: snapshot.metadata
                }
              });
            } else {
              dispatch({
                type: '@@FIREBASE/upload/progress',
                payload: {
                  progress,
                  file: snapshot.metadata
                }
              });
            }
          }));
    }
  };
}
