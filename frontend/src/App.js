  import React, { useState, useEffect } from "react";
  import axios from "axios";

  const App = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
      no_docs: "",
      date_in: "",
      sumber: "",
      jenis: "",
      b3_in: ""
    });
    const [showEdit, setShowEdit] = useState(false);
    const [editId, setEditId] = useState("");

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = () => {
      axios.get("http://localhost:4000/v1/data/datas")
        .then(response => {
          setData(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    };

    const fetchdataId = (id) => {
      axios.get(`http://localhost:4000/v1/data/show/${id}`)
        .then(response => {
          const { no_docs, date_in, sumber, jenis, b3_in } = response.data.data;
          setFormData({
            no_docs,
            date_in,
            sumber,
            jenis,
            b3_in
          });
          setEditId(id);
          setShowEdit(true);
        })
        .catch(error => {
          console.log(error);
        });
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (showEdit) {
        handleUpdate(editId);
      } else {
        axios.post("http://localhost:4000/v1/data/add", formData)
          .then(response => {
            console.log(response.data);
            fetchData();
            setFormData({
              no_docs: "",
              date_in: "",
              sumber: "",
              jenis: "",
              b3_in: ""
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    };

    const handleUpdate = (id) => {
      axios.put(`http://localhost:4000/v1/data/update/${id}`, formData)
        .then(response => {
          console.log(response.data);
          fetchData();
          setFormData({
            no_docs: "",
            date_in: "",
            sumber: "",
            jenis: "",
            b3_in: ""
          });
          setShowEdit(false);
          setEditId("");
        })
        .catch(error => {
          console.log(error);
        });
    };

    const handleDelete = (id) => {
      axios.delete(`http://localhost:4000/v1/data/delete/${id}`)
        .then(response => {
          console.log(response.data);
          fetchData();
        })
        .catch(error => {
          console.log(error);
        });
    };

    const handleEdit = (id) => {
      fetchdataId(id);
    };

    return (
      <div>
        <h1>Data Form</h1>
        <form onSubmit={handleSubmit}>
          <label>
            No Docs:
            <input type="text" name="no_docs" onChange={handleChange} value={formData.no_docs} />
          </label>
          <br />
          <label>
            Date In:
            <input type="text" name="date_in" onChange={handleChange} value={formData.date_in} />
          </label>
          <br />
          <label>
            Sumber:
            <input type="text" name="sumber" onChange={handleChange} value={formData.sumber} />
          </label>
          <br />
          <label>
            Jenis:
            <input type="text" name="jenis" onChange={handleChange} value={formData.jenis} />
          </label>
          <br />
          <label>
            B3 In:
            <input type="text" name="b3_in" onChange={handleChange} value={formData.b3_in} />
          </label>
          <br />
          <button type="submit">{showEdit ? "Update" : "Submit"}</button>
        </form>
        <h1>Data List</h1>
        <ul>
          {data.map(e => (
            <ul key={e._id} style={{ width: '244px', textAlign: 'left' }}>
              <li>{e.sumber}</li>
              <li>{e.b3_in}</li>
              <li>
                <button onClick={() => handleEdit(e._id)}>Edit</button>
                <button onClick={() => handleDelete(e._id)}>Hapus</button>
              </li>
            </ul>
          ))}
        </ul>
      </div>
    );
  };

  export default App;
