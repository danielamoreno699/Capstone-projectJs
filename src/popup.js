const urlPost = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps"
const id = "KoCOE5oCIzRMqu6L9zdv"
const urlGet = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/KoCOE5oCIzRMqu6L9zdv/comments/?item_id=item1"
const item_id = 'item2'

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
