import login from '../pages/api/login';

describe('Login', () => {
  it('should return 405 if the method is not POST', async () => {
    const req = {
      method: 'GET'
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Method not allowed' });
  });

  it('should return 401 if the user does not exist', async () => {
    const req = {
      method: 'POST',
      body: {
        email: 'nonexistent@example.com',
        password: 'password123'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid email or password' });
  });

  it('should return 401 if the password is incorrect', async () => {
    const req = {
      method: 'POST',
      body: {
        email: 'user@example.com',
        password: 'wrongpassword'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid email or password' });
  });

  it('should return 200 when login is successful', async () => {
    const req = {
      method: 'POST',
      body: {
        email: 'test3@test.com',
        password: '12345'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
