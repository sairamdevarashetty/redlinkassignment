var DataTypes = require('./dbconfig.js').DataTypes;


const Users = global.sequelizeORM.define('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  emailID: {
      type: DataTypes.STRING,
      validate:{
          isEmail: true
      }
  }
});
  
const Blogs = global.sequelizeORM.define('blogs', {
    authorID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,    
    },
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
  });
  


global.sequelizeORM.sync()

module.exports ={
  Blogs,
  Users
}
