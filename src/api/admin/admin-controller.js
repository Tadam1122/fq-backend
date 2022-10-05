import { MongoClient, ObjectId } from 'mongodb'

//read single admin
export async function show(req, res) {
  const userId = req.params.id
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
  const admin = await db.collection('admins').findOne({ userId: userId })
  console.log(userId)
  client.close()
  if (!admin) {
    return res.status(404).json('admin could not be found')
  } else {
    return res.status(200).json(admin)
  }
}
