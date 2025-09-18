const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../rest/app');

describe('Checkout Controller', () => {
    describe('POST /api/checkout', () => {
        it('Token inválido', async () => {
            const res = await request(app)
                .post('/api/checkout')
                .set('Authorization', 'Bearer token_invalido')
                .send({
                    items: [
                        {
                            productId: 0,
                            quantity: 0
                        }
                    ],
                    freight: 0,
                    paymentMethod: "boleto",
                    cardData: {
                        number: "string",
                        name: "string",
                        expiry: "string",
                        cvv: "string"
                    }
                });

            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('error', 'Token inválido');
        });
    });

    describe('GET /checkout/success', () => {

    });
});