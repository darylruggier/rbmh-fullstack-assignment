import { hashPassword } from '../lib/hashAndSalt';
import register from '../pages/api/register';

describe('Register', () => {
  const email = 'test@example.com';
  const password = 'testpassword';
  const firstName = 'Test';
  const country = 'Malta';

  afterEach(async () => {
    // delete any users created during the test
    await prisma.user.deleteMany({
      where: {
        email: email
      }
    });
  });

  it('should create a new user and return 200 when given valid credentials', async () => {
    const req = {
      method: 'POST',
      body: {
        email: email,
        password: password,
        first_name: firstName,
        country: country
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(200);

    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    expect(user).not.toBeNull();
    expect(user?.email).toBe(email);
    expect(user?.first_name).toBe(firstName);
    expect(user?.country).toBe(country);
  });
});
