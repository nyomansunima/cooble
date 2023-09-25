import { Status } from 'oak'
import { requestApp } from '../support/request.ts'
import { describe, it } from 'std/testing/bdd.ts'

describe('Authentication', () => {
  it('Invalid input Google Authentication', async () => {
    const input = {
      idToken: '',
    }
    const request = await requestApp()
    await request.post('/auth/google').send(input).expect(Status.NotAcceptable)
  })

  it('Failed Google Authentication', async () => {
    const input = {
      accessToken: '',
      idToken: '',
    }
    const request = await requestApp()
    await request.post('/auth/google').send(input).expect(Status.BadRequest)
  })

  it('Invalid input Github Authentication', async () => {
    const input = {}
    const request = await requestApp()
    await request.post('/auth/github').send(input).expect(Status.NotAcceptable)
  })

  it('Failed Github Authentication', async () => {
    const input = {
      accessToken: '',
    }
    const request = await requestApp()
    await request.post('/auth/github').send(input).expect(Status.BadGateway)
  })
})
