const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wborijrWBBZrkib7JJmq/likes/';

export const likeMovie = (selectedID, likeCountEmptyContainer) => {
    const body = JSON.stringify({"item_id": selectedID});
    fetch(url, {
    method: 'POST',
    body: body,
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(response => {
    if (response.ok) {
        getLikeCount(selectedID, likeCountEmptyContainer);
    } else {
        console.log('POST request failed with error code:', response.status);
    }
    })
    .catch(error => {
    console.log('Error:', error);
    });
}

const updateLikes = (likeData, movieID, likeCountContainer) => {
    let movieLikeData = null;
    let likeAmount = null;
    for (let i = 0; i < likeData.length; i++) {
      if (likeData[i].item_id === movieID) {
        movieLikeData = likeData[i];
        break; // Stop the loop once a matching object is found
      }
    }
    
    if (movieLikeData != null)
    {
        likeAmount = movieLikeData.likes;
        likeCountContainer.textContent = likeAmount;
    }
    else
    {
        likeCountContainer.textContent = 0 + "";
    }
}

export async function getLikeCount(id, likeCountContainer) {
    const response = await fetch(url);
    const data = await response.json();
    updateLikes(data, id, likeCountContainer);
}

