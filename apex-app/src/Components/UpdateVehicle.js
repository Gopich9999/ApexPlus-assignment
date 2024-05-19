import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from "../CSS/updateveh.module.css";
import SideNavbar from '../Components/SideNavbar';

function UpdateVehicle() {
  const { id } = useParams();

  const [inputData, setInputData] = useState({
    id: id,
    sce_name: "",
    name: "",
    pos_x: "",
    pos_y: "",
    speed: "",
    direction: "",
  });
  const [data, setData] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/vehicles/${id}`)
      .then((res) => setInputData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const onInputChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8000/vehicles/${id}`, inputData)
      .then((res) => {
        alert("Data Updated Successfully!");
        navigate('/');
      });
  };

  const onScenerioChange = (event) => {
    setInputData({
      ...inputData,
      sce_name: event.target.value,
    });
  };

  const onDirectionChange = (event) => {
    setInputData({
      ...inputData,
      direction: event.target.value,
    });
  };

  const { sce_name, name, pos_x, pos_y, speed, direction } = inputData;

  return (
    <>
      <SideNavbar />
      <div className={style.cont}>
        <div className={style.outcontent}>
          <h2 className={style.heading}>Update Vehicle data</h2>

          <div className={style.content}>
            <div className={style.container}>
              <div className={style.content}>
                {/* input form to add scenario */}
                <form onSubmit={handleSubmit}>
                  <div className={style.details}>
                    <div className={style.box}>
                      <label>Scenarios List</label>
                      {/* <select
                        className={style.categoryCh}
                        onChange={onScenerioChange}
                        value={sce_name}
                      >
                        <option>Select Scenario</option>
                        <option value="test">Test Scenario</option>
                        <option value="speed">Speed Scenario</option>
                        <option value="safety">Safety Scenario</option>
                        <option value="abc">Scenarios ABC</option>
                      </select> */}
                      <label>Scenarios List</label>
                    <select className={style.categoryCh} 
                    onChange={onScenerioChange} 
                    value={sce_name}
                    >
                        <option>Select Scenario</option>
                        {data.map(scenerio => {
                          console.log(scenerio)
                          return(
                            <option value={scenerio}>{scenerio.sname}</option>

                          )
                        })} 
        
                    </select>      
                    </div>

                    <div className={style.box}>
                      <label>Vehicle Name</label>
                      <input
                        type="text"
                        value={name}
                        name="name"
                        onChange={onInputChange}
                      />
                    </div>

                    <div className={style.box}>
                      <label>Speed</label>
                      <input
                        type="number"
                        required
                        value={speed}
                        name="speed"
                        onChange={onInputChange}
                      />
                    </div>

                    <div className={style.box}>
                      <label>Position X</label>
                      <input
                        type="number"
                        required
                        value={pos_x}
                        name="pos_x"
                        onChange={onInputChange}
                      />
                    </div>

                    <div className={style.box}>
                      <label>Position Y</label>
                      <input
                        type="number"
                        required
                        value={pos_y}
                        name="pos_y"
                        onChange={onInputChange}
                      />
                    </div>


                  <div className={style.box}>
                    <label>Direction</label>
                    <select className={style.categoryCh} 
                    onChange={onDirectionChange} 
                    value={direction}
                    >
                        <option>Select Direction</option> 
                        <option value="towards">Towards</option>
                        <option value="backwards">Backwards</option>
                        <option value="upwards">Upwards</option>
                        <option value="downwards">Downwards</option>
                    </select>                    
                  </div>                                    
                </div>
                 <button style={{backgroundColor:"green", padding:"10px",fontSize: "15px", width:"100px",
                 border:"none", borderRadius:"4px", color:"white", cursor:"pointer"}}>Update</button>
              </form>

            </div>
        </div>
      </div>
    </div>

        
    </div>
    </>
  )
}

export default UpdateVehicle