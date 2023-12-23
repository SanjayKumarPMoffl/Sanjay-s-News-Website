const APIkey = "f27c0517e03b4cf38ad45c8330bc0ce8";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const data = await fetch(`${url}${query}&apiKey=${APIkey}`);
    const res = await data.json();
    bindData(res.articles);
}

function fillData(newCard, article) {
    const newsImg = newCard.querySelector(".card-img img");
    const newsTitle = newCard.querySelector(".content h1");
    const newsDesc = newCard.querySelector(".content p");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    newCard.firstElementChild.addEventListener('click', ()=> {
        window.open(article.url, "_blank");
    });
}

function bindData(articles){
    const container = document.getElementById('container');
    const cardtemplate = document.getElementById('card-template');

    container.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const newCard = cardtemplate.content.cloneNode(true); 
        fillData(newCard, article); 
        container.appendChild(newCard);     
    });
}

const button = document.getElementById("search-button");

button.addEventListener('click', () => {
    const query = document.getElementById("search-text").value;
    if(!query) return;
    fetchNews(query);
});
