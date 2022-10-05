import { StringUtil } from '../../utilities/string-util'
import { MongoClient } from 'mongodb'
import argon2 from 'argon2'
import { generateJWT } from '../../services/auth-service'

export async function index(req, res) {
  console.log(process.env.MONGO_USER)
  const validation = validateIndex(req.body)
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message })
  }
  //check for user in db
  const client = await MongoClient.connect(
    process.env.MONGO_USER && process.env.MONGO_PASS
      ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.rlklw.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
      : 'mongodb://localhost:27017',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  const db = client.db(process.env.MONGO_DBNAME || 'pub-quiz')
  const user = await db
    .collection('users')
    .findOne({ username: req.body.username.toLowerCase() })
  //user not found
  if (!user) {
    return res
      .status(401)
      .json({ message: 'Username or password did not match' })
  }
  const pwMatch = await argon2.verify(user.password, req.body.password)
  //password did not match
  if (!pwMatch) {
    return res
      .status(401)
      .json({ message: 'Username or password did not match' })
  }
  client.close()
  const token = generateJWT(user)
  return res.status(200).json({ token: token })
}

function validateIndex(body) {
  let errors = ''
  if (StringUtil.isEmpty(body.username)) {
    errors += 'Username required. '
  }
  if (StringUtil.isEmpty(body.password)) {
    errors += 'Password required. '
  }
  // if (StringUtil.isEmpty(body.email)) {
  //   errors += 'Email required. '
  // }
  return {
    isValid: StringUtil.isEmpty(errors),
    message: errors,
  }
}
