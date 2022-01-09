# PLACE THIS FILE IN THE PROJECT FOLDER ROOT
$Database = Read-Host -Prompt 'Input your database name (first letter capitalized)'
$LowercaseDatabase = $Database.toLower()
$Collection = Read-Host -Prompt 'Input an initial collection name (first letter capitalized)'
$LowercaseCollection = $Collection.toLower()
npm init -y

# Back-end dependencies
npm i express mongoose cors
# Server directory & subdirectories
New-Item -Path . -Name "server" -ItemType Directory
New-Item -Path .\server -Name "config" -ItemType Directory
New-Item -Path .\server -Name "controllers" -ItemType Directory
New-Item -Path .\server -Name "models" -ItemType Directory
New-Item -Path .\server -Name "routes" -ItemType Directory


$ServerJSContent = @"
const express = require("express");
const cors = require("cors");

// Environment vars.
const port = 8000;
const db_name = "${Database}";
module.exports = db_name;

// Immediately execute the import mongoose.config.js function.
// require() statement basically reads a JavaScript file, executes it, and then proceeds to return the export object.
require("./config/mongoose.config")(db_name);

const app = express();

// req.body undefined without this!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require(``./routes/`${db_name.toLowerCase()}.routes``)(app);

app.listen(port, () =>
  console.log(``Listening on port `${port} for REQuests to RESpond to.``)
);
"@

New-Item -Path .\server -Name "server.js" -ItemType "file" -Value $ServerJSContent

$MongooseConfigJSContent =  @"
const mongoose = require("mongoose");
const port = 27017;

// Export a function to be called in server.js
module.exports = (db_name) => {
  mongoose.connect(``mongodb://127.0.0.1:`${port}/`${db_name}``, {
  })
  .then(() => console.log(``Successfully connected to `${db_name}``))
  .catch((err) => console.log(``mongoose connection to `${db_name} failed: `${err}``));
};
"@

New-Item -Path .\server\config -Name "mongoose.config.js" -ItemType "file" -Value $MongooseConfigJSContent

$ControllerContent = @"
// In our controller file, we export different functions that perform the basic
// CRUD operations using our User model.
// ${Collection} is a constructor function which can create new joke objects and also has other methods that will talk to the database!
// the .then() will only execute upon successfully inserting data in the database
// the .catch() will execute only if there is an error.

const ${Collection} = require('../models/${LowercaseCollection}.model');

module.exports.index = (req, res) => {
  res.json({
    message: "Hello World"
  });
}

module.exports.findAll${Collection}s = (req, res) => {
  ${Collection}.find() // retrieve an array of all documents in the collection
    .then(allDa${Collection}s => res.json({ ${LowercaseCollection}s: allDa${Collection}s }))
    .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.findOneSingle${Collection} = (req, res) => {
  ${Collection}.findOne({ _id: req.params.id })
    .then(oneSingle${Collection} => res.json({ ${LowercaseCollection}: oneSingle${Collection}}))
    .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.createNew${Collection} = (req, res) => {
  ${Collection}.create(req.body)
    // .then(res.json(${Collection}))
    .then(newlyCreated${Collection} => res.json({ ${LowercaseCollection}: newlyCreated${Collection} }))
    .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.updateExisting${Collection} = (req, res) => {
  ${Collection}.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  )
    .then(updated${Collection} => res.json({ ${LowercaseCollection}: updated${Collection} }))
    .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.deleteAnExisting${Collection} = (req, res) => {
  ${Collection}.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: 'Something went wrong', error: err }));
}
"@

New-Item -Path .\server\controllers -Name "${LowercaseCollection}.controller.js" -ItemType "file" -Value $ControllerContent

$ModelContent = @"
const mongoose = require("mongoose");
const db_name = require("../server");

const ${Database}Schema = new mongoose.Schema(
  {
  //  "setup": {
  //    type: String,
  //    required: [true, "Setup is required!"],
  //    minlength: [10, "Setup must be at least 10 characters long!"]
  //  },
  //  "punchline": {
  //    type: String,
  //    required: [true, "Punchline is required!"],
  //    minlength: [6, "Punchline must be at least 6 characters long!"]
  //  }
  },
  { timestamps: true } // Assigns createdAt and updatedAt fields
);

const ${Collection} = mongoose.model(db_name, ${Database}Schema);
module.exports = ${Collection};
"@

New-Item -Path .\server\models -Name "${LowercaseCollection}.model.js" -ItemType "file" -Value $ModelContent

$RoutesContent = @"
// import * as ${Collection}Controller from "../controllers/${LowercaseCollection}.controller";
const ${Collection}Controller = require('../controllers/${LowercaseCollection}.controller');

module.exports = (app) => {
  app.get('/api', ${Collection}Controller.index);
  app.get('/api/${LowercaseCollection}s', ${Collection}Controller.findAll${Collection}s);
  app.get('/api/${LowercaseCollection}s/:id', ${Collection}Controller.findOneSingle${Collection});
  app.put('/api/${LowercaseCollection}s/:id', ${Collection}Controller.updateExisting${Collection});
  app.post('/api/${LowercaseCollection}s', ${Collection}Controller.createNew${Collection});
  app.delete('/api/${LowercaseCollection}s/:id', ${Collection}Controller.deleteAnExisting${Collection});
}
"@

New-Item -Path .\server\routes -Name "${LowercaseCollection}.routes.js" -ItemType "file" -Value $RoutesContent

npx clear-npx-cache
npx create-react-app client

# Front-end dependencies
Set-Location client
npm i axios react-router-dom bootstrap

New-Item -Path .\src -Name "components" -ItemType Directory

$IndexJSPath = '.\src\index.js'

# Process lines of text from file and assign result to $NewContent variable
$NewContent = Get-Content -Path $IndexJSPath |
    ForEach-Object {
        # Output the existing line to pipeline in any case
        $_

        # If line matches regex
        if($_ -match ('^' + [regex]::Escape("import reportWebVitals from './reportWebVitals';")))
        {
            "import 'bootstrap/dist/css/bootstrap.css';"
        }
    }

# Write content of $NewContent variable back to file
$NewContent | Out-File -FilePath $IndexJSPath -Encoding Default -Force

$AppJSPath = '.\src\App.js'

$NewAppJSContent = Get-Content -Path $AppJSPath |
ForEach-Object {
  # Output the existing line to pipeline in any case
  $_

  # If line matches regex
  if ($_ -match ('^' + [regex]::Escape('<div className="App">'))) {
    "<Main />"
  }
}

# Write content of $NewAppJSContent variable back to file
$NewAppJSContent | Out-File -FilePath $AppJSPath -Encoding Default -Force

$MainContent = @"
import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Main() {
  const [message, setMessage] = useState("Loading...")
  useEffect(() => {
    axios.get("http://localhost:8000/api")
      .then(res => setMessage(res.data.message))
  }, []);
  return (
    <div>
      <h2>Message from the backend: { message }</h2>
    </div>
  )
}
export default Main;
"@

New-Item -Path .\src\components -Name "Main.jsx" -ItemType "file" -Value $MainContent

# New-Item -Path . -Name "directory name" -ItemType Directory
# New-Item -Path .\server -ItemType Directory

# Add-Type -AssemblyName System.Windows.Forms
# $FileBrowser = New-Object System.Windows.Forms.OpenFileDialog -Property @{ InitialDirectory = [Environment]::GetFolderPath('Desktop') }
# $Null = $FileBrowser.ShowDialog()

# New-Item -Path 'D:\temp\Test Folder' -ItemType Directory
