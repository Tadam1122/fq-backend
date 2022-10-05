import quizRoutes from './api/quiz/quiz-routes'
import regRoutes from './api/register/register-routes'
import userRoutes from './api/user/user-routes'
import authRoutes from './api/auth/auth-routes'
import adminRoutes from './api/admin/admin-routes'
import gameRoutes from './api/game/game-routes'

export function registerRoutes(app) {
  app.use('/api', quizRoutes)
  app.use('/api', regRoutes)
  app.use('/api', userRoutes)
  app.use('/api', authRoutes)
  app.use('/api', adminRoutes)
  app.use('/api', gameRoutes)
}
