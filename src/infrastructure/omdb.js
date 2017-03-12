export default function({ host, fetch }) {
  return {
    get: function({ query }) {
      return fetch(
        `${host}?${Object.keys(query)
          .reduce((string, key) => `${string}${key}=${query[key]}&`, '')}`
      ).then(r => r.json());
    }
  };
}
