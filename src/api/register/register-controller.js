import { StringUtil } from '../../utilities/string-util'
import { MongoClient } from 'mongodb'
import argon2 from 'argon2'

//create user
export async function create(req, res) {
  const validation = validateIndex(req.body)
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message })
  }

  const user = {
    username: req.body.username.toLowerCase(),
    password: await argon2.hash(req.body.password),
    isAdmin: false,
  }

  //add user to database
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
  //check username to make sure its not already taken
  const userCheck = await db
    .collection('users')
    .findOne({ username: req.body.username.toLowerCase() })
  if (userCheck) {
    return res
      .status(409)
      .json({ message: `Username '${req.body.username}' already taken` })
  }
  //add new user
  await db.collection('users').insertOne(user)
  client.close()
  return res.status(200).json(user)
}

function validateIndex(body) {
  let errors = ''
  if (StringUtil.isEmpty(body.username)) {
    errors += 'Username required. '
  }
  if (StringUtil.isEmpty(body.password)) {
    errors += 'Password required. '
  }
  return {
    isValid: StringUtil.isEmpty(errors),
    message: errors,
  }
}
