const DataPost = require('../models/data');

exports.add = (req, res, next) => {
  const { no_docs, date_in, sumber, jenis, b3_in } = req.body;
  const status = false;

  const Posting = new DataPost({
    no_docs,
    date_in,
    sumber,
    jenis,
    b3_in,
    status,
  });

  Posting.save()
    .then(result => {
      res.status(201).json({
        message: "Data Berhasil Didaftarkan",
        data: result
      });
    })
    .catch(err => console.log('Postingan error: ' + err));
};


exports.datas = (req, res, next) => {
  DataPost.find()
    .then(result => {
      res.status(200).json({
        message: "Data Berhasil Diambil!",
        data: result
      })
    })
    .catch(err => next(err))
}

exports.show = (req, res, next) => {
  const getId = req.params.getId;
  DataPost.findById(getId)
    .then(result => {
      if(!result){
        const error = new Error('Data Tidak Ditemukan!');
        error.errorStatus(404);
        throw error;
      }
      res.status(200).json({
        message: "Data Berhasil Dipanggil",
        data: result
      })
    })
    .catch(err => next(err))
}

exports.update = (req, res, next) => {
  const no_docs = req.body.no_docs;
  const date_in = req.body.date_in;
  const sumber = req.body.sumber;
  const jenis = req.body.jenis;
  const status = req.body.status;
  const b3_in = req.body.b3_in;
  const date_out= req.params.date_out;
  const getId = req.params.getId;
  

  DataPost.findById(getId)
    .then(result => {
      if(!result){
        const error = new Error('Data Tidak Ditemukan!');
        error.errorStatus(404);
        throw error;
      }

      if (no_docs) result.no_docs = no_docs;
      if (date_in) result.date_in = date_in;
      if (sumber) result.sumber = sumber;
      if (jenis) result.jenis = jenis; 
      if (b3_in) result.b3_in = b3_in;
      if (status) result.status = status;
      if (date_out) result.date_out = date_out;

      return result.save();
    })
    .then(result => {   
      res.status(200).json({
        message: "Data Berhasil Diupdate",
        data: result
      })
    })
    .catch(err => next(err))
}


exports.del = (req, res, next) => {
  const getId = req.params.getId;
  DataPost.findById(getId)
    .then(result => {
      if(!result){
        const error = new Error('Data Siswa Tidak Ditemukan!');
        error.errorStatus(404);
        throw error;
      }
      
      return DataPost.findByIdAndRemove(getId)
    })
    .then(result => {      
      res.status(200).json({
        message: "Data Siswa Berhasil Dipanggil",
        data: result
      })
    })
    .catch(err => next(err))
}