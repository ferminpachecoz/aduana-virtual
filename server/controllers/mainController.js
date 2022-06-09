const db = require('../database/models');
const { Op } = require("sequelize");
const { sequelize } = require('../database/models');

const mainController = {
  index: (req,res) =>{
    db.Capitulo.findAll({
      include: [{association: "seccion"}]
    })
      .then(data => res.status(200).json(data));
  },
  listNico: (req, res) =>{
    db.Nico.findAll({
      attributes:['codigo', 'nico', 'descripcion', 'unidad', 'imp', 'exp', 'count'],
      limit: 10
    })
      .then(data => res.status(200).json(data))
  },
  search: (req,res) =>{
    db.Nico.findAll({
      attributes:['codigo', 'nico', 'descripcion', 'unidad', 'imp', 'exp', 'count'],
      limit: 30,
      where: {
        codigo: {
          [Op.startsWith]: req.query.name
        },
        descripcion: {
          [Op.startsWith]: req.query.descripcion
        }
      }
    })
      .then(data => res.status(200).json(data));
  },
  query: async(req,res) =>{
    let queryText;
    let abr = req.query.name;
    if(abr.length > 1){
      let cap = abr.slice(0, 2);
      queryText = "SELECT codigo, nico, nico.descripcion AS nicoDescripcion, unidad, imp, exp, count, capitulos.id, capitulos.descripcion as capDescripcion, nota_capitulo, seccion.titulo as seccion, seccion.id as id_seccion FROM ((nico INNER JOIN capitulos ON id LIKE '"+cap+"%' AND codigo LIKE '"+abr+"%' AND nico.descripcion LIKE '"+req.query.descripcion+"%') INNER JOIN seccion ON id_seccion = seccion.id) LIMIT 20";
    }else{
      queryText = "SELECT codigo, nico, descripcion AS nicoDescripcion, unidad, imp, exp, count FROM nico LIMIT 30"
    }
    const [results, metadata] = await sequelize.query(queryText);
    res.status(200).json({
      nico: results,
      capitulo: {
        title: results[0].capDescripcion,
        id: results[0].id,
        nota_capitulo: results[0].nota_capitulo
      },
      seccion: {
        id_seccion: results[0].id_seccion,
        titulo: results[0].seccion
      }
    });
  },
  listSeccion: (req, res) =>{
    db.Seccion.findAll()
      .then(data => res.status(200).json(data))
  },
  crearCap: (req, res) =>{
    db.Capitulo.create({
      id: req.body.id,
      descripcion: req.body.descripcion,
      nota_capitulo: req.file.originalname,
      nota_nacional: req.body.nota_nacional,
      id_seccion: req.body.id_seccion
    })
    .then(data => res.status(200).json({data: data, created: 'succesfull!'}))
  },
  editarCap: (req, res) =>{
    if(req.file){
      db.Capitulo.update({...req.body, nota_capitulo: req.file.originalname},{where:{id: req.body.id}})
      .then(data => res.status(200).json(data))
    }else{
      db.Capitulo.update({...req.body},{where:{id: req.body.id}})
      .then(data => res.status(200).json(data))
    }
    console.log(req.body)
  },
  selectUpdate: (req,res) =>{
    db.Capitulo.findOne({
      where: {id: req.body.id},
      include: [{association: "seccion"}]
    })
      .then(data => res.status(200).json(data))
  },
  eliminarCapitulo: (req, res) =>{
    db.Capitulo.destroy({
      where: {id: req.body.id}
    })
    .then(data => res.status(200).json(data))
  },
  crearSeccion: (req, res) =>{
    db.Seccion.create({
      titulo: req.body.title,
      nota_seccion: req.file.originalname
    })
      .then(a => res.status(200).json({data: a, status: 'Created'}))
  },
  editarSeccion: (req, res) =>{
    db.Seccion.update({
      titulo: req.body.title,
      nota_seccion: req.file.originalname
    },{
      where: {id: req.body.id}
    })
      .then(a => res.status(200).json(a));
  },
  eliminarSeccion: (req, res) =>{
    db.Seccion.destroy({
      where: {id: req.body.id}
    })
      .then(a => res.status(200).json({status: 1}))
  },
  crearNico: (req, res) =>{
    db.Nico.create({
      codigo: req.body.codigo,
      nico: req.body.nico,
      descripcion: req.body.descripcion,
      unidad: req.body.unidad,
      imp: req.body.imp,
      exp: req.body.exp,
      count: req.body.count
    }, 
    {fields: ['codigo', 'nico', 'descripcion', 'unidad', 'imp', 'exp', 'count']})
      .then(a => res.status(200).json(a))
  },
  buscarNico: (req, res) =>{
    db.Nico.findOne({
      where: {codigo: req.body.codigo},
      attributes:['codigo', 'nico', 'descripcion', 'unidad', 'imp', 'exp', 'count']
    })
    .then(a => res.status(200).json(a))
  },
  editarNico: (req, res) =>{
    db.Nico.update({
      nico: req.body.nico,
      descripcion: req.body.descripcion,
      unidad: req.body.unidad,
      imp: req.body.imp,
      exp: req.body.exp,
      count: req.body.count
    },{
      where: {codigo: req.body.codigo}
    })
    .then(a => res.status(200).json(a))
  },
  eliminarNico: (req, res) =>{
    db.Nico.destroy({
      where: {codigo: req.body.codigo}
    })
    .then(res.status(200).json({mensaje: 'Se elimino correctamente!'}))
  }
}

module.exports = mainController;