const id = 'KoCOE5oCIzRMqu6L9zdv';
const itemID = 'item2';

// get comments
const getListcomments = async () => {
  try {
    const res = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/KoCOE5oCIzRMqu6L9zdv/comments/?item_id=item2', {
      method: 'GET',
    });

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    return error;
  }
};
// eslint-disable-next-line consistent-return
export const displayComment = async () => {
  try {
    const data = await getListcomments(id);

    const container = document.getElementById('comment-container');
    container.innerHTML = '';

    data.forEach((result) => {
      const row = document.createElement('div');
      row.classList.add('row');
      const rowContent = `
            <div class="col ">
                    ${result.creation_date} - ${result.username} : ${result.comment}
             </div>
            `;
      row.innerHTML = rowContent;
      container.appendChild(row);
    });
  } catch (error) {
    return new Error('Something went wrong');
  }
};

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

export const handleSubmit = (e) => {
  e.preventDefault();

  const userName = document.getElementById('name');
  const txt = document.getElementById('text');

  if (!userName.value || !txt.value) {
    return;
  }

  postComment({ item_id: itemID, username: userName.value, comment: txt.value })
    .then(() => {
      userName.value = '';
      txt.value = '';
      displayComment();
    })
    .catch((error) => error);
};

const populateModal = (movie, cleanPosterPath, movieTitle) => {
  const modalHtml = ` 
    <img class="img-modal " src= ${cleanPosterPath} alt="">
    <div class="container mt-4">
        <h2 class="text-center">${movieTitle}</h2>
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
// eslint-disable-next-line consistent-return
export const triggerMovieID = async (movie, cleanPosterPath) => {
  if (movie) {
    if (!movie.title) {
      populateModal(movie, cleanPosterPath, movie.name);
    }
    populateModal(movie, cleanPosterPath, movie.title);
  } else {
    return new Error('Did not get ID');
  }
};
