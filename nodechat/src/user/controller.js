const { query } = require("express");
const pool = require("../../database");
const service = require("./service");

//user register
const userRegister = async (req, res) => {
  try {
    const { id, email_id, user_name, password, created_at } = req.body;
    await pool.query(service.checkuserIdExists, [id], (error, results) => {
      if (results.rows.length) {
        res.status(400).send("The User's is Already Existed");
      }
      pool.query(
        service.userRegister,
        [id, email_id, user_name, password, created_at],
        (error, results) => {
          if (error) throw error;

          res.status(201).send(results.rows);
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
};

//user login
const userLogin = async (req, res) => {
  try {
    const { user_id, email_id, password } = req.body;
    await pool.query(
      service.checkuserIdExists,
      [email_id],
      (error, results) => {
        // if (!results.rowCount) {
        //   res.send("The User Has Not Registred yet..!");
        // }
        pool.query(
          service.userLogin,
          [user_id, email_id, password],
          (error, results) => {
            if (error) throw error;
            res.status(200).send(results.rows);
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//usersData
const usersData = async (req, res) => {
  try {
    await pool.query(service.usersData, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
  }
};

//users chat
const personToPersonChat = async (req, res) => {
  try {
    const { chat_id, sender_id, receiver_id, chat, created_at } = req.body;
    await pool.query(
      service.personToPersonChat,
      [chat_id, sender_id, receiver_id, chat, created_at],
      (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//get users chat
const getPersonToPersonChat = async (req, res) => {
  try {
    const { sender_id, receiver_id } = req.body;

    await pool.query(
      service.getPersonToPersonChat,
      [sender_id, receiver_id],
      (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//delete user chat
const deleteChat = async (req, res) => {
  try {
    const { chat_id, sender_id } = req.body;
    await pool.query(
      service.deleteChat,
      [chat_id, sender_id],
      (error, result) => {
        if (error) throw error;
        res.status(200).json("The Chat has been deleted successfully");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  userLogin,
  userRegister,
  usersData,
  personToPersonChat,
  getPersonToPersonChat,
  deleteChat,
};
