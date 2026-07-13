import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userEntrance } from './routes/user'
import { blogBlobber } from './routes/blog'

const app = new Hono<{  }>()

app.use('/*', cors())

app.route('/api/v1/user', userEntrance)
app.route('/api/v1/blog', blogBlobber)


export default app
