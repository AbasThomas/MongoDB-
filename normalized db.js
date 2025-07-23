use("socialmedia");

// ==== USERS ====
const thomasId = ObjectId();
const janeId = ObjectId();
const alexId = ObjectId();

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
  },
  {
    _id: alexId,
    username: "alex",
    email: "alex@example.com",
    bio: "Backend wizard",
    createdAt: new Date()
  }
]);

// ==== POSTS ====
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
    media: ["https://example.com/image1.jpg"],
    createdAt: new Date()
  }
]);

// ==== COMMENTS ====
const comment1Id = ObjectId();
const comment2Id = ObjectId();

db.comments.insertMany([
  {
    _id: comment1Id,
    postId: post1Id,
    userId: janeId,
    text: "I agree!",
    createdAt: new Date()
  },
  {
    _id: comment2Id,
    postId: post2Id,
    userId: alexId,
    text: "Nice photo!",
    createdAt: new Date()
  }
]);

// ==== LIKES ====
const like1Id = ObjectId();
const like2Id = ObjectId();

db.likes.insertMany([
  {
    _id: like1Id,
    postId: post1Id,
    userId: janeId,
    createdAt: new Date()
  },
  {
    _id: like2Id,
    postId: post2Id,
    userId: alexId,
    createdAt: new Date()
  }
]);

// ==== MESSAGES ====
const message1Id = ObjectId();
const message2Id = ObjectId();

db.messages.insertMany([
  {
    _id: message1Id,
    senderId: thomasId,
    receiverId: janeId,
    content: "Hey Jane, how’s it going?",
    createdAt: new Date()
  },
  {
    _id: message2Id,
    senderId: janeId,
    receiverId: thomasId,
    content: "All good! You?",
    createdAt: new Date()
  }
]);

// ==== FOLLOWERS ====
const follow1Id = ObjectId();
const follow2Id = ObjectId();

db.followers.insertMany([
  {
    _id: follow1Id,
    followerId: alexId,
    followingId: thomasId,
    createdAt: new Date()
  },
  {
    _id: follow2Id,
    followerId: janeId,
    followingId: alexId,
    createdAt: new Date()
  }
]);

// ==== NOTIFICATIONS ====
const notif1Id = ObjectId();
const notif2Id = ObjectId();

db.notifications.insertMany([
  {
    _id: notif1Id,
    userId: thomasId, 
    type: "like",
    fromUserId: janeId,
    postId: post1Id,
    message: "Jane liked your post",
    read: false,
    createdAt: new Date()
  },
  {
    _id: notif2Id,
    userId: janeId,
    type: "comment",
    fromUserId: alexId,
    postId: post2Id,
    message: "Alex commented on your post",
    read: false,
    createdAt: new Date()
  }
]);
