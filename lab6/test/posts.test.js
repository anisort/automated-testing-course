const request = require('supertest');
const { expect } = require('chai');
const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
});

const BASE_URL = 'https://gorest.co.in/public/v3';
const TOKEN = process.env.GOREST_TOKEN;

let postId;
let createdPostId;

const testTitle = `Supertest test post ${Date.now()}`;
const testBody = 'This post was created to test the GoREST API using Supertest.';

function displayResponse(method, endpoint, response) {
    console.log('\n' + '='.repeat(70));
    console.log(` ${method.toUpperCase()} ${endpoint}`);
    console.log('-'.repeat(70));
    console.log(`Status: ${response.status}`);
    console.log('Response body:');

    if (response.body && Object.keys(response.body).length > 0) {
        console.log(JSON.stringify(response.body, null, 4));
    } else {
        console.log('(empty response body)');
    }

    console.log('='.repeat(70));
}

function authorizedRequest(method, endpoint) {
    if (!TOKEN) {
        throw new Error('GOREST_TOKEN is missing. Check your .env file.');
    }

    return request(BASE_URL)[method](endpoint)
        .set('Authorization', `Bearer ${TOKEN}`);
}

describe('Posts API', function () {

    it('GET /posts - should return a list of posts', async function () {
        const response = await request(BASE_URL)
            .get('/posts');

        displayResponse('GET', '/posts', response);

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data.length).to.be.greaterThan(0);

        const post = response.body.data[0];

        expect(post).to.have.property('id');
        expect(post).to.have.property('user_id');
        expect(post).to.have.property('title');
        expect(post).to.have.property('body');

        expect(post.id).to.be.a('string');
        expect(post.user_id).to.be.a('string');
        expect(post.title).to.be.a('string');
        expect(post.body).to.be.a('string');

        postId = post.id;
    });

    it('GET /posts/:id - should return a post by ID', async function () {
        expect(postId).to.exist;

        const response = await request(BASE_URL)
            .get(`/posts/${postId}`);

        displayResponse('GET', `/posts/${postId}`, response);

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.id).to.equal(postId);

        expect(response.body).to.have.property('user_id');
        expect(response.body).to.have.property('title');
        expect(response.body).to.have.property('body');

        expect(response.body.user_id).to.be.a('string');
        expect(response.body.title).to.be.a('string');
        expect(response.body.body).to.be.a('string');
    });

    it('POST /posts - should reject a post with invalid data', async function () {
        const response = await authorizedRequest('post', '/posts')
            .send({});

        displayResponse('POST', '/posts', response);

        expect(response.status).to.equal(422);
        expect(response.body).to.be.an('object');

        expect(response.body).to.have.property('code', 'validation_failed');
        expect(response.body).to.have.property('title', 'Unprocessable Entity');
        expect(response.body).to.have.property('status', 422);

        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.be.an('array');
        expect(response.body.errors.length).to.be.greaterThan(0);

        const errorPointers = response.body.errors.map(
            error => error.pointer
        );

        expect(errorPointers).to.include('/user_id');
        expect(errorPointers).to.include('/title');
        expect(errorPointers).to.include('/body');

        response.body.errors.forEach(error => {
            expect(error).to.have.property('code');
            expect(error).to.have.property('detail');
            expect(error).to.have.property('pointer');
        });
    });

    it('POST /posts - should create a new post', async function () {
        const usersResponse = await request(BASE_URL)
            .get('/users');

        displayResponse('GET', '/users', usersResponse);

        expect(usersResponse.status).to.equal(200);
        expect(usersResponse.body.data).to.be.an('array');
        expect(usersResponse.body.data.length).to.be.greaterThan(0);

        const userId = usersResponse.body.data[0].id;

        const response = await authorizedRequest('post', '/posts')
            .send({
                user_id: userId,
                title: testTitle,
                body: testBody
            });

        displayResponse('POST', '/posts', response);

        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');

        expect(response.body).to.have.property('id');
        expect(response.body.user_id).to.equal(userId);
        expect(response.body.title).to.equal(testTitle);
        expect(response.body.body).to.equal(testBody);

        expect(response.body.id).to.be.a('string');

        createdPostId = response.body.id;
    });

    it('PATCH /posts/:id - should update an existing post', async function () {
        expect(createdPostId).to.exist;

        const updatedTitle = `Updated test post ${Date.now()}`;

        const response = await authorizedRequest(
            'patch',
            `/posts/${createdPostId}`
        ).send({
            title: updatedTitle
        });

        displayResponse('PATCH', `/posts/${createdPostId}`, response);

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');

        expect(response.body.id).to.equal(createdPostId);
        expect(response.body.title).to.equal(updatedTitle);
        expect(response.body.body).to.equal(testBody);
    });

    it('DELETE /posts/:id - should delete an existing post', async function () {
        expect(createdPostId).to.exist;

        const response = await authorizedRequest(
            'delete',
            `/posts/${createdPostId}`
        );

        displayResponse('DELETE', `/posts/${createdPostId}`, response);

        expect(response.status).to.equal(204);
    });

    it('GET /posts/:id - should return 404 for a deleted post', async function () {
        expect(createdPostId).to.exist;

        const response = await request(BASE_URL)
            .get(`/posts/${createdPostId}`);

        displayResponse('GET', `/posts/${createdPostId}`, response);

        expect(response.status).to.equal(404);
    });

});
