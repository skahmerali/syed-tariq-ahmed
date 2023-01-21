// Requiring All  Modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 3000;
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// Databases Requires
const { SignUpUserModel } = require("./Database/signupdatabase");
const { AdmissionUserModel } = require("./Database/admissiondatbase"); 
const { DescModel } = require("./Database/descdatabase");
const { ContactUserModel } = require("./Database/contact");

// Calling express
const app = express();
// Express Uses
app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Conecting to Front End
app.use("/", express.static(path.resolve(path.join(__dirname, "public"))));

// Sign Up POST Request
app.post("/signUp", (req, res, next) => {
  // Model Of The Database finding one Of them Matchby email
  SignUpUserModel.findOne({ email: req.body.email }, (err, data) => {
    if (err || data) {
      // Making Satment for Email Cannot Match
      if (data.email === req.body.email) {
        //Sending Message to Fornt End With Status  Of 409
        res.status(409).send({
          message: "Please Make Another Account User Already Exists !",
        });
        return;
      }
    } else {
      // Using Bcryptjs for Generating a HASH Password
      // Generating Salts For HASH password
      const saltRounds = 12;
      bycrypt.genSalt(saltRounds, function (err, salt) {
        bycrypt.hash(req.body.password, salt, function (err, hash) {
          // Making The Schema for Getting All Information From The  Front  End and save it
          const newSignUpPerson = SignUpUserModel({
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
            confPassword: hash,
          });
          // Saving Sign Up User to The Data Base
          newSignUpPerson.save((err, data) => {
            if (req.body.password === req.body.confPassword) {
              // Sending Message to Fornt End With Status  Of 200
              res.status(200).send({
                message: "Sign Up SuccesFull !",
                data,
              });
            } else {
              res.status(405).send({
                // Sending Message to Fornt End With Status  Of 405
                message: "User creation Failed",
              });
            }
          });
        });
      });
    }
  });
});
// Making Login POST Request

app.post("/logIn", (req, res, next) => {
  SignUpUserModel.findOne({ email: req.body.email }, (err, data) => {
    if (data) {
      if (data.email === req.body.email) {
        // Breaking The HASH  Password For Checking The User Is Valid or Not Valid by comparing the old password to the req.body.password
        bycrypt.compare(req.body.password, data.password, (err, isFound) => {
          if (isFound) {
            var token = jwt.sign(
              {
                id: data._id,
                username: data.username,
                email: req.body.email,
                phone: data.phone,
                password: req.body.password,
                confPassword: data.confPassword,
              },
              "hIHkthjUhuvfhuiyvnjy7yii9trefhon",
              { expiresIn: "1h" }
            );
            res.cookie("jToken", token, {
              maxAge: 86_400_000,
              httpOnly: true,
            });
            const decodeData = jwt.verify(
              token,
              "hIHkthjUhuvfhuiyvnjy7yii9trefhon"
            );
            res.status(200).send({
              data: "Welcome To Our Website ! ",
              user_data_Secret: decodeData,
            });
          } else {
            //Sending Message to Fornt End With Status  Of 405
            res.status(405).send({
              message: "The Password Is Incorrect  !",
            });
          }
        });
      } else {
        //Sending Message to Fornt End With Status  Of 405
        res.status(405).send({
          message: "Email is Incorrect !",
        });
      }
    } else if (
      req.body.email === "syedtariqueahmed@admin.com" &&
      req.body.password === "syedtariqueahmed675443"
    ) {
      //Sending Message to Fornt End With Status  Of 201
      res.status(201).send({
        message: "Syed Tariq Ahmed  Admin Welcome To Admin Page !",
      });
    } else {
      //Sending Message to Fornt End With Status  Of 405
      res.status(405).send({
        message: "Inccorect !",
      });
    }
  });
});

// Making  The Admission POST Request For Adding Student

app.post("/Admission", (req, res, next) => {
  AdmissionUserModel.findOne({ email: req.body.email }, (err, data) => {
    if (err || data) {
      if (data.email === req.body.email) {
        //Sending Message to Fornt End With Status  Of 405
        res.status(405).send({
          message: "User Already Exists Please Make Another Email ID !",
        });
      }
    } else {
      const newAdmissionPerson = AdmissionUserModel({
        // Making The Schema for Getting All Information From The  Front  End and save it
        stDname: req.body.stDname,
        age: req.body.age,
        email: req.body.email,
        contactno: req.body.contactno,
        adress: req.body.adress,
        nationality: req.body.nationality,
        placeofBIrth: req.body.placeofBIrth,
        level: req.body.level,
      });
      // Saving Sign Up User to The Data Base
      newAdmissionPerson.save((err, data) => {
        if (!err) {
          //Sending Message to Fornt End With Status  Of 405
          var token = jwt.sign(
            {
              id: data._id,
              username: data.username,
              email: req.body.email,
              phone: data.phone,
              password: req.body.password,
              confPassword: data.confPassword,
            },
            "hIHkthjUhuvfhuiyvnjy7yii9trefhon",
            { expiresIn: "1h" }
          );
          res.cookie("A_DMI", token, {
            maxAge: 86_400_000,
            httpOnly: true,
          });
          const decodeData = jwt.verify(
            token,
            "hIHkthjUhuvfhuiyvnjy7yii9trefhon"
          );
        }
      });
    }
  });
});

app.get("/profile", (req, res, next) => {
  const token = req.cookies.jToken;
  const decode = jwt.verify(token, "hIHkthjUhuvfhuiyvnjy7yii9trefhon");
  res.send(decode);
});
app.get("/profiles", (req, res, next) => {
  const token = req.cookies.A_DMI;
  const decode = jwt.verify(token, "hIHkthjUhuvfhuiyvnjy7yii9trefhon");
  res.send(decode);
});

app.delete("/condelete/:id", (req, res) => {
  ContactUserModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).send({
        message: "Refresh Your Page !",
      });
    } else {
      res.status(500).send({
        message: "error",
        err,
      });
    }
  });
});
app.get("/condata", (req, res) => {
  // Finding all DATA from Database
  const data = ContactUserModel.find({}, (err, data) => {
    if (err) {
      // Sending Error If error
      res.send(err);
    } else {
      // Sending Data to the Front End
      res.send(data);
    }
  });
});
app.put("/Contactupdate/:id", (req, res) => {
  ContactUserModel.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        firstname: req.body.firstname,
        email: req.body.email,
        messgae: req.body.messgae,
      },
    }
  )
    .then((data) => {
      res.status(200).send({
        message: "User Updated !",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
});
// Making Get Requests for getting all data from Database

app.get("/descdata", (req, res) => {
  // Finding all DATA from Database
  const data = DescModel.find({}, (err, data) => {
    if (err) {
      // Sending Error If error
      res.send(err);
    } else {
      // Sending Data to the Front End
      res.send(data);
    }
  });
});

app.get("/admin", (req, res) => {
  // Finding all DATA from Database
  const data = SignUpUserModel.find({}, (err, data) => {
    if (err) {
      // Sending Error If error
      res.send(err);
    } else {
      // Sending Data to the Front End
      res.send(data);
    }
  });
});

app.get("/signupdata", (req, res) => {
  // Finding all DATA from Database
  const data = AdmissionUserModel.find({}, (err, data) => {
    if (err) {
      // Sending Error If error
      res.send(err);
    } else {
      // Sending Data to the Front End
      res.send(data);
    }
  });
});

// Making Delete Request For Deleting data From Database

app.delete("/delete/:id", (req, res) => {
  SignUpUserModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).send({
        message: "Refresh Your Page !",
      });
    } else {
      res.status(500).send({
        message: "error",
        err,
      });
    }
  });
});

app.put("/update/:id", (req, res) => {
  let updateObj = {};
  if (req.body.username) {
    updateObj.username = req.body.username;
  }
  if (req.body.email) {
    updateObj.email = req.body.email;
  }
  if (req.body.phone) {
    updateObj.phone = req.body.phone;
  }
  SignUpUserModel.findByIdAndUpdate(
    req.params.id,
    updateObj,
    { new: true },
    (err, data) => {
      if (!err) {
        res.status(200).send({
          message: "User Updated",
          data: data,
        });
      } else {
        res.status(500).send("error happened");
      }
    }
  );
});
app.delete("/admidelete/:id", (req, res) => {
  AdmissionUserModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).send({
        message: "Refresh Your Page !",
      });
    } else {
      res.status(500).send({
        message: "error",
        err,
      });
    }
  });
});

app.put("/admiupdate/:id", (req, res) => {
  let updateObj = {};
  if (req.body.stDname) {
    updateObj.stDname = req.body.stDname;
  }
  if (req.body.adminemail) {
    updateObj.adminemail = req.body.adminemail;
  }
  if (req.body.contact) {
    updateObj.contact = req.body.contact;
  }
  if (req.body.adress) {
    updateObj.adress = req.body.adress;
  }
  if (req.body.level) {
    updateObj.level = req.body.level;
  }
  AdmissionUserModel.findByIdAndUpdate(
    req.params.id,
    updateObj,
    { new: true },
    (err, data) => {
      if (!err) {
        res.status(200).send({
          message: "User Updated",
          data: data,
        });
      } else {
        res.status(500).send("error happened");
      }
    }
  );
});

app.post("/logout", (req, res, next) => {
  res.cookie("jToken", " ", {
    maxAge: 86_400_000,
    httpOnly: true,
  });
  res.status(200).send({
    message: "Logout Succesfully !",
  });
});

app.post("/desc", (req, res, next) => {
  const newDesc = DescModel({
    desc: req.body.desc,
    paradesc: req.body.paradesc,
    date: req.body.date,
  });
  newDesc.save((err, data) => {
    if (!err) {
      res.status(200).send({
        message: "You Description Has Send To the Page  !",
        data,
      });
    } else {
      res.status(405).send({
        message: "Could'nt Send Description",
      });
    }
  });
});
app.post("/contact", (req, res, next) => {
  ContactUserModel.findOne({ email: req.body.email }, (err, data) => {
    if (err || data) {
      if (data.email === req.body.email) {
        //Sending Message to Fornt End With Status  Of 405
        res.status(405).send({
          message: "User Already Exists Please Make Another Email ID !",
        });
      }
    } else {
      const newContactPerson = ContactUserModel({
        // Making The Schema for Getting All Information From The  Front  End and save it
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        messgae: req.body.messgae,
      });
      // Saving Sign Up User to The Data Base
      newContactPerson.save((err, data) => {
        if (!err) {
          //Sending Message to Fornt End With Status  Of 405
          res.status(200).send({
            message: "Your Form Has Been Submitted  !",
            data,
          });
        } else {
          //Sending Message to Fornt End With Status  Of 405
          res.status(405).send({
            message: "User creation Failed",
          });
        }
      });
    }
  });
});
app.listen(port, () => {
  console.log("Server is Running On PORT Number : ", port);
});
