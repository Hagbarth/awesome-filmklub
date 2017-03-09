export default function(firebase) {
  const db = firebase.database();

  return {
    db: {
      ref: path => db.ref(path)
    }
  };
}
