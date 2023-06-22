const request = require('supertest');
const { expect } = require('chai');

const baseURL = 'https://gorest.co.in';
const server = 'cloudflare';

// Test case 1: Call the users endpoint
describe('Users API', () => {
  it('should retrieve users from the API', async () => {
    const response = await request(baseURL).get('/public/v1/users');

    expect(response.status).to.equal(200);
    expect(response.headers['content-type']).to.include('application/json');
    expect(response.body.data).to.be.an('array').that.is.not.empty;
  });
});

// Test case 2: Call the users endpoint for a specific user
describe('Users API', () => {
  it('should retrieve a specific user from the API', async () => {
    const users = await request(baseURL).get('/public/v1/users');
    const randomIndex = Math.floor(Math.random() * users.body.data.length);
    const item = users.body.data[randomIndex];
    const id = item.id;
    const userName = item.name;

    const response = await request(baseURL).get(`/public/v1/users/${id}`);
    
    expect(response.status).to.equal(200);
    expect(response.headers['content-type']).to.include('application/json');
    expect(response.body.data.name).to.equal(userName);
  });
});

// Test case 3: Call the posts endpoint
describe('Posts API', () => {
  it('should retrieve posts from the API', async () => {
    const response = await request(baseURL).get('/public/v1/posts');

    expect(response.status).to.equal(200);
    expect(response.headers['x-content-type-options']).to.include('nosniff');
    expect(response.body.data).to.be.an('array').that.is.not.empty;
  });
});

// Test case 4: Retrieve posts from the API and verify server header
describe('Posts API', () => {
  it('should retrieve posts from the API and check the server header', async () => {
    const response = await request(baseURL).get('/public/v1/posts');

    expect(response.headers['server']).to.equal(server);
  });
});

