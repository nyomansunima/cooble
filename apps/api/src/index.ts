import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello from code api!'))

export default app
