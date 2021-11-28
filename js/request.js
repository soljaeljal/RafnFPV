'use strict';
//Variables
const latestWork = document.querySelector('#allProjects');
const loading = document.querySelector('.loading');
const projectVideo = document.querySelector('#reel__video');


//API Credentionals
const apiUser = {
    'username': 'jendrek',
    'password': 'n0nsense'
};

//Will show the error when  
const errorMessage = function (message) {
    console.log(message);
};

const loadingAnimation = function (isActive) {
    if (isActive) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
};

const initPage = function () {
    loadingAnimation(true);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            try {
                let data = JSON.parse(xhr.response);
                window.localStorage.setItem('authToken', data.token);
                createPage();
            } catch (error) {
                errorMessage(`Error parsing JSON: ${error}`);
            }
        }

        if (this.readyState == 4 && this.status >= 400) {
            errorMessage('An error has occured while getting the data. Please try again later!');
        }
    };

    xhr.open('POST', `https://andrejsipka.dk/wp-json/jwt-auth/v1/token`);
    xhr.setRequestHeader('Content-Type', 'application/JSON');
    xhr.send(JSON.stringify(apiUser));
};

const createPage = function () {

    latestWorkSection();

    loadingAnimation(false);
}

initPage();


const latestWorkSection = function () {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                const newData = JSON.parse(xhr.response);

                newData.forEach(project => {
                    latestWork.insertAdjacentHTML('afterbegin', `
                    <div id="${project.id}" onClick='getPageByID(this.id)'>
                    <p class="featured__client-name">${project.acf.company}</p>
                    <h3 class="featured__project-name">${project.acf.title}</h3>
                    <img id="${project.id}" class="featured__image" src="${project.acf.thumbnail.url}" alt="${project.acf.title}">
                    <button id="${project.id}" onClick='getPageByID(this.id)' class="featured__anchor small-anchor">View project</button>
                    </div>
                    `)
                });
            } catch (error) {
                errorMessage(`Error parsing JSON: ${error}`);
            }
        }
        if (this.readyState == 4 && this.status >= 400) {
            errorMessage('An error has occured while getting the data. Please try again later!');
        }
    }
    xhr.open('GET', `https://andrejsipka.dk/wp-json/wp/v2/posts?status=private`);
    xhr.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('authToken')}`);
    xhr.send();
}

function getPageByID(id) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                const projectPost = JSON.parse(xhr.response);

                window.localStorage.setItem('project', JSON.stringify(projectPost));
                window.open('portfolio-project.html', '_self');
            } catch (error) {
                errorMessage(`error: ${error}`)
            }

        }
        if (this.readyState == 4 && this.status >= 400) {
            errorMessage('An error has occured while getting the data. Please try again later!');
        }
    }

    xhr.open('GET', `https://andrejsipka.dk/wp-json/wp/v2/posts?status=private&include[]=${id}`);
    xhr.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('authToken')}`);
    xhr.send();
}