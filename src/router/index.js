import {base, login, last} from './routes'
import newRouter from './router'

const router = newRouter([base, login, last])

export default router
