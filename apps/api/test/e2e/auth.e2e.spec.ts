import { request } from './support/request'

describe('Authentication', () => {
  it('Invalid Input', async () => {
    const input = {
      accessToken: '',
      idToken: '',
    }
    const res = await request.post('/auth/google').send(input)
    expect(res.status).toBe(402)
  })
})
