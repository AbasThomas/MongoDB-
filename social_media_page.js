db.users.insertMany([
  {
    username: "john_doe",
    email: "john@example.com",
    password: "hashed123",
    profilePic: "https://i.pravatar.cc/150?img=1",
    bio: "Coffee lover ☕",
    followers: [],
    following: [],
    createdAt: new Date()
  },
  {
    username: "jane_smith",
    email: "jane@example.com",
    password: "hashed456",
    profilePic: "https://i.pravatar.cc/150?img=2",
    bio: "Photography & travel 📸🌍",
    followers: [],
    following: [],
    createdAt: new Date()
  }
]);

//post

db.posts.insertMany([
  {
    userId: ObjectId("687bc8dfb42620bb8a546ae2"),
    content: "Enjoying a sunny day at the beach! 🌞🏖️",
    image: "https://example.com/beach.jpg",
    likes: [],
    comments: [],
    createdAt: new Date()
  },
  {
    userId: ObjectId("687bc8dfb42620bb8a546ae3"),
    content: "New camera day! 📷💥",
    image: "https://example.com/camera.jpg",
    likes: [],  
    comments: [],
    createdAt: new Date()
  }
]);

//comments

db.comments.insertMany([
  {
    postId: ObjectId("687bc9a0b42620bb8a546ae4"),
    userId: ObjectId("687bc8dfb42620bb8a546ae3"),
    text: "Looks amazing!",
    createdAt: new Date()
  },
  {
    postId: ObjectId("687bc9a0b42620bb8a546ae4"),
    userId: ObjectId("687bc8dfb42620bb8a546ae2"),
    text: "Wish I was there 😍",
    createdAt: new Date()
  }
]);

//messages 
db.messages.insertMany([
  {
    senderId: ObjectId("687bc8dfb42620bb8a546ae2"),
    receiverId: ObjectId("687bc8dfb42620bb8a546ae3"),
    text: "Hey! Want to hang out tomorrow?",
    createdAt: new Date()
  },
  {
    senderId: ObjectId("687bc8dfb42620bb8a546ae3"),
    receiverId: ObjectId("687bc8dfb42620bb8a546ae2"),
    text: "Sure! Let's go to the park.",
    createdAt: new Date()
  }
]);


// notifications 

db.notifications.insertMany([
  {
    userId: ObjectId("687bc8dfb42620bb8a546ae3"),
    sourceUserId: ObjectId("687bc8dfb42620bb8a546ae2"),
    type: "follow",
    read: false,
    createdAt: new Date()
  },
  {
    userId: ObjectId("687bc8dfb42620bb8a546ae2"),
    sourceUserId: ObjectId("687bc8dfb42620bb8a546ae3"),
    type: "like",
    postId: ObjectId("687bc9a0b42620bb8a546ae4"), // beach post
    read: false,
    createdAt: new Date()
  }
]);
