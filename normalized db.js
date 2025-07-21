// === Users ===
const thomasId = ObjectId();
const janeId = ObjectId();

db.users.insertMany([
  {
    _id: thomasId,
    username: "thomas",
    email: "thomas@example.com",
    bio: "Learning MongoDB!",
    createdAt: new Date()
  },
  {
    _id: janeId,
    username: "jane",
    email: "jane@example.com",
    bio: "Frontend dev",
    createdAt: new Date()
  }
]);

// === Posts ===
const post1Id = ObjectId();
const post2Id = ObjectId();

db.posts.insertMany([
  {
    _id: post1Id,
    userId: thomasId,
    content: "MongoDB is awesome!",
    media: [],
    createdAt: new Date()
  },
  {
    _id: post2Id,
    userId: janeId,
    content: "Hello world!",
    media: [],
    createdAt: new Date()
  }
]);

// === Comments ===
const comment1Id = ObjectId();

db.comments.insertOne({
  _id: comment1Id,
  postId: post1Id,
  userId: janeId,
  text: "I agree!",
  createdAt: new Date()
});

// === Likes ===
const like1Id = ObjectId();

db.likes.insertOne({
  _id: like1Id,
  postId: post1Id,
  userId: janeId,
  createdAt: new Date()
});
