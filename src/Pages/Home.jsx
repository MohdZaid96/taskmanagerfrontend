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

  const handleEdit = async ( _id) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/updateTask/${_id}`,
        {
          task,
          desc
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
      setId("")
      setFlag(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handledata();
  }, [authState.displayTask]);

  return (
    <div id="home">
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
          <button style={{backgroundColor:"#0d6efd",color:"#fff",border: "1px solid #212121",borderRadius:"10px",margin:"20px",':hover': {
            borderColor: '#212121'
          }}}
            onClick={() => {
              setFlag(false);
            }}
          >
            Close
          </button>
          <button style={{backgroundColor:"#0d6efd",color:"#fff",border: "1px solid #212121",borderRadius:"10px",margin:"20px",':hover': {
            borderColor: '#212121'
          }}} onClick={()=>{handleEdit(id)}}>Update</button>
        </div>
      </div>
    )}
      {data?.map((ele) => (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{ele.task}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {ele.updatedAt}
            </h6>
            <p className="card-text">{ele.desc}</p>
            <button
            style={{backgroundColor:"#0d6efd",color:"#fff",border: "1px solid #212121",borderRadius:"10px",margin:"20px",':hover': {
              borderColor: '#212121'
            }}}
              onClick={() => {
                setTask(ele.task);
                setDesc(ele.desc)
                setId(ele._id)
                setFlag(true);

              }}
            >
              Edit
            </button>

            
            <button style={{backgroundColor:"#0d6efd",color:"#fff",border: "1px solid #212121",borderRadius:"10px",margin:"20px",':hover': {
              borderColor: '#212121'
            }}}
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
  );
};

export default Home;
