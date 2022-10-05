import { generateJWT } from '../../services/auth-service'

export async function index(req, res) {
  const userData = req.body
  const token = generateJWT(userData)
  return res.status(200).json({ token: token })
}
