import request from 'supertest';
import { app } from '../server'; // Assuming the main Express app is exported here
import { IUser } from '../models/User'; // Assuming User model exists

describe('User Authentication', () => {
  let token: string;

  // Test user registration
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
      });

    expect(response.status).toBe(201); // Check for successful creation
    expect(response.body).toHaveProperty('token');
    token = response.body.token; // Capture token for later tests
  });

  // Test user login
  it('should login an existing user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  // Test protected route (example with a mock auth middleware)
  it('should return 401 for unauthenticated access', async () => {
    const response = await request(app).get('/api/jobs');

    expect(response.status).toBe(401); // Unauthorized access
  });

  it('should allow access with a valid token', async () => {
    const response = await request(app)
      .get('/api/jobs')
      .set('Authorization', `Bearer ${token}`); // Attach token in the Authorization header

    expect(response.status).toBe(200); // Job data should be returned
  });
});
