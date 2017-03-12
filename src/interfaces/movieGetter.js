export default function movieGetter({ omdb }) {
  return {
    search: function(query) {
      return omdb
        .get({ query: { s: query } })
        .then(result => result.Search.map(movie => {
          let key, keys = Object.keys(movie);
          let n = keys.length;
          let newMov = {};
          while (n--) {
            key = keys[n];
            newMov[key.charAt(0).toLowerCase() + key.substr(1)] = movie[key];
          }
          return newMov;
        }));
    }
  };
}
