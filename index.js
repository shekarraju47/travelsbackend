const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// const url = "mongodb://192.168.37.93:27017/Travels";

mongoose
  .connect(
    "mongodb+srv://shekarraju8:Shekar@cluster0.qkbxoh7.mongodb.net/chat?retryWrites=true&w=majority",
    // url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

// mongoose post method inputs types of schema
const travels = new mongoose.Schema({
  drivername: String,
  rc: { type: String, require: true },
  address: String,
  dateofjoining: { type: Date, default: Date.now },
  experience: String,
  aadhar: { type: Number, require: true },

  // type: { type: String, enum: ["credit", "debit"], required: true },
  // date: { type: Date, default: Date.now },
  // balance: Number,
});

const Travels = mongoose.model("Travels", travels);

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

// Get all transactions
app.get("/api/drivers", async (req, res) => {
  const drivers = await Travels.find();
  console.log(req);
  res.json(drivers);
});

// Add a new transaction and calculate the balance
app.post("/api/driver", async (req, res) => {
  console.log(req.body);

  const { drivername, rc, Dateofjoining, aadhar, address } = req.body;
  const driver = new Travels({
    drivername,
    rc,
    address,
    Dateofjoining,
    aadhar,
  });
  try {
    res.send(await driver.save());
  } catch (error) {
    console.log(error);
  }
});

// app.delete("/api/transactions/:id", async (req, res) => {
//   console.log(req.params);
//   try {
//     await Transaction.findByIdAndDelete({ _id: req.params.id });
//     res.status(200).send("delete SuccessFull");
//   } catch (error) {
//     res.status(400).send("something wrong");
//   }
// });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
