module.exports = function(sequelize, dataTypes){
  let alias="Nico";

  let cols = {
      codigo: {
          type: dataTypes.TEXT,
          primaryKey: false,
          autoIncrement: false,
      },
      nico: {
          type: dataTypes.TEXT
      },
      descripcion: {
          type: dataTypes.TEXT
      },
      unidad: {
          type: dataTypes.TEXT
      },
      imp: {
          type: dataTypes.TEXT
      },
      exp: {
        type: dataTypes.TEXT
      },
      count: {
        type: dataTypes.INTEGER
      }
  }

  let config = {
      tableName: "nico",
      timestamps: false,
  }

  let Nico = sequelize.define(alias, cols, config);

  return Nico;
}