const { query } = require("express");
const pool = require("../../database");
const service = require("./service");

// const getAllUsers = asyncasync => {
//   try {
//     await pool.query(service.getAllUsers, (error, results) => {
//       if (error) throw error;
//       res.status(200).json(results.rows);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// const getUserByID = asyncasync => {
//   const userId = parseInt(req.params.id);
//   await pool.query(service.getUserByID, [userId], (error, results) => {
//     if (error) throw error;
//     res.status(200).json(results.rows);
//   });
// };

// const addUser = asyncasync => {
//   const { name, id } = req.body;
//   pool.query(service.checkIdExists, [id], (error, results) => {
//     if (results.rows.length) {
//       res.send("Id has Already Existed");
//     }

//     pool.query(service.addUser, [name, id], (error, results) => {
//       if (error) throw error;
//       res.status(201).send("user has Been Created");
//     });
//   });
// };

// const deleteUser = asyncasync => {
//   const { id } = req.body;

//   pool.query(service.checkIdExists, [id], (error, results) => {
//     if (!results.rows.length) {
//       res.status(404).send("The user not found");
//     }

//     pool.query(service.deleteUser, [id], (error, results) => {
//       if (error) throw error;
//       res.status(202).send("The User has been Deleted");
//     });
//   });
// };

// const updateUser =async => {
//   const { name, id } = req.body;
//   pool.query(service.checkIdExists, [id], (error, results) => {
//     if (!results.rows.length) {
//       res.send("No User Found With this Id");
//     }
//     pool.query(service.updateUser, [name, id], (error, results) => {
//       res.status(201).send("The User Has Been Updated");
//     });
//   });
// };

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

// const addChat =async => {
//   try {
//     const { chat_id, chat } = req.body;
//     pool.query(service.checkChatIdExists, [chat_id], (error, results) => {
//       console.log(results);

//       if (!results.rowCount) {
//         res.send("The User Not Registred");
//       }
//       pool.query(service.addChat, [chat_id, chat], (error, results) => {
//         if (error) throw error;
//         res.status(201).send(results.rows);
//       });
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// const allUsersChat = async (req, res) => {
//   try {
//     await pool.query(service.getChats, (error, results) => {
//       if (error) throw error;
//       res.status(200).json(results.rows);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

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
  //addChat,
  getPersonToPersonChat,
  userLogin,
  // getAllUsers,
  // getUserByID,
  // addUser,
  // deleteUser,
  // updateUser,
  userRegister,
  usersData,

  personToPersonChat,
  deleteChat,
};
