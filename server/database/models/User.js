module.exports = function(sequelize, dataTypes){
  let alias="User";

  let cols = {
      id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      name: {
          type: dataTypes.STRING
      },
      lastname: {
          type: dataTypes.STRING
      },
      email: {
          type: dataTypes.STRING
      },
      password: {
          type: dataTypes.STRING
      },
      role: {
          type: dataTypes.STRING
      }
  }

  let config = {
      tableName: "users",
      timestamps: false,
  }

  let Capitulo = sequelize.define(alias, cols, config);

  return Capitulo;
}