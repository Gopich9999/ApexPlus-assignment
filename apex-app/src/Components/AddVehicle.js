import React, { useState,useEffect } from 'react'
import style from "../CSS/addveh.module.css"
import SideNavbar from '../Components/SideNavbar'
import axios from 'axios'

// initial data 
const initialState = {
      sce_name: "",
      name: "",
      pos_x: "",
      pos_y: "",
      speed: "",
      direction: "",
}

const AddVehicle = () => {

  const [formValue, setFormValue] = useState(initialState);
  const [data, setData] = useState([]);
  const [scenerio, setScenerio]=useState('');

     
  const {sce_name, name, pos_x, pos_y, speed, direction} = formValue
  const [details,setDetails]=useState([])


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:8000/scenerios`);
        // Initialize count for each scenario to 0
        // const newData = res.data.map(scenario => ({ ...scenario, vehicleCount: 0 }));
        
        setData(res.data);
      } catch (error) {
        console.log(error);
        setData([]);
      }
    }
    fetchData();
  }, []);

 const updatevehiclecount=(noofvehicles)=>{
  axios.patch(`http://localhost:8000/scenerios/${scenerio}`,
  {vehicleCount:noofvehicles+1}
)
 }

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sce_name || sce_name === "Select Scenerio"|| !name || !pos_x || !pos_y || !speed || 
    !direction || direction === "Select Direction") {
        alert("Please select All Fields");
    } else if (name.trim() === "") {
        alert("Vehicle Name cannot be empty");
    } else {
        axios.post("http://localhost:8000/vehicles", {
          scenerio,
            name,
            pos_x,
            pos_y,
            speed,
            direction          
        })
        .then(res => {
            console.log("Posting Data", res);
            
            const noofvehicles=data.filter(item=>item.id==scenerio)[0].vehicleCount
            console.log(noofvehicles)
            updatevehiclecount(noofvehicles);
            alert("Vehicle data Added Successfully");

            window.location.reload()
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong");
        });



    }
}



const onScenerioChange = (e) => {
    setFormValue({
        ...formValue,
       sce_name : e.target.value
    })
    setScenerio(e.target.value)
}

const onDirectionChange = (e) => {
    setFormValue({
        ...formValue,
       direction : e.target.value
    })
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
        <h2 className={style.heading}>Add Vehicle</h2>

      <div className={style.content}>
        <div className={style.container}> 
          <div className={style.content}>
               
               {/* input form to add scenerio */}
                <form onSubmit={handleSubmit}>
                <div className={style.details}>

                {console.log(sce_name)}
        

                 

<div className={style.box}>
                    <label>Scenarios List</label>
                    <select className={style.categoryCh} 
                    onChange={onScenerioChange} 
                    value={sce_name}
                    >
                        <option>Select Scenario</option>
                        {data.map(scenerio => {
                          console.log(scenerio)
                          return(
                            <option value={scenerio.id}>{scenerio.sname}</option>

                          )
                        })} 
        
                    </select>                    
                  </div>

                  <div className={style.box}>
                    <label>Vehicle Name</label>
                    <input type="text" value={name} name="name" onChange={onInputChange} />
                  </div>

                  <div className={style.box}>
                    <label>Speed</label>
                    <input type="number" required value={speed} name="speed" onChange={onInputChange} />
                  </div>

                  <div className={style.box}>
                    <label>Position X</label>
                    <input type="number" required value={pos_x} name="pos_x" onChange={onInputChange} />
                  </div>

                  <div className={style.box}>
                    <label>Position Y</label>
                    <input type="number" required value={pos_y} name="pos_y" onChange={onInputChange} />
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

export default AddVehicle