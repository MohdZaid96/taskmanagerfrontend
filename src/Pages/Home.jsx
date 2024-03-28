import React from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContextApi";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState("");
  const [task, setTask] = useState("");
  const [flag, setFlag] = useState(false);
  const [id, setId] = useState("");

  const handleAdd = async () => {
    if (task) {
      try {
        console.log(authState);
        await axios.post(
          `${process.env.REACT_APP_API_URL}/create`,
          {
            name: authState.name,
            email: authState.email,
            task,
            desc,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAuthState({
          ...authState,
          displayTask: !authState.displayTask,
        });

        setTask(null);

        console.log("task Added");
      } catch (error) {
        console.log("Add Failed || Error:" + error);
      }
    } else {
      alert("Field is empty");
    }
  };

  const handledata = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handledelete = async (_id) => {
    try {
      console.log(
        await axios.delete(`${process.env.REACT_APP_API_URL}/delete/${_id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      );
      console.log("Deleted Task");
      setAuthState({
        ...authState,
        displayTask: !authState.displayTask,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (_id) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/updateTask/${_id}`,
        {
          task,
          desc,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.msg);
      console.log("Updation completed");
      setAuthState({
        ...authState,
        displayTask: !authState.displayTask,
      });
      setId("");
      setFlag(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handledata();
  }, [authState.displayTask]);

  return (
    <div>
      {data.length<1 && <div>
        <h1>No Task Found</h1>
        
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Create
        </button>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Add New Task
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <input
                  type="String"
                  placeholder="Enter Task"
                  onChange={(e) => {
                    setTask(e.target.value);
                  }}
                  required
                ></input>
                <input
                  type="String"
                  placeholder="Enter desc"
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  required
                ></input>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAdd}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>}
      <div >
        {flag && (
          <div>
            <h1>Edit Task</h1>
            <input
              type="String"
              placeholder="Enter Task"
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
              }}
              required
            ></input>
            <input
              type="String"
              placeholder="Enter desc"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              required
            ></input>
            <div>
              <button
                style={{
                  backgroundColor: "#0d6efd",
                  color: "#fff",
                  border: "1px solid #212121",
                  borderRadius: "10px",
                  margin: "20px",
                  ":hover": {
                    borderColor: "#212121",
                  },
                }}
                onClick={() => {
                  setFlag(false);
                }}
              >
                Close
              </button>
              <button
                style={{
                  backgroundColor: "#0d6efd",
                  color: "#fff",
                  border: "1px solid #212121",
                  borderRadius: "10px",
                  margin: "20px",
                  ":hover": {
                    borderColor: "#212121",
                  },
                }}
                onClick={() => {
                  handleEdit(id);
                }}
              >
                Update
              </button>
            </div>
          </div>
        )}
        <div id="home">
        {data?.map((ele) => (
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{ele.task}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {ele.updatedAt}
              </h6>
              <p className="card-text">{ele.desc}</p>
              <button
                style={{
                  backgroundColor: "#0d6efd",
                  color: "#fff",
                  border: "1px solid #212121",
                  borderRadius: "10px",
                  margin: "20px",
                  ":hover": {
                    borderColor: "#212121",
                  },
                }}
                onClick={() => {
                  setTask(ele.task);
                  setDesc(ele.desc);
                  setId(ele._id);
                  setFlag(true);
                }}
              >
                Edit
              </button>

              <button
                style={{
                  backgroundColor: "#0d6efd",
                  color: "#fff",
                  border: "1px solid #212121",
                  borderRadius: "10px",
                  margin: "20px",
                  ":hover": {
                    borderColor: "#212121",
                  },
                }}
                onClick={() => {
                  handledelete(ele._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
