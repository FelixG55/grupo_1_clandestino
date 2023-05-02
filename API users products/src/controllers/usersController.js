const path = require("path")
const DB = require("../../database/models")
const usuarios = (req, res)=>{
DB.User.findAll()
    .then( (users)=>{
         res.json({
            count: users.length,
            users: users.map(user=>{
                
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    detail: `http://localhost:3022/api/users/${user.id}`,
                }
            })
         })
    })
}
const usuario = (req, res)=> {
    DB.User.findByPk(req.params.id)
    .then( (user)=>{

     res.json(user)
    })
}

module.exports = {
    usuarios,
    usuario
}