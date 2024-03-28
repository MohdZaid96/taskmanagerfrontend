import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextApi";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Navbar = () => {
  const { logout, authState, setAuthState } = useContext(AuthContext);
  const [desc, setDesc] = useState(null);
  const [task, setTask] = useState(null);
  const [render, setRender] = useState(false);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setRender(!render);
  }, [authState]);

  
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

  return (
    <nav className="navbar bg-primary" data-bs-theme="dark">
      <div id="navbar"
        
      >
        {authState.name ? <h3>{authState.name}</h3>  :<h3>TaskManager</h3>}
        <div id="inner" >
          {authState.isAuth ? (
            <div >
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"

                style={{backgroundColor:"black"}}
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
              <button style={{backgroundColor:"#0d6efd",color:"#fff",border:"none"}} onClick={logout}>logout</button>
            </div>
          ) : (
            <>
              {flag?<Link to={"/login"} onClick={()=>{
                setFlag(false)
              }}>Login</Link>:<Link to={"/signup"} onClick={()=>{
                setFlag(true)
              }}>Register</Link>}
              
              
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
