db.users.insertMany([
  {
    _id: ObjectId(),
    username: "thomas",
    email: "thomas@example.com",
    bio: "Learning MongoDB!",
    createdAt: new Date(),
    posts: [
      {
        content: "My first post!",
        createdAt: new Date(),
        comments: [
          {
            username: "jane",
            text: "Nice post!",
            createdAt: new Date()
          }
        ],
        likes: ["jane"]
      }
    ],
    messages: [
      {
        to: "jane",
        text: "Hey Jane! Welcome here.",
        sentAt: new Date()
      }
    ]
  }
]);

?