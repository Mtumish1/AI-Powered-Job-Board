
import request from 'supertest';
import app from '../server'; // Import the main app
import Job from '../models/Job';
import User from '../models/User';
import mongoose from 'mongoose';

let token: string;
let jobId: string;

beforeAll(async () => {
  // Connect to test DB
  await mongoose.connect(process.env.MONGO_TEST_URI || '', {});

  // Register a test recruiter user
  await request(app)
    .post('/api/users/register')
    .send({
      username: 'recruiter',
      email: 'recruiter@example.com',
      password: 'password123',
      role: 'recruiter',
    });

  // Login to get JWT token
  const res = await request(app)
    .post('/api/users/login')
    .send({
      email: 'recruiter@example.com',
      password: 'password123',
    });

  token = res.body.token;
});

afterAll(async () => {
  await Job.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Job Routes', () => {
  // Test: Post a new job
  it('should allow a recruiter to post a job', async () => {
    const res = await request(app)
      .post('/api/jobs/post-job')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Backend Developer',
        description: 'Build APIs',
        company: 'TechCorp',
        location: 'Remote',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    jobId = res.body._id; // Save job ID for later tests
  });

  // Test: Get all jobs
  it('should fetch all jobs', async () => {
    const res = await request(app).get('/api/jobs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test: Get job by ID
  it('should fetch a job by ID', async () => {
    const res = await request(app).get(`/api/jobs/${jobId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'Backend Developer');
  });

  // Test: Apply to job (authenticated)
  it('should allow a user to apply for a job', async () => {
    // Register a new user
    await request(app).post('/api/users/register').send({
      username: 'applicant',
      email: 'applicant@example.com',
      password: 'app1234',
    });

    // Login
    const login = await request(app).post('/api/users/login').send({
      email: 'applicant@example.com',
      password: 'app1234',
    });

    const applicantToken = login.body.token;

    const res = await request(app)
      .post(`/api/jobs/${jobId}/apply`)
      .set('Authorization', `Bearer ${applicantToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Application submitted');
  });

  // Test: Delete job (as admin/recruiter)
  it('should allow job deletion by recruiter', async () => {
    const res = await request(app)
      .delete(`/api/jobs/${jobId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Job deleted');
  });
});
