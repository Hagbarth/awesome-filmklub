export default function({ fbHandler }) {
  return {
    addMovie: function(
      {
        title,
        year,
        rated,
        released,
        runtime,
        genre,
        director,
        writer,
        actors,
        plot,
        language,
        country,
        awards,
        poster,
        metascore,
        imdbRating,
        imdbVotes,
        imdbID
      }
    ) {
      const ref = fbHandler.db.ref('movies');
      const newMov = ref.push();
      newMov.set({
        title,
        year,
        rated,
        released,
        runtime,
        genre,
        director,
        writer,
        actors,
        plot,
        language,
        country,
        awards,
        poster,
        metascore,
        imdbRating,
        imdbVotes,
        imdbID,
        createdAt: new Date().toISOString()
      });
    }
  };
}
