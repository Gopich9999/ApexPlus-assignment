import React, { useState, useEffect } from 'react'
import SideNavbar from '../Components/SideNavbar'
import style from "../CSS/Allsce.module.css"
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import { RiDeleteBin5Fill } from "react-icons/ri"
import { MdModeEdit } from "react-icons/md"



const HomePage = () => {
  const [data, setData] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [scdata,setScdata] = useState([]);
  const [reqvehicles,setreqvehicles]=useState([]);



  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:8000/vehicles`);
        setData(res.data);
        const scres = await axios.get(`http://localhost:8000/scenerios`)
        setScdata(scres.data);
      } catch (error) {
        console.log(error);
        setData([]);
        setScdata([])
      }
    }
    fetchData();
  }, []);

  const onScenerioChange = (e) =>{
    // setSscid(e.target.value);
    console.log(e.target.value)
    const id=e.target.value;
    setreqvehicles(data.filter(item=>item.scenerio.includes(String(id))))
    console.log(reqvehicles)
  }
  const handleDelete = (id) => {
  axios.delete(`http://localhost:8000/vehicles/${id}`)
    .then((res) => {
      console.log("Deleted", res);
      // Remove the deleted item from the data state
      setData((data) => data.filter((item) => item.id !== id));
      alert("Scenerio deleted")
    })
    .catch((err) => console.log(err));
};

  async function deleteAllScenarios() {
    try {
      await axios.delete(`http://localhost:8000/scenerios`);
      setData([]);
    } catch (error) {
      console.log(error);
    }
  }
  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario);
  };

  return (
    <>
      <SideNavbar/>
      

      <div className={style.cont}>
        <div className={style.outcontent}>
          <div className={style.section}>
          <div className={style.box}>
                    <label>Scenario</label>
                    <select className={style.categoryCh} 
                    onChange={e=>onScenerioChange(e)} 
                    >
                        <option>Select Scenario</option>
                        {scdata.map(scenerio => {
                          // console.log(scenerio)
                          return(
                            <option value={scenerio.id}>{scenerio.sname}</option>

                          )
                        })} 
        
                    </select>                    
                  </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Vehicle Name</th>
                <th>Position X</th>
                <th>Position Y</th>
                <th>Speed</th>
                <th>Direction</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {reqvehicles.map((e, i) => (
                <tr key={e.id}>
                  <td>{i+1}</td>
                  <td>{e.name}</td>
                  <td>{e.pos_x}</td>
                  <td>{e.pos_y}</td>
                  <td>{e.speed}</td>
                  <td>{e.direction}</td>
                  <td style={{color:"black", fontSize:"20px"}}>
                    <Link to={`updateveh/${e.id}`} style={{color:"black", textDecoration:"none"}}>
                    <MdModeEdit/></Link></td>
                  <td style={{color:"black", fontSize:"20px"}} onClick={() => handleDelete(e.id)}><RiDeleteBin5Fill/></td>
                </tr>
              ))}
            </tbody>
          </table> 
        </div>    
        
         
      </div>
    </>
  )
}

export default HomePage;