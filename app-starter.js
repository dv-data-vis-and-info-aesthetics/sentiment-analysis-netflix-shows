// wink-sentiment scores text using a list of words with feelings attached.
// Docs: https://winkjs.org/wink-sentiment/
import winkSentiment from 'wink-sentiment'

const app = d3.select('#app')

// load the netflix csv
const rows = await d3.csv('./NetflixTV_summaries.csv')

// save into "comedies" the result of filtering the table by "Comedy"
const comedies = rows.filter((d) => d.genres.includes('Comedy'))

// split the genres column by the "," and put them on a list called "all_genres"
const all_genres = rows.flatMap((d) => d.genres.split(','))

// create a map with the count of all genres
const all_genres_counts = d3.rollup(all_genres, (v) => v.length , (d) => d )

// transform the map into an array and sort it by count (most frequent first) and remove the empty ones
  const all_genres_clean = Array.from(all_genres_counts)
    .sort((a, b) => d3.descending(a[1], b[1]))
    .filter((d) => d[0] !== "")

const genre_analyzed = all_genres_clean.map((genre) => {
  const shows = rows.filter((d) => d.genres.includes(genre[0]))
  const average = d3.mean(shows, (d) => winkSentiment(d.summary).score)
  return {
    genre: genre[0],
    average: average,
    amount: genre[1]
  }
})

genre_analyzed.sort((a, b) => d3.descending(a.average, b.average))


// ---- STEP 4: a colour scale and a size scale ------------------------------
// A DIVERGING colour scale: red for negative, grey at zero, green for
// positive. The middle value of the domain is where it turns grey.
// Stronger feelings (either way) get bigger text.

const color_scale = d3.scaleLinear()
  .domain([d3.min(genre_analyzed, (d) => d.average), 0 , d3.max(genre_analyzed, (d) => d.average)])
  .range(['#d73027', '#999999', '#1a9850'])

const width_scale = d3.scaleLinear()
  .domain([0, d3.max(genre_analyzed, (d) => d.amount)])
  .range([0, 400])

// ---- STEP 5: draw every sentence ------------------------------------------
// One <p> per sentence. Hover a sentence to see its score.
//
app
  .selectAll('p')
  .data(genre_analyzed)
  .join('p')
  .text((d) => d.genre)
  .style('width', (d) => width_scale(d.amount) + 'px')
  .style('background-color', (d) => color_scale(d.average ))
  .attr('title', (d) => `average: ${d.average}`)
