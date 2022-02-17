const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "me",
  password: "password",
  database: "api",
});

function home(req, res){
    res.json({ info: "Node.js, Express, and Postgres API" });
}

function getUsers(req, res) {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, result) => {
    if (error) {
      console.error(error);
      res.json({ msg: "error occured" });
    } else res.status(200).json(result.rows);
  });
}

function getUser(req, res){
    const id = parseInt(req.params.id);
    pool.query(`SELECT * FROM users WHERE id =  $1`, [id], (error, result)=>{
        if (error) {
          console.error(error);
          res.json({ msg: "error occured" });
        } else res.status(200).json(result.rows);
    })
}

function createUser(req, res){
    const {name, email} = req.body;
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, result)=>{
        if (error) {
          console.error(error);
          res.json({ msg: "error occured" });
        } else res.status(201).json(result);
    })
}

function updateUser(req, res){
    const id = parseInt(req.params.id);
    const {name, email} = req.body;
    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3', 
        [name, email, id],
        (error, result)=>{
          if (error) {
            console.error(error);
            res.json({ msg: "error occured" });
         } 
        else 
            res.status(200).json(`rows updated ${result.rowCount}`);
        }
    )
}

function deleteUser(req, res){
    const id = parseInt(req.params.id);
    pool.query(
        'DELETE FROM users WHERE id = $1',
        [id],
        (error, result) =>{
            if(error){
                console.error(error);
                res.status(500).json({msg : 'error occured'})
            }
            else
                res.status(200).json(`rows updated ${result.rowCount}`)
        }
    )
}

module.exports = {
  home,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
