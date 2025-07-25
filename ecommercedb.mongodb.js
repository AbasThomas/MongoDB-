use("ecommerce");

db.users.insertMany([
  { _id: 1, name: "Alice", email: "alice@example.com", address: "Lagos", phone: "08012345678" },
  { _id: 2, name: "Bob", email: "bob@example.com", address: "Abuja", phone: "08023456789" },
  { _id: 3, name: "Charlie", email: "charlie@example.com", address: "Kano", phone: "08034567890" },
  { _id: 4, name: "Diana", email: "diana@example.com", address: "Port Harcourt", phone: "08045678901" },
  { _id: 5, name: "Ethan", email: "ethan@example.com", address: "Ibadan", phone: "08056789012" },
  { _id: 6, name: "Fiona", email: "fiona@example.com", address: "Benin", phone: "08067890123" },
  { _id: 7, name: "George", email: "george@example.com", address: "Kaduna", phone: "08078901234" },
  { _id: 8, name: "Hannah", email: "hannah@example.com", address: "Jos", phone: "08089012345" },
  { _id: 9, name: "Isaac", email: "isaac@example.com", address: "Owerri", phone: "08090123456" },
  { _id: 10, name: "Jane", email: "jane@example.com", address: "Enugu", phone: "08001234567" }
]);


db.products.insertMany([
  { _id: 1, name: "Laptop", category: "Electronics", price: 250000 },
  { _id: 2, name: "Smartphone", category: "Electronics", price: 150000 },
  { _id: 3, name: "Headphones", category: "Accessories", price: 25000 },
  { _id: 4, name: "Backpack", category: "Fashion", price: 12000 },
  { _id: 5, name: "Wristwatch", category: "Fashion", price: 18000 },
  { _id: 6, name: "Shoes", category: "Fashion", price: 22000 },
  { _id: 7, name: "Book", category: "Education", price: 3500 },
  { _id: 8, name: "Tablet", category: "Electronics", price: 110000 },
  { _id: 9, name: "Power Bank", category: "Accessories", price: 8000 },
  { _id: 10, name: "Keyboard", category: "Electronics", price: 18000 }
]);

db.orders.insertMany([
  { _id: 1, userId: 1, productId: 1, quantity: 1, orderDate: new Date("2024-07-01") },
  { _id: 2, userId: 2, productId: 2, quantity: 2, orderDate: new Date("2024-07-02") },
  { _id: 3, userId: 3, productId: 3, quantity: 3, orderDate: new Date("2024-07-03") },
  { _id: 4, userId: 4, productId: 4, quantity: 1, orderDate: new Date("2024-07-04") },
  { _id: 5, userId: 5, productId: 5, quantity: 2, orderDate: new Date("2024-07-05") },
  { _id: 6, userId: 6, productId: 6, quantity: 2, orderDate: new Date("2024-07-06") },
  { _id: 7, userId: 7, productId: 7, quantity: 4, orderDate: new Date("2024-07-07") },
  { _id: 8, userId: 8, productId: 8, quantity: 1, orderDate: new Date("2024-07-08") },
  { _id: 9, userId: 9, productId: 9, quantity: 2, orderDate: new Date("2024-07-09") },
  { _id: 10, userId: 10, productId: 10, quantity: 1, orderDate: new Date("2024-07-10") }
]);

//list all ordrs with users and product details
db.users.drop();
db.products.drop();
db.orders.drop();

db.orders.aggregate([
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user'
    }
  },
  {
    $unwind: '$user'
  },
  {
    $lookup: {
      from: 'products',
      localField: 'productId',
      foreignField: '_id',
      as: 'product'
    }
  },
  {
    $unwind: '$product'
  },
  {
    $project: {
      _id: 0,
      customer: '$user.name',
      email: '$user.email',
      address: '$user.address',
      phone: '$user.phone',
      product: '$product.name',
      category: '$product.category',
      price: '$product.price',
      quantity: 1,
      total: { $multiply: ['$quantity', '$product.price'] },
      orderDate: 1
    }
  }
])

//users who ordered electronics

db.orders.aggregate([
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'UserDetails'
    }
  },
  {
    $unwind: 'UserDetails'
  },
  {
    $lookup: {
      from: 'products',
      localField: 'ProductId',
      foreignField: '_id',
      as: 'Products'
    }
  },
  {$unwind:'Products'},

  {
    $match: {
       'products.category':'Electronics' 
    }
  },
  {
    $project: {
      _id: 0,
      customer: '$user.name',
      email: '$user.email',
      product: '$product.name',
      category: '$product.category',
      price: '$product.price',
      quantity: 1,
      orderDate: 1
    }
  }])

  //total revenue per product
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "product"
    }
  },
  { $unwind: "$product" },
  {
    $group: {
      _id: "$product.name",
      totalRevenue: { $sum: { $multiply: ["$quantity", "$product.price"] } }
    }
  },
  { $sort: { totalRevenue: -1 } }
])

///which userss ordered more than 1 item in a single order

db.orders.aggregate([
  { $match: { quantity: { $gt: 1 } } },
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $project: {
      _id: 0,
      user: "$user.name",
      email: "$user.email",
      quantity: 1
    }
  }
])

// top highest spending users

db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "product"
    }
  },
  { $unwind: "$product" },
  {
    $group: {
      _id: "$userId",
      totalSpent: { $sum: { $multiply: ["$quantity", "$product.price"] } }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $project: {
      _id: 0,
      name: "$user.name",
      email: "$user.email",
      totalSpent: 1
    }
  },
  { $sort: { totalSpent: -1 } }
])

//limit users who ordered fashion items
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "product"
    }
  },
  { $unwind: "$product" },
  { $match: { "product.category": "Fashion" } },
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $project: {
      _id: 0,
      name: "$user.name",
      email: "$user.email",
      item: "$product.name"
    }
  },
  { $limit: 5 }
])

//totql number of orders per product
db.orders.aggregate([
  {
    $group: {
      _id: "$productId",
      totalOrders: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "product"
    }
  },
  { $unwind: "$product" },
  {
    $project: {
      _id: 0,
      product: "$product.name",
      totalOrders: 1
    }
  }
])

//users from lagos who placed orders

db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  { $match: { "user.address": "Lagos" } },
  {
    $project: {
      _id: 0,
      name: "$user.name",
      email: "$user.email",
      orderDate: 1
    }
  }
])

//revenue generated by each category

db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "product"
    }
  },
  { $unwind: "$product" },
  {
    $group: {
      _id: "$product.category",
      totalRevenue: { $sum: { $multiply: ["$quantity", "$product.price"] } }
    }
  },
  {
    $project: {
      _id: 0,
      category: "$_id",
      totalRevenue: 1
    }
  },
  { $sort: { totalRevenue: -1 } }
])

//orders placed in the first week of july 2024

db.orders.aggregate([
  {
    $match: {
      orderDate: {
        $gte: new Date("2024-07-01"),
        $lt: new Date("2024-07-08")
      }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $project: {
      _id: 0,
      customer: "$user.name",
      orderDate: 1,
      productId: 1,
      quantity: 1
    }
  }
])
