const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');


const app = require('../../rest/app');
const users = require('../../src/models/user');

beforeEach(() => {
    users.length = 0;
    users.push(
        { id: 1, name: 'Alice', email: 'alice@email.com', password: '123456' },
        { id: 2, name: 'Bob', email: 'bob@email.com', password: '123456' }
    );
});

describe('User Controller', () => {
    describe('POST /api/users/register', () => {
        it('Email já cadastrado', async () => {
            // Primeiro cadastro 
            await request(app)
                .post('/api/users/register')
                .send({
                    email: "teste@teste.com",
                    password: "123456",
                    name: "Lisa"
                });

            // Segundo cadastro (erro)
            const res = await request(app)
                .post('/api/users/register')
                .send({
                    email: "teste@teste.com",
                    password: "123456",
                    name: "Lisa"
                });

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error', 'Email já cadastrado');
        });
    });
    describe('POST /api/users/login', () => {
        it('Credenciais inválidas', async () => {
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    email: "teste@lisa.com",
                    password: "654321",
                });
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('error', 'Credenciais inválidas');
        });
    });

    describe('GET /user/success', () => {
       
    });
});