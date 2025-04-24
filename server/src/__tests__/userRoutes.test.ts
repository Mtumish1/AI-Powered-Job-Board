import request from 'supertest';
import app from '../server'; 
import mongoose from 'mongoose';
import User from '../models/User';

let token: string;
let userId: string;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI || '', {});

  // Register a test user
  await request(app).post('/api/users/register').send({
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
  });

  // Login to get token
  const loginRes = await request(app).post('/api/users/login').send({
    email: 'testuser@example.com',
    password: 'password123',
  });

  token = loginRes.body.token;
  userId = loginRes.body.user._id || ''; // If you return user object in login response
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('User Routes', () => {
  // ✅ Test for fetching user profile
  it('should fetch user profile with valid token', async () => {
    // Sending GET request to fetch profile
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);  // Attach the token

    // Check for a successful response
    expect(res.status).toBe(200);  
    expect(res.body).toHaveProperty('email', 'testuser@example.com');  // Assert that the email matches
  });

  // 🔐 Unauthorized access attempt without token
  it('should return 401 if no token is provided', async () => {
    // Sending GET request without token
    const res = await request(app).get('/api/users/profile');
    
    // Check for unauthorized response
    expect(res.status).toBe(401);
  });

  // ✅ Test for updating user profile
  it('should update user profile', async () => {
    // Sending PUT request with updated data (username and email)
    const res = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'updateduser', email: 'updateduser@example.com' });

    // Check for a successful update
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('username', 'updateduser');
    expect(res.body).toHaveProperty('email', 'updateduser@example.com');
  });

  // 🔐 Test to check access to admin-only route (fetching all users)
  it('should return 403 for non-admin when accessing admin-only route', async () => {
    const res = await request(app)
      .get('/api/users/admin/users')  // Admin-only route
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(403);  // Expecting Forbidden access
  });

  // 🛠 Test for deleting a user by ID (admin route)
  it('should delete a user if admin access is granted', async () => {
    // Assuming admin route has been implemented and you have an admin user token
    const adminToken = 'admin-token';  // Replace with valid admin token
    const userIdToDelete = 'some-user-id';  // Replace with actual user ID to delete

    const res = await request(app)
      .delete(`/api/users/admin/users/${userIdToDelete}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'User deleted');
  });
});
