import errorHandler from '@/helpers/errorHandler';
import { handleRequest } from '@/services/api/ApiClient';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';

jest.mock('@/helpers/errorHandler');

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('handleRequest returns parsed JSON data for JSON responses', async () => {
    server.use(
        rest.get('/test-json', (req, res, ctx) => {
            return res(ctx.json({ message: 'Hello, JSON!' }));
        })
    );

    const response = await handleRequest('GET', '/test-json');
    expect(response).toEqual({ message: 'Hello, JSON!' });
});

test('handleRequest returns text data for non-JSON responses', async () => {
    server.use(
        rest.get('/test-text', (req, res, ctx) => {
            return res(ctx.text('Hello, Text!'));
        })
    );

    const response = await handleRequest('GET', '/test-text');
    expect(response).toBe('Hello, Text!');
});

test('handleRequest handles HTTP errors correctly', async () => {
    server.use(
        rest.get('/test-error', (req, res, ctx) => {
            return res(ctx.status(500));
        })
    );

    try {
        await handleRequest('GET', '/test-error');
    } catch (error) {
        expect(errorHandler).toHaveBeenCalledWith(
            new Error('HTTP error! status: 500'),
            'handleResponse'
        );
    }
});

test('handleRequest handles network errors correctly', async () => {
    server.use(
        rest.get('/test-network-error', (res) => {
            return res.networkError('Failed to connect');
        })
    );
  
    await handleRequest('GET', '/test-network-error');
    expect(errorHandler).toHaveBeenCalled();
});

test('handleRequest sends POST request with data', async () => {
    const postData = { message: 'Hello, POST!' };
  
    server.use(
        rest.post('/test-post', (req, res, ctx) => {
            const receivedData = JSON.parse(req.bodyUsed);
            expect(receivedData).toEqual(postData);
            return res(ctx.status(201));
        })
    );
  
    await handleRequest('POST', '/test-post', postData);
});
