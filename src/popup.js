let movieId = '';

// posting comments calling the interactive API
export const postComment = async (data) => {
  try {
    const res = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/KoCOE5oCIzRMqu6L9zdv/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    return error;
  }
};

// get comments from api
const getListcomments = async (movieId) => {
  try {
    const res = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/KoCOE5oCIzRMqu6L9zdv/comments/?item_id=${movieId}`, {
      method: 'GET',
    });

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    return error;
  }
};

const displayComment = async () => {
  const span = document.getElementById('counter-coments');
  const commentsContainer = document.getElementById('comment-container');
  commentsContainer.innerHTML = '';

  try {
    const comments = await getListcomments(movieId);
    const counts = comments.length;

    if (comments.length === 0) {
      commentsContainer.innerHTML = 'No comments yet.';
      return;
    }

    span.innerText = `(${counts})`;

    comments.forEach((result) => {
      const row = document.createElement('div');
      row.classList.add('row');
      const rowContent = `
        <div class="col ">
        ${result.creation_date} - ${result.username} : ${result.comment}
        </div>
        `;
      row.innerHTML = rowContent;
      commentsContainer.appendChild(row);
    });
  } catch (error) {
    commentsContainer.innerHTML = 'Failed to load comments.';
  }
};

// handle submit of form btn for comments
export const handleSubmit = async (e) => {
  e.preventDefault();

  const userName = document.getElementById('name');
  const txt = document.getElementById('text');

  if (!userName.value || !txt.value) {
    return;
  }

  const commentData = { item_id: movieId, username: userName.value, comment: txt.value };

  try {
    await postComment(commentData);
    userName.value = '';
    txt.value = '';
    displayComment();
  } catch (error) {
    // eslint-disable-next-line consistent-return
    return error;
  }
};

// populate modal with data from API
const populateModal = (movie, cleanPosterPath) => {
  const modalHtml = ` 
    <img class="img-modal " src= ${cleanPosterPath} alt="">
    <div class="container mt-4">
        <h2 class="text-center" id="modal-title">${movie.title || movie.name}</h2>
        <div class="row justify-content-center mt-3">
          <div class="col-md-4 mt-3 align-items-center ">
            <p> <span class="stroke"> Popularity: </span> ${movie.popularity}</p>
            <p> <span class="stroke"> Release Date: </span> ${movie.release_date}</p>
            <p> <span class="stroke"> Overview: </span>${movie.overview}</p>
          </div>
          <div class="col-md-4 mt-3 align-items-center">
           
            <p> <span class="stroke"> Type: </span> ${movie.media_type}</p>
            <p> <span class="stroke"> Vote Average: </span> ${movie.vote_average}</p>
            <p> <span class="stroke"> Vote Count: </span> ${movie.vote_count}</p>
          </div>
        </div>
      </div>`;

  const modalEl = document.getElementById('modal-body');
  modalEl.innerHTML = modalHtml;
};

// trasnfer data and populate the modal
export const triggerMovieID = async (movie, cleanPosterPath) => {
  movieId = movie.id;
  populateModal(movie, cleanPosterPath);

  displayComment(movieId);

  return movieId;
};
