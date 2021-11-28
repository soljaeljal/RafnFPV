'use strict';

//variables
const nextProjectsSection = document.querySelector('#nextProjects');
const loading = document.querySelector('.loading');
let currentPost = window.localStorage.getItem('project');
const [objPost] = JSON.parse(currentPost);
let currPosId;
let allPostArr = [];
let postLeftArr = [];

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

const getPosts = function () {
    loadingAnimation(true);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                const newData = JSON.parse(xhr.response);

                createPage(newData);
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

getPosts();

const createPage = function (data) {

    posInArr(data);
    currPosId = allPostArr.indexOf(objPost.id);

    renderSeeMore(data);
    loadingAnimation(false);
}

const posInArr = function (data) {
    for (let i = 0; i < data.length; i++) {
        allPostArr.push(data[i].id);
    }
}

const renderSeeMore = function (data) {
    let randomNum;
    let checkIf;

    for (let j = 0; j < 2; j++) {
        checkIf = randomNum;
        randomNum = Math.floor(Math.random() * allPostArr.length);

        if (checkIf !== randomNum) {
            nextProjectsSection.insertAdjacentHTML('afterbegin', `
                <div id="${data[randomNum].id}" onClick='getPageByID(this.id)'>
                <p class="featured__client-name">${data[randomNum].acf.company}</p>
                <h3 class="featured__project-name">${data[randomNum].acf.title}</h3>
                <img id="${data[randomNum].id}" class="featured__image" src="${data[randomNum].acf.thumbnail.url}" alt="${data[randomNum].acf.title}">
                <button id="${data[randomNum].id}" onClick='getPageByID(this.id)' class="featured__anchor small-anchor">View project</button>
                </div>
                `);
        } else {
            j--;
        }
    }
}

function getPageByID(id) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                const projectPost = JSON.parse(xhr.response);

                window.localStorage.setItem('project', JSON.stringify(projectPost));
                console.log(window.localStorage.getItem('project'));
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