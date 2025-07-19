/* global use, db */
// MongoDB Playground

const database = 'AbtechB2';
// const collection = 'NEW_COLLECTION_NAME';

use(database);


db.createCollection('students', 
    
    {
    validator:{
        $jsonSchema:{
            bsonType:"object",
            required:["name","department","gender","enrollment","age","email"],
            properties:{
                name:{
                    bsonType:"string",
                description:"students name in full",
                },
                email:{
                    bsonType:"string",
                    pattern:".@.+$",
                    description:'must be a valid email address'   ,  
                },
                department:{
                    bsonType:"string",
                    description:"department name is required",
                },
                age:{
                    bsonType:"int",
                    minimum:14,
                    maximum:100,
                    description:"Age must be a valid integer between 14 and 100",
                },
                gender:{
                    enum:["male","female"],
                    description:"Gender must be either male or female",
                },
                enrollment:{
                    bsonType:"date",
                    description:"date of enrollment",
                }
            }
        }

    }
})


db.students.insertOne({{
    name:"okafu Bola",
    email:"indigo-missedbulletbola@gmail.com",
    age:"72",
    gender:"male",
    department:"politics",
    enrollment:ISODate('2022-05-15')
}})

db.students.insertOne({
{
    name:"Michael owen",
    department:"it",
    age:19,
    gender:"female",
    email:"michael@gmail.com"
    enrollment: ISODate(2022-01-01)
}})

db.students.find({department:"politics"})

db.students.find({enrollment:ISODate(2022-01-01)})


//upadate

db.students.find()

db.students.updateOne({name:"Tinubu Bola"},
    {$set:{name:"Okafo Christen"}}
)

db.students.updateMany(
    {department:"politics"},
    {$set:{department:"Admin"}}
)
db.students.insertOne(

)
//increse age by 1 for student owen

db.students.updateMany(
    {name:"Tinubu bola"},
    {$inc:{age:1}}
)

db.students.updateMany(
    {},{$set:{status:"active"}}
)



db.students.updateMany(
    {},{$set:{
        address:{
            city:"",
            state:"",
            country:""
        }
    }
    }
);


db.students.findOneAndUpdate(
    {name:"Okafo Christen"},
    {$set:{department:"HR"}},
    {returnDocument:"after"}
)


db.students.updateOne({_id:ObjectId("687078e0adc5bfee5268d61f")},
    {$set:{status:"inactive"}},)
// delete enrolled after jan 1st 2024
    db.students.find()
    db.students.deleteMany({})

    db.createCollection('courses', {
        validator:{
            $jsonSchema:{
                bsonType:"object",
                required:["courseName","courseCode","credits","departmentId"],
                properties:{
                    courseName:{
                        bsonType:"string",
                        description:"Name of the course is required"
                    },
                    courseCode:{
                        bsonType:"string",
                       
                    },
                    credits:{
                        bsonType:"int",
                        minimum:1,
                        maximum:6,
                        description:"Credits must be an integer between 1 and 6"
                    },
                    departmentId:{
                        bsonType:"objectId",
                        description:"Reference to the department this course belongs to"
                    }
                }
            }

        }
    })
    db.createCollection('departments', {
        validator:{
            $jsonSchema:{
                bsonType:"object",
                required:["departmentName","faculty",],
                properties:{
                    departmentName:{
                        bsonType:"string",
                        description:"Name of the department is required"
                    },
                    headOfDepartment:{
                        bsonType:"string",
                        description:"Head of the department is required"
                    }
                }
            }
       }
    })



db.courses.insertMany([
  {
    title: "Data Structures",
    code: "CSC201",
    unit: 3,
    departmentId: ObjectId("YOUR_CS_DEPT_ID")
  },
  {
    title: "Introduction to Accounting",
    code: "ACC101",
    unit: 2,
    departmentId: ObjectId("YOUR_ACC_DEPT_ID")
  },
  {
    title: "Thermodynamics",
    code: "MEE203",
    unit: 3,
    departmentId: ObjectId("YOUR_MECH_DEPT_ID")
  },
  {
    title: "News Writing",
    code: "MCM102",
    unit: 2,
    departmentId: ObjectId("YOUR_COMM_DEPT_ID")
  },
  {
    title: "Organizational Behaviour",
    code: "HRM205",
    unit: 3,
    departmentId: ObjectId("YOUR_HR_DEPT_ID")
  }
]);


db.departments.insertMany([
  { name: "Computer Science", faculty: "Science" },
  { name: "Accounting", faculty: "Management" },
  { name: "Mechanical Engineering", faculty: "Engineering" },
  { name: "Mass Communication", faculty: "Arts" },
  { name: "Human Resources", faculty: "Social Sciences" }
]);

db.sales.insertMany([
  { item: "iPhone", category: "Electronics", price: 900, quantity: 2, date: new Date("2024-01-10") },
  { item: "MacBook", category: "Electronics", price: 1500, quantity: 1, date: new Date("2024-01-12") },
  { item: "TV", category: "Electronics", price: 1200, quantity: 3, date: new Date("2024-02-10") },
  { item: "Book - Python", category: "Books", price: 45, quantity: 5, date: new Date("2024-02-12") },
  { item: "Book - MongoDB", category: "Books", price: 50, quantity: 4, date: new Date("2024-03-15") },
  { item: "Shoes", category: "Fashion", price: 120, quantity: 2, date: new Date("2024-03-20") },
  { item: "T-Shirt", category: "Fashion", price: 40, quantity: 6, date: new Date("2024-04-01") },
  { item: "Washing Machine", category: "Home", price: 800, quantity: 1, date: new Date("2024-04-04") },
  { item: "Sofa", category: "Home", price: 1000, quantity: 1, date: new Date("2024-04-10") },
  { item: "Microwave", category: "Home", price: 250, quantity: 2, date: new Date("2024-05-01") },
  { item: "Book - AI", category: "Books", price: 60, quantity: 3, date: new Date("2024-05-05") },
  { item: "Book - JavaScript", category: "Books", price: 55, quantity: 4, date: new Date("2024-05-10") },
  { item: "Trousers", category: "Fashion", price: 90, quantity: 3, date: new Date("2024-06-01") },
  { item: "iPad", category: "Electronics", price: 850, quantity: 1, date: new Date("2024-06-05") },
  { item: "Book - Data Science", category: "Books", price: 70, quantity: 2, date: new Date("2024-06-10") }
]);


db.sales.aggregate([
    {
        $cate
    }
])

// total rev for all the sales


// total revenue per category
db.sales.aggregate([
    {
        $project{
            category:1, revenue:{multiply:['$price', '$quantity']}
        }
    },
    {
           {
            $group:{
                _id:'$category',
                totalRevenue:{$sum:'revenue'}
            }
        }
    }
])

// total Quantity sold per item

db.sales.aggregate([
    {
        $group(
            _id:'$item',
            category:{$sum : '$quantity'}
        )   
    }
])

// average price per category

db.sales.aggregate([
    {
        $group(
            _id:'$category',
            avgPrice:{$avg : '$price'}
        )   
    }
])

// most expensive items sold

db.sales.aggregate([
    {
        $sort;{price -1}
    },
    {$limit:1}
])

// sales made in april only

db.sales.aggregate([
    {
        $match:{
            date:{
                $gte:new Date{'2024-04-01'}
                $lt:new Date{'2024-05-01'}
            }
        }
    }
])

// total no of sales per month


// Ecommerce database
db.sales.aggregate([
    {
        $group:{
            _id:{$month: '$date'},
            saleCount:{$sum:1}
        }
    }
])


// sort item by total revenue
db.sale.aggregate([
    {
        $project:{
            {
                item:1
                revenue:
            }
        }
    }
])
//lsit all items with quantity greater than 3

db.sale.aggregate([
    {
        $match{
            quantity:{$gt:3}
        }
    }
])
// total revenue per itesm  only for electronics
db.sales.aggregate([
  {
    $match: { category: "Electronics" } // Filter only electronics
  },
  {
    $project: {
      item: 1,
      revenue: { $multiply: ["$price", "$quantity"] } // Calculate revenue
    }
  },
  {
    $group: {
      _id: "$item",
      totalRevenue: { $sum: "$revenue" }
    }
  },

]);

//find items with highest quantity sold
db.sales.aggregate([
  {
    $group: {
      _id: null,
      maxQty: { $max: "$quantity" }
    }
  }
]);


//list all items and show the rev in a new field

db.sales.aggregate([
  {
    $project: {
      item: 1,
      category: 1,
      price: 1,
      quantity: 1,
      date: 1,
      revenue: { $multiply: ["$price", "$quantity"] }
    }
  }
]);

// find books that sold more than 3 unitss 
db.sales.find({
  category: "Books",
  quantity: { $gt: 3 }
});

//monthly revenue breakdown

const database = 'EcommerceDB'
use (database);

//user


// db.users.insertOne
db.User.insertMany([
   {
        firstName:'abas',
        lastName:'Thomas',
        role:'Admin',
        password:'thom@123',
        shippingAddress:{
            street:'Rivers',
            city:'Portsan',
            country:'Nigeria',
        }
    },
    {
        firstName:'george',
        lastName:'greg',
        role:'user',
        password:'thom@123',
        shippingAddress:{
            street:'ebo',
            city:'Portsan',
            country:'ghana',
        }
    }
]);

// PRODUCTS 

db.products.insertMany([
    {
        name: 'iPhone',
        description: 'iphone 16 pro max',
        price: '3000',
        category: 'electronics',
        stock:'in stock',
        images: ""
    },
    {
        name: 'macbook',
        description: 'iphone 16 pro max',
        price: '5000',
        category: 'electronics',
        stock:'out of stock',
        images: ""
    }
])

// REVIEWS
db.reviews.insertMany([
    {
        productId: "",
        userId: "",
        rating: 4.5,
        comment: "very Nice product",
        createdAt: new Date("2024-02-10") 
    },

    {
        productId: "",
        userId: "",
        rating: 4.5,
        comment: "very Nice product",
        createdAt: new Date("2024-02-10") 
    }

]);
// ORDERS
db.orders.insertMany([
    {
        userId: "",
        products: {
            items:{
                properties: {
                    productId: "",
                    name: 'iPhone',
                    price: '3000',
                    quantity:'1'                
                },
                properties: {
                    productId: "",
                    name: 'Macbook',
                    price: '5000',
                    quantity:'1'
                },
            },
        },
        totalAmount: 2,
        orderDate: new Date("2024-02-10"),
        status: 'successful',
        shippingAddress:{
            street:'Rivers',
            city:'Portsan',
            country:'Nigeria',
        },
        paymentId:""
    },

    {
        userId: "",
        products: {
            items:{
                properties: {
                    productId: "",
                    name: 'iPhone',
                    price: '3000',
                    quantity:'1'                
                },
                properties: {
                    productId: "",
                    name: 'Macbook',
                    price: '5000',
                    quantity:'1'
                },
            },
        },
        totalAmount: 2,
        orderDate: new Date("2024-02-10"),
        status: 'successful',
        shippingAddress:{
            street:'Rivers',
            city:'Portsan',
            country:'Nigeria',
        },
        paymentId:"",
    }
])
// PAYMENTS
db.payments.insertMany([
    {
        userId:'',
        orderId:'',
        amount:'1500',
        method:'Card',
        status:'Pending',
        createdAt: new Date("2024-01-12")
    },
    {
        userId:'',
        orderId:'',
        amount:'1200',
        method:'Transfer',
        status:'declined',
        createdAt: new Date("2024-01-12")
    },
    {
        userId:'',
        orderId:'',
        amount:'3000',
        method:'paypal',
        status:'successful',
        createdAt: new Date("2024-01-12")
    },

])
db.cart.insertOne([
    {
        userId:'',
        items:{
            {
                productId:'',
                name:'Iphone 16 blue',
                quantity:2,
                price: 1500,
            },
            {
                productId:'',
                name:'Iphone 14 gold',
                quantity:1,
                price: 1500,
            }          
        },
        totalAmount:3000,
        UpdatedAt:date: new Date("2024-02-10")

    }
])

