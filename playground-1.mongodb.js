// /* global use, db */
// // MongoDB Playground
// // Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// const database = 'Aptech';
// // const collection = 'NEW_COLLECTION_NAME';


// use(database);


// // db.createCollection(collection);

// db.createCollection("Students", {
//     validator:{
//         $jsonSchema: {
//             bsonType: "object",
//             required: ["name", "email", "age", "department", "gender", "enrolledAt"],
//             properties: {
//                 name: {
//                 bsonType: "string",
//                 description: "Student name in full",
//                 },
//             email:{
//                 bsonType: "string",
//                 pattern: ".@. +$",
//                 description: "Must be a valid email address",
//             },
//             department: {
//                 bsonType: "string",
//                 description: "Department name",
//             },
//             age: {
//                 bsonType: "int",
//                 minimum: 14,
//                 maximum: 100,
//                 description: "Must be a valid email adress"
//             },
//             gender: {
//                 enum: ["male", "female"],
//                 description: "Gender must be male or female",
//             },
//             enrollment: {
//                 bsonType: 'date',
//                 description: 'Date of enrollment'
//             }
//         }
//     }
//     }
// }) ,

// db.students.insertOne({{
//     name: 'Tinubu Bola',
//     email: 'Bola@gmail.com',
//     department:'polictics',
//     age:73,
//     gender:'female',
//     enrolledAt:ISODate('2025-01-02')
// }});

// db.students.find() 

// // students enrolled in hr
// db.students.find({department:'HR'});

// // students that enrolled after jan1 2022
// db.students.find(enrolledAt:)

// // /students who are females
// db.students.find({gender:'female'})

// // find students older than 2022
// db.students.find({age:{$gt:22}})

// // show only student name and department
// db.students.find({}, {_id:0 ,name:1, department:1})

// // find students in either mathematics or hr
// db.students.find({department:'mathematics', department:'HR'})

// db.students.find({
//     department: {$in: ['mathematics','HR']}
// })


// // oldest student
// // db.students.find().sort((age: -1)).limit(1)

// // count total students in hr
// db.students.countDocuments({department:'HR'})

// // display students form hr and enroll after jan1 2022

// Set and use the database
const database = 'AbtechB2';
use(database);

//////////////////////////////////////////////////
// ✅ Create the students collection with schema //
//////////////////////////////////////////////////

db.createCollection('students', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "department", "gender", "enrollment", "age", "email"],
      properties: {
        name: {
          bsonType: "string",
          description: "Student's full name"
        },
        email: {
          bsonType: "string",
          pattern: ".@.+$",
          description: "Must be a valid email address"
        },
        department: {
          bsonType: "string",
          description: "Department is required"
        },
        age: {
          bsonType: "int",
          minimum: 14,
          maximum: 100,
          description: "Age must be between 14 and 100"
        },
        gender: {
          enum: ["male", "female"],
          description: "Gender must be either male or female"
        },
        enrollment: {
          bsonType: "date",
          description: "Date of enrollment"
        }
      }
    }
  }
});


////////////////////////////
// ✅ Insert Sample Data //
////////////////////////////

db.students.insertOne({
  name: "Okafu Bola",
  email: "indigo-missedbulletbola@gmail.com",
  age: 72,
  gender: "male",
  department: "politics",
  enrollment: ISODate("2022-05-15")
});

db.students.insertOne({
  name: "Michael Owen",
  department: "IT",
  age: 19,
  gender: "female",
  email: "michael@gmail.com",
  enrollment: ISODate("2022-01-01")
});


////////////////////////////
// ✅ Querying Documents //
////////////////////////////

db.students.find({ department: "politics" });
db.students.find({ enrollment: ISODate("2022-01-01") });
db.students.find();


//////////////////////////
// ✅ Updating Records //
//////////////////////////

// Update one student’s name
db.students.updateOne(
  { name: "Tinubu Bola" },
  { $set: { name: "Okafo Christen" } }
);

// Update many students' department
db.students.updateMany(
  { department: "politics" },
  { $set: { department: "Admin" } }
);

// Increase age by 1 for Michael Owen
db.students.updateOne(
  { name: "Michael Owen" },
  { $inc: { age: 1 } }
);

// Add "status" field to all students
db.students.updateMany(
  {},
  { $set: { status: "active" } }
);

// Add empty address object to all students
db.students.updateMany(
  {},
  {
    $set: {
      address: {
        city: "",
        state: "",
        country: ""
      }
    }
  }
);

// Update department using findOneAndUpdate and return updated document
db.students.findOneAndUpdate(
  { name: "Okafo Christen" },
  { $set: { department: "HR" } },
  { returnNewDocument: true }
);

// Update status by _id
db.students.updateOne(
  { _id: ObjectId("687078e0adc5bfee5268d61f") },
  { $set: { status: "inactive" } }
);


//////////////////////
// ✅ Delete records //
//////////////////////

// Delete all students enrolled after Jan 1, 2024
db.students.deleteMany({
  enrollment: { $gt: ISODate("2024-01-01") }
});



///////////////////////////////////////////////////
// ✅ Create the courses collection with schema //
///////////////////////////////////////////////////

db.createCollection('courses', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["courseName", "courseCode", "credits", "departmentId"],
      properties: {
        courseName: {
          bsonType: "string",
          description: "Name of the course is required"
        },
        courseCode: {
          bsonType: "string",
          description: "Course code is required"
        },
        credits: {
          bsonType: "int",
          minimum: 1,
          maximum: 6,
          description: "Credits must be between 1 and 6"
        },
        departmentId: {
          bsonType: "objectId",
          description: "Reference to the department"
        }
      }
    }
  }
});


///////////////////////////////////////////////////////
// ✅ Create the departments collection with schema //
///////////////////////////////////////////////////////

db.createCollection('departments', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["departmentName", "faculty"],
      properties: {
        departmentName: {
          bsonType: "string",
          description: "Department name is required"
        },
        faculty: {
          bsonType: "string",
          description: "Faculty is required"
        },
        headOfDepartment: {
          bsonType: "string",
          description: "Head of the department is required"
        }
      }
    }
  }
});
    