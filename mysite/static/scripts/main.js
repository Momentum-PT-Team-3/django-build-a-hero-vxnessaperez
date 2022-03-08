function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
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

function heroList(url) {

    fetch(url, {
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
            for (let hero of heroArray) {
                console.log(hero)
                let heroItem = document.createElement('li')
                heroItem.innerText = `${hero.name} ${hero.alias}`
                heroItem.classList.add('red-border')
                let deleteButton = document.createElement('button')
                deleteButton.innerText = "Delete"
                deleteButton.classList.add('button', 'is-danger')
                deleteButton.setAttribute('data-pk', hero.pk)
                heroItem.append(deleteButton)
                heroItem.setAttribute('id', hero.pk)
                heroDisplay.appendChild(heroItem)

                deleteButton.addEventListener('click', event => {
                    console.log(event.target.dataset.pk)
                    fetch(`api/heroes/${event.target.dataset.pk}`, {
                        method: 'DELETE',
                        credentials: 'same-origin',
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'HMLHttpRequest',
                            'X-CSRFToken': csrftoken,
                        },

                    })
                    .then(response => {
                        console.log(event.target.parentElement.id)
                        let elementToRemove= document.getElementById(event.target.dataset.pk)
                        console.log(elementToRemove)
                        heroDisplay.remove(elementToRemove)
                    })
                })

            }
        })
}

heroList(heroURL)

let HeroForm = document.querySelector('#hero-form')
console.log(HeroForm)

HeroForm.addEventListener('submit', function (event) {
    event.preventDefault()

    let heroFormData = new FormData(HeroForm)

    console.log(heroFormData)
    fetch(heroURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'X-request-with': 'XMLHttpRequest',
            'X-CSRFToken': csrftoken,
        },

        body: heroFormData

    })
})
