module.exports = function(sequelize, dataTypes){
  let alias="Seccion";

  let cols = {
      id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      titulo: {
          type: dataTypes.STRING
      },
      nota_seccion: {
          type: dataTypes.STRING
      }
  }

  let config = {
      tableName: "seccion",
      timestamps: false,
  }

  let Seccion = sequelize.define(alias, cols, config);

  Seccion.associate = function(models){
      Seccion.hasMany(models.Capitulo, {
          as: "capitulos",
          foreignKey: 'id_seccion',
      });
  }

  return Seccion;
}