export default function({ fbHandler }) {
  return {
    addDirectory: function({ name }) {
      const ref = fbHandler.db.ref('directories');
      const newDir = ref.push();
      newDir.set({ name, createdAt: new Date().toISOString() });
    },
    addFile: function({ parentDir, file, fileIndex = 0 }) {
      const ref = fbHandler.db.ref(`directories/${parentDir}/files`);
      const newFile = ref.push();
      newFile.set({ key: file.name, createdAt: new Date().toISOString() });
      const storageRef = fbHandler.storage.ref();
      return storageRef
        .child(`${parentDir}/${file.name}`)
        .put(file, { fileIndex, key: newFile.key });
    },
    subscribeDirectories: function(cb) {
      fbHandler.db.ref('directories').on('value', r => {
        const tmpDirs = r.val();
        const dirs = Object.keys(tmpDirs).map(key => ({
          ...tmpDirs[key],
          id: key,
          files: (
            tmpDirs[key].files
              ? Object.keys(tmpDirs[key].files).map(fileKey => ({
                  ...tmpDirs[key].files[fileKey],
                  id: fileKey
                }))
              : []
          )
        }));

        return cb(dirs);
      });
    }
  };
}
