//-------- import express -------
const express = require("express");

const app = express();

// ----- parse data ------
app.use(express.json());

let authors = [
  {
    _id: 1,
    name: "John",
    lastname: "Doe",
    email: "j.doe@example.com",
    dob: "10/02/95",
    avatar: "https://picsum.photos/200",
  },
  {
    _id: 2,
    name: "Mario",
    lastname: "Rossi",
    email: "m.rossi@example.com",
    dob: "13/02/98",
    avatar: "https://picsum.photos/201",
  },
  {
    _id: 3,
    name: "Giuseppe",
    lastname: "Attivo",
    email: "g.attivo@example.com",
    dob: "16/06/95",
    avatar: "https://picsum.photos/202",
  },
];

// --------- welcome msj --------
app.get("/", (request, response) => {
  return response.send("Welcome!");
});

// --------- send json with authors --------
app.get("/authors", (request, response) => {
  return response.json(authors);
});

app.get("/authors/:id", (request, response) => {
  const id = request.params.id;
  //---------------------- from number to string => +id------
  const obj = authors.find((author) => author._id === +id);
  return response.json(obj);
});

// ----------- post request and generate an id for the new obj -------------
app.post("/authors", (request, response) => {
  const obj = request.body;
  obj._id = authors.length + 1;
  authors.push(obj);
  return response.status(201).json(obj);
});

app.delete("authors/:id", (request, response) => {
  const id = request.params.id;
  authors = authors.filter((author) => author._id != id);
  return response.status(200).json({});
});

app.put("authors/:id", (request, response) => {
  const id = request.params.id;
  const obj = request.body;
  const index = authors.findIndex((author) => author._id === +id);
  authors[index] = obj;
  return response.status(200).json(obj);
});
// --------- active server in port --------
app.listen(3001, () =>
  console.log("Server in port 3001! http://localhost:3001/")
);
