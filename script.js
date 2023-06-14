async function getBook(findValue="") {

    try {
      const url = "https://www.anapioficeandfire.com/api/books?name=" + findValue;
      const response = await fetch(url);
      const data = await response.json();
    console.log(data);
      let cardsArray="";
            const booksContainer = document.getElementById('books');
            if (data.length > 0) {
                for(let _d of data){ 
      cardsArray+= `<div class="book-card">
      <h4 class="book-heading book-heading-primary">${_d.name}</h4>
      <h4 class="book-heading book-heading-secondary">Publisher: ${_d.publisher}</h4>
      <h4 class="book-heading book-heading-secondary">
      Released on: ${new Date(_d.released).toLocaleDateString()}
      </h4>
      <h4 class="book-heading book-heading-secondary">Isbn: ${_d.isbn}</h4>
      <h4 class="book-heading book-heading-secondary">
        Pages: ${_d.numberOfPages}
      </h4>
      <h4 class="book-heading book-heading-secondary">
        Authors: ${_d.authors}
      </h4> `;
    const characters=(await getCharacters(_d.characters)).join(", ");
    
    cardsArray+=`<h4 class="book-heading book-heading-secondary">
    Characters: ${characters}
  </h4>
</div>`
}
booksContainer.innerHTML=cardsArray;
}
}catch (error) {
        console.log("ERROR", error);
      }
    }   
function onChangeHandler(){
    let find=document.getElementById("search");
    let findValue=find.value;
    console.log(findValue);
    getBook(findValue)
};

const getCharacters = async(characters)=>{
    const characterName = [];
    const sliceCharacters = characters.slice(0,5);
    for(let characterUrl of sliceCharacters){
        const response = await fetch(characterUrl);
        const data = await response.json();
    console.log(response)
      characterName.push(data.name);
    }
    return characterName
  }
    
getBook()
