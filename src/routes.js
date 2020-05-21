import { Router } from'express'
import multer from 'multer'
import multerConfig from './config/multer'

import userController from './app/controller/UserController'
import SessionController from './app/controller/SessionController'
import fileController from './app/controller/fileController'
import authMiddleware from './app/middlewares/auth'
import ProviderController from './app/controller/ProviderController'
import AppointmentController from './app/controller/ApointmentController'
import ScheduleController from './app/controller/SheduleController'
import NotificationController from './app/controller/NotificationController'
import AvailableController from './app/controller/AvailableController'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', userController.store)
routes.post('/sessions', SessionController.store)


routes.use(authMiddleware)
routes.put('/users', userController.update)

routes.get('/providers', ProviderController.index)
routes.get('/providers/:providerId/available', AvailableController.index)

routes.get('/appointments', AppointmentController.index)
routes.post('/appointments', AppointmentController.store)
routes.delete('/appointments/:id', AppointmentController.delete)

routes.get('/shedule', ScheduleController.index)

routes.get('/notifications', NotificationController.index)
routes.put('/notifications/:id', NotificationController.update)

routes.post('/files',upload.single('file'),fileController.store)

export default routes
