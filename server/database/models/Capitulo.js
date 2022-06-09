module.exports = function(sequelize, dataTypes){
  let alias="Capitulo";

  let cols = {
      id: {
          type: dataTypes.STRING,
          primaryKey: true,
          autoIncrement: false,
      },
      descripcion: {
          type: dataTypes.STRING
      },
      nota_capitulo: {
          type: dataTypes.STRING
      },
      nota_nacional: {
          type: dataTypes.STRING
      },
      id_seccion: {
          type: dataTypes.INTEGER
      }
  }

  let config = {
      tableName: "capitulos",
      timestamps: false,
  }

  let Capitulo = sequelize.define(alias, cols, config);

  Capitulo.associate = function(models){
      Capitulo.belongsTo(models.Seccion, {
          as: "seccion",
          foreignKey: 'id_seccion',
      });
  }

  return Capitulo;
}