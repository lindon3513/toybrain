import 'whatwg-fetch';

const assert = require('assert');
const host = 'http://localhost:3001';

function test() {
    return fetch(host + '/users')
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            return response.json();
        })
        .then(function (stories) {
            console.log(stories);
        });
}

function search() {
    return fetch('/users', {
        accept: 'application/json',
    }).then(checkStatus)
        .then(parseJSON);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
}

function parseJSON(response) {
    return response.json();
}

const Client = { search, test };
export default Client;
