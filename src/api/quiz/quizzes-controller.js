import { MongoClient, ObjectId } from 'mongodb'

//create quiz
export async function create(req, res) {
  const quiz = req.body
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
  await db.collection('quizzes').insertOne(quiz)
  client.close()
  return res.status(200).json(quiz)
}

//list quizzes
export async function index(req, res) {
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
  const quizzes = await db.collection('quizzes').find({}).toArray()
  client.close()
  return res.status(200).json(quizzes)
}

//update quiz
export async function update(req, res) {
  const quiz = req.body
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
  const quizId = await db.collection('quizzes').findOne({ topic: quiz.topic })
  await db
    .collection('quizzes')
    .updateOne({ _id: ObjectId(quizId._id) }, { $set: quiz })
  client.close()
  return res.status(200).json(quiz)
}

//remove quiz
export async function remove(req, res) {
  const quizId = req.params.id
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
  await db.collection('quizzes').deleteOne({ _id: ObjectId(quizId) })
  client.close()
  return res.status(200).json('Quiz successfully deleted')
}

//read single quiz
export async function show(req, res) {
  const quizId = req.params.id
  console.log(quizId)
  console.log(req.params)
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
  const quiz = await db.collection('quizzes').findOne({ _id: ObjectId(quizId) })
  client.close()
  if (!quiz) {
    return res.status(404).json('Quiz could not be found')
  } else {
    return res.status(200).json(quiz)
  }
}
