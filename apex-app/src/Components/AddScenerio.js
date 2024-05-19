import React, { useState } from 'react'
import style from "../CSS/addsce.module.css"
import SideNavbar from '../Components/SideNavbar'
import axios from 'axios'

// initial data 
const initialState = {
  sname: "",
  time: "",
}

const AddScenerio = () => {

  const [formValue, setFormValue] = useState(initialState);
     
  const {sname, time} = formValue

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sname || !time) {
        alert("Please select All Fields");
    } else {
        axios.post("http://localhost:8000/scenerios", {
        sname,
        time,
        vehicleCount:0

        })
        .then(res => {
            console.log("Posting Data", res);
            alert("Scenerio Added Successfully");

            window.location.reload()
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong");
        });
    }
}

  const onInputChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
}

  return (
    <>
    <SideNavbar/>
   

    <div className={style.cont}>
      <div className={style.outcontent}>
      <div>Scenario / add</div>
        <h2 className={style.heading}>Add Scenerio</h2>

      <div className={style.content}>
        <div className={style.container}> 
          <div className={style.content}>
               
               {/* input form to add scenerio */}
                <form onSubmit={handleSubmit}>
                <div className={style.details}>
                  <div className={style.box}>
                    <label>Scenario Name</label>
                    <input type="text" value={sname} name="sname" onChange={onInputChange} />
                  </div>
                  <div className={style.box}>
                    <label>Scenario Time (seconds)</label>
                    <input type="number" required value={time} name="time" onChange={onInputChange} />
                  </div>
                </div>
                {/* button to add reset and go back */}
                <div className={style.btn}>
                  <button type="submit" style={{backgroundColor:"green", color:"white"}}>Add</button>
                  <button type="button" onClick={() => setFormValue(initialState)} style={{backgroundColor:"orange", color:"white"}}>Reset</button>
                  <button type="button" onClick={() => window.history.back()} style={{backgroundColor:"blue", color:"white"}}>Go Back</button>
                </div>
              </form>

            </div>
        </div>
      </div>
    </div>

        
    </div>
    </>
  )
}

export default AddScenerio