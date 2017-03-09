export default function({ fbHandler }) {
  return {
    addDirectory: function({ name }) {
      const ref = fbHandler.db.ref('directories');
      const newDir = ref.push();
      newDir.set({ name, createdAt: new Date().toISOString() });
    },
    addFile: function({ parentDir, key }) {
      const ref = fbHandler.db.ref(`directories/${parentDir}/files`);
      const newFile = ref.push();
      newFile.set({ key, createdAt: new Date().toISOString() });
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
