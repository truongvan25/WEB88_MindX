import express from "express";
import { v4 as uuidv4 } from 'uuid';


let students = [
    {
      id: '1',
      name: 'Alice Smith',
      gpa: 3.85,
      dob: '2004-03-15', // YYYY-MM-DD format
      address: '123 Maple Street, Springfield, IL 62704',
    },
    {
      id: '2',
      name: 'Bob Johnson',
      gpa: 3.21,
      dob: '2003-07-22',
      address: '456 Oak Avenue, Shelbyville, IL 62565',
    },
    {
      id: '3',
      name: 'Charlie Williams',
      gpa: 2.95,
      dob: '2004-11-01',
      address: '789 Pine Lane, Capital City, IL 62701',
    },
    {
      id: '4',
      name: 'Diana Brown',
      gpa: 4.0,
      dob: '2003-01-30',
      address: '101 Cherry Blvd, Ogdenville, IL 60512',
    },
    {
      id: '5',
      name: 'Ethan Jones',
      gpa: 3.55,
      dob: '2004-05-18',
      address: '222 Elm Drive, North Haverbrook, IL 61350',
    },
    {
      id: '6',
      name: 'Fiona Garcia',
      gpa: 3.7,
      dob: '2002-09-05',
      address: '333 Birch Court, Brockway, IL 61810',
    },
    {
      id: '7',
      name: 'George Miller',
      gpa: 2.5,
      dob: '2003-12-12',
      address: '444 Cedar Way, Springfield Heights, IL 62711',
    },
    {
      id: '8',
      name: 'Hannah Davis',
      gpa: 3.92,
      dob: '2004-08-25',
      address: '555 Willow Pass, Guidopolis, IL 60606',
    },
    {
      id: '9',
      name: 'Ian Rodriguez',
      gpa: 3.1,
      dob: '2002-06-10',
      address: '666 Aspen Trail, Waverly Hills, IL 62690',
    },
    {
      id: '10',
      name: 'Julia Martinez',
      gpa: 3.65,
      dob: '2003-04-02',
      address: '777 Redwood Place, Cypress Creek, IL 60010',
    },
  ];

const app = express();


/*

1. Viết API lấy thông tin của user với id được truyền trên params.

2. Viết API tạo user với các thông tin như trên users, với id là random (uuid), email là duy nhất, phải kiểm tra được trùng email khi tạo user.

3. Viết API lấy ra các bài post của user được truyền userId trên params.

4. Viết API thực hiện tạo bài post với id của user được truyền trên params.

*/

app.use(express.json());

app.get('/students', (req, res)=>{
    res.json({  
      data: students,
      pagination:{
        totalItem: students.length,
      }});
})

app.get('/students/:id', (req, res) =>{
  const {id} = req.params;
  const data = students.find((student)=>
    student.id === id
  );
  if (data){
    res.json({
      data: data,
      
    })
  }
  else{
    res.status(404).json({
      message: "Can not find data!"
    })
  }
})

app.post('/students/', (req, res)=>{
  
  const {name, gpa, dob, address} = req.body;
  if (!name || !gpa || !dob || !address){
    return res.status(400).json({
      message: "Invalid data to push",});
  }
  else{
    const newStudent = {
      id: uuidv4(),
      name,
      gpa,
      dob,
      address
    }
    students.push(newStudent);
    res.json({
      message: "Student is created successfully",
    });
  }
  
})

app.put('/students/:id', (req, res)=>{
  const{name, gpa, dob, address} = req.body;
  const {id:studentID} = req.params;
  if (!name || !gpa || !dob || !address){
    return res.status(400).json({
      message: "Invalid data form",});
  }
  const existStudent = students.findIndex(student=>student.id === studentID);
  if (existStudent === -1){
    return res.json({
      message: "Not find student",
    })
  }
  else {
    const updateStudent = {
      id: studentID,
      name, gpa, dob, address,
    };
    students[existStudent] = updateStudent;
    res.json(updateStudent);
  }
})

app.delete('/students/:id', (req, res)=>{
  const {id:studentID} = req.params;
  const existStudent = students.findIndex(student=>student.id === studentID);
  if (existStudent === -1){
    return res.json({
      message: "Not find student",
    })
  }
  else {
    students = students.filter((student)=>student.id !== studentID);
    res.json({
      message:"Delete successfully",
      data: students,
      pagination: students.length,
    })
  }

})

app.listen(PORT, ()=>{
  console.log(`Server is running at PORT ${PORT}`);
  
})