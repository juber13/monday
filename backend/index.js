import express from 'express'
import cors from 'cors'

const app = express()   
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended : true}))


let list = [
    {name : "list 1" ,  id: 1},
    {name : "list 2" ,  id: 2},
    {name : "list 3" ,  id: 3},
];

app.get("/" ,  (req , res) => {
    return res.status(200).json({data : list})
})


app.post("/add" , (req, res) => {
    const {name , id} = req.body;
    list.push({name , id})
    console.log(list)
    return res.status(201).json({data : list});
})


// app.patch('/update' , (req, res) => {
//     const {id , name} = req.body;
//     console.log(id)
//     // console.log(list[(id == list.length ? id - 1 : id)]);
//     list[id == list.length ? id - 1 : id].name = name;
    
//       /// this will give me the item

//       return res.status(200).json({
//         message : "Data Updated",
//         data : list
//       })

// })

app.patch("/update", (req, res) => {
  const { id, name } = req.body;
  const todoIndex = list.findIndex((item) => item.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  list[todoIndex].name = name;

  return res.status(200).json({
    message: "Data Updated",
    data: list,
  });
});


// app.delete('/delete' , (req , res) => {
//     const {id} = req.body;
//     // console.log(req.body)
//     console.log(id)

//     const newList =  list.filter(item => item.id !== id);
    
//     // id == 2
//     // [1,2,3,4]

//     // let removeItem = list.splice(id == list.length ? id - 1 : id , 1);   // first parameter should be from where we have to start  
//                         // second parameter should be from how much item we have to delete //
                     
//                         // third parameter should be 
//     // console.log(removeItem)
//     // console.log(list)
//     // const newItem = 
//    return res.status(201).json({data : newList}) 
// })


// 66e6b4aae9798f028a3d7bf

app.delete("/delete", (req, res) => {
  const { id } = req.body;

  // Ensure the ID is a number
  const todoId = parseInt(id, 10);

  // Filter out the todo with the given ID
  const newList = list.filter((item) => item.id !== todoId);

  // Update the list
  list = newList; // Update the original list if necessary

  return res.status(200).json({ data: list });
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
})