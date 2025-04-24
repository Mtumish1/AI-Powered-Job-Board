import request from 'supertest';
import app from '../server'; // Your Express app
import mongoose from 'mongoose';
import User from '../models/User';
import Application from '../models/Application';

// Test variables
let token: string;
let adminToken: string;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI || '', {});

  // Register a test user
  await request(app).post('/api/users/register').send({
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
  });

  // Register an admin user
  await request(app).post('/api/users/register').send({
    username: 'adminuser',
    email: 'admin@example.com',
    password: 'admin123',
  });

  // Login to get tokens
  const loginRes = await request(app).post('/api/users/login').send({
    email: 'testuser@example.com',
    password: 'password123',
  });
  token = loginRes.body.token;

  // Login as admin to get admin token
  const adminLoginRes = await request(app).post('/api/users/login').send({
    email: 'admin@example.com',
    password: 'admin123',
  });
  adminToken = adminLoginRes.body.token;
});

afterAll(async () => {
  await User.deleteMany({});
  await Application.deleteMany({});
  await mongoose.connection.close();
});

describe('Admin Routes', () => {
  // ✅ Test for viewing all applications (Admin only)
  it('should allow admin to view all applications', async () => {
    // Sending GET request to fetch all applications
    const res = await request(app)
      .get('/api/admin/applications')
      .set('Authorization', `Bearer ${adminToken}`); // Admin token

    // Check if applications are returned
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // Response should be an array
  });

  // 🔐 Test to ensure non-admin cannot access admin routes (view applications)
  it('should return 403 for non-admin users when accessing admin routes', async () => {
    const res = await request(app)
      .get('/api/admin/applications')
      .set('Authorization', `Bearer ${token}`); // Non-admin token

    expect(res.status).toBe(403);  // Forbidden
  });

  // ✅ Test for viewing all users (Admin only)
  it('should allow admin to view all users', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);  // Response should be an array
    expect(res.body[0]).toHaveProperty('email', 'admin@example.com'); // Admin user should be in the list
  });

  // 🔐 Test to ensure non-admin cannot access user list
  it('should return 403 for non-admin users when accessing user list', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${token}`); // Non-admin token

    expect(res.status).toBe(403); // Forbidden
  });
});
