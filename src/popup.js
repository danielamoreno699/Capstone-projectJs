const urlPost = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps"
const id = "KoCOE5oCIzRMqu6L9zdv"
const urlGet = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/KoCOE5oCIzRMqu6L9zdv/comments/?item_id=item1"
const item_id = 'item2'
const apiKey = '65ce0d679d0529fede22e13b61a1c2c0';

  

export const displayComment = async() => {
   
    try {
        const data = await getListcomments(id);
        

        const container = document.getElementById("comment-container")
        container.innerHTML = ''

        data.forEach((result) => {
            const row = document.createElement('div')
            row.classList.add('row')
            const rowContent = `
            <div class="col ">
                    ${result.creation_date} - ${result.username} : ${result.comment}
             </div>
            `
            row.innerHTML = rowContent
            container.appendChild(row) 
        })

    } catch (error) {
        return error
        
    }

}

export const postComment = async(data) => {
    
    try {
        console.log('clicked')
        const res = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/KoCOE5oCIzRMqu6L9zdv/comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          const responseData = await res.json();
          return responseData
        
    } catch (error) {
        return error
    }
   
}

export const handleSubmit = (e) => {
    e.preventDefault();
  
    const userName = document.getElementById('name')
    const txt = document.getElementById('text')
  
    if(!userName.value || !txt.value){
      return
    }
  
    postComment({item_id: item_id, username: userName.value, comment: txt.value})
      .then(() => {
        userName.value = ''
        txt.value = ''
        displayComment()
      })
      .catch((error) => console.error(error))
  };
  


// get comments 
const getListcomments = async(id) => {
    try {
        const res = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/KoCOE5oCIzRMqu6L9zdv/comments/?item_id=item2`, {
            method: 'GET',
        });

        const responseData = await res.json();
        return responseData
        
        
    } catch (error) {
        return error
        
    }

} 

const getListMovie = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`);
      const data = await res.json();
      return data.results;
    } catch (error) {
      console.error(error);
    }
  };
  
  const populateModal = (movie) => {
    const modalHtml = ` 
    <img class="img-modal " src= ${movie.poster_path} alt="">
    <div class="container mt-4">
        <h2 class="text-center">${movie.title}</h2>
        <div class="row justify-content-center mt-3">
          <div class="col-md-4 mt-3 align-items-center ">
            <p> <span class="stroke"> Popularity: </span> ${movie.popularity}</p>
            <p> <span class="stroke"> Release Date: </span> ${movie.release_date}</p>
            <p> <span class="stroke"> Overview: </span>In the wake of King Edward's death, Uhtred of Bebbanburg and his comrades adventure across a fractured kingdom in the hopes of uniting England at last.</p>
          </div>
          <div class="col-md-4 mt-3 align-items-center">
           
            <p> <span class="stroke"> Type: </span> ${movie.media_type}</p>
            <p> <span class="stroke"> Vote Average: </span> ${movie.vote_average}</p>
            <p> <span class="stroke"> Vote Count: </span> ${movie.vote_count}</p>
          </div>
        </div>
      </div>`

      const modalEl = document.getElementById('modal-body')
      modalEl.innerHTML = modalHtml
  };

// trasnfer data and populate the modal
export const movieInfo = async(id) => {
    const movies = await getListMovie()
    console.log(movies)
    console.log('clik id')
    const movie = movies.find((movie) => movie.id === id)
    if (movie) {
        populateModal(movie);
      } else {
        console.error(`No movie found with id ${id}`);
      }
}
