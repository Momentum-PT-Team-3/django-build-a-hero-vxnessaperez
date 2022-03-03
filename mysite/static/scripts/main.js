function getCookie(name){
    let cookieValue = null;
    if (document.cookie && document.cookie !== ''){
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

let heroDisplay = document.querySelector("#hero-form")
let heroURL = 'api/heroes/'

fetch(heroURL, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'HMLHttpRequest',
        'X-CSRFToken': csrftoken,
    },
    
})
.then(response => {
    return response.json();
})
.then(heroArray => {
    console.log(heroArray)
    let heroDisplay = document.querySelector('#hero-display')
    console.log(heroDisplay)
    for (let hero of heroArray){
        console.log(hero)
        let heroItem = document.createElement('li')
        heroItem.innerText = `${hero.name} ${hero.alias}`
        heroDisplay.appendChild(heroItem)
    }
})