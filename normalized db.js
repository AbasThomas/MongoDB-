use("socialmedia");
db.users.insertMany([
  {
    _id: ObjectId(),
    username: "thomas",
    email: "thomas@example.com",
    bio: "Learning MongoDB!",
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    username: "jane",
    email: "jane@example.com",
    bio: "Frontend dev",
    createdAt: new Date()
  }
]);


db.posts.insertMany([
  {
    _id: ObjectId(),
    userId: db.users.findOne({ username: "thomas" })._id,
    content: "MongoDB is awesome!",
    media: [],
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    userId: db.users.findOne({ username: "jane" })._id,
    content: "Hello world!",
    media: [],
    createdAt: new Date()
  }
]);


db.comments.insertMany([
  {
    _id: ObjectId(),
    postId: db.posts.findOne({ content: "MongoDB is awesome!" })._id,
    userId: db.users.findOne({ username: "jane" })._id,
    text: "I agree!",
    createdAt: new Date()
  }
]);


db.likes.insertMany([
  {
    _id: ObjectId(),
    postId: db.posts.findOne({ content: "MongoDB is awesome!" })._id,
    userId: db.users.findOne({ username: "jane" })._id,
    createdAt: new Date()
  }
]);
