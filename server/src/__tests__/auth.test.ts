// __tests__/authRoutes.test.ts

import request from 'supertest'; // For simulating HTTP requests
import mongoose from 'mongoose'; // For managing DB connections
import app from '../server'; // Import your Express server instance
import User from '../models/User'; // Mongoose User model

// Group tests related to authentication
describe('Auth Routes', () => {
  // Runs before any test — connects to the test DB
  beforeAll(async () => {
    const MONGO_URI = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/job-board-test';
    await mongoose.connect(MONGO_URI);
  });

  // Clean up users after each test
  afterEach(async () => {
    await User.deleteMany({});
  });

  // Disconnect after all tests are done
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test the register route
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register') // Hitting the register route
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(res.status).toBe(201); // Expecting successful creation
    expect(res.body).toHaveProperty('token'); // Should return a token
  });

  // Test the login route
  it('should login an existing user', async () => {
    // First, register a user
    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    // Then attempt login
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(res.status).toBe(200); // Expect success
    expect(res.body).toHaveProperty('token'); // Expect token in response
  });

  // Test admin route access without auth
  it('should block access to admin route if not admin', async () => {
    const res = await request(app)
      .post('/api/auth/admin/create-user'); // This is protected

    expect(res.status).toBe(401); // Should block unauthenticated users
  });
});
