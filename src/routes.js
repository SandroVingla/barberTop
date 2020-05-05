import { Router } from'express'
import multer from 'multer'
import multerConfig from './config/multer'

import userController from './app/controller/UserController'
import SessionController from './app/controller/SessionController'
import fileController from './app/controller/fileController'
import authMiddleware from './app/middlewares/auth'
import ProviderController from './app/controller/ProviderController'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', userController.store)
routes.post('/sessions', SessionController.store)


routes.use(authMiddleware)
routes.put('/users', userController.update)

routes.get('/providers', ProviderController.index)

routes.post('/files',upload.single('file'),fileController.store)

export default routes
