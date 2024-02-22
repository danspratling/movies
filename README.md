## Highlight something in your project that you thought was especially interesting or significant to your overall implementation.

Implementing pagination was an interesting challenge. Typically this was something I would hope to recieve from the API but it's also something that is rarely included. So I implemented it via the getMovies api where I return both the movies response and build a pagination from the data we know - the current page and the total pages for the response. This makes it significantly easier to implement on the frontend and if required, update at a later point.

## Tell us what you are most pleased or proud of with your implementation.

Very little JS is required to run this project, with the only client component being the search form, which falls back to server-side rendering if JS is disabled. It's a personal challenge of mine to only use JS when necessary (to keep code clean and efficient) and I'm always happy to see that I can achieve these things minimally.

## Given more time, what next feature or improvement would you like to add to your project?

With the above point in mind, I think it would be a much nicer UX to allow client-side filtering and searching instead of requiring a page refresh. This creates a more seamless experience for the user. Especially being able to search while typing to automatically filter the results, and show the user feedback as they're searching.
