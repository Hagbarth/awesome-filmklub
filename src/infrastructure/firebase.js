export default function(firebase) {
  const db = firebase.database();
  const storage = firebase.storage();

  return {
    db: {
      ref: path => db.ref(path)
    },
    storage: {
      ref: () => storage.ref()
    }
  };
}
