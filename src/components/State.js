import React, {useState} from "react";
import data from './data.json';
import styles from "./style.module.css";

function States() {
    const [cities, setCities] = useState([]);
    const [indianState, setIndianState] = useState([]);
    const [name, setName]= useState("")
    const[searchData, setSearchData] = useState("")
    const handleOnChange=(e)=>{
        setName(e.target.value)
        if(e.target.value ===""){
            setSearchData("")
        }
        const arr = data[0].state.map((item)=>{return item.city})
        for(let i =0;i<arr.length;i++){
            for(let j=0;j<arr[i].length;j++){
               if(arr[i][j].name === e.target.value){
                   setSearchData(e.target.value)
               }
            }
        }
    }
    const handleCities = (name) => {
        if(cities.includes(name)){
            const fil = cities.filter((item)=>item!==name)
            setCities([...fil])
        }else{
            setCities([...cities, name]);
        }
      
    };
    const handleState = (stat) => {
        if(indianState.includes(stat)){
            const fil = indianState.filter((item)=>item!==stat)
            setIndianState([...fil])
        }else{
      setIndianState([...indianState, stat]);
      const arr = data[0].state.filter((item)=>item.state === stat)
      let res=[]
      const newarr = arr[0].city.filter((item)=>{
          res.push(item.name)
          return res
      })
      setCities([...cities, ...res])
        }
    };
    const handleSubmit =()=>{
        console.log(indianState, cities)
    }
    return <div className={styles.main}>
        <div><input placeholder ="search" value ={name} onChange ={handleOnChange}/></div>
        {searchData? 
        <div className ={styles.cityBox}>{searchData}</div>
    :(
        <>
        <div className ={styles.divBox}>{data[0].country}</div>
        {data[0].state.map((item, index) => (
          <div key={index}>
            <div key={index} className ={styles.divBox}>
                <input type ="checkbox" onClick={() => handleState(item.state)}/>
              {item.state}
            </div>
            {
              indianState.includes(item.state) && (
                <div>
                  {item.city.map((ele, index) => (
                    <div key={index} className ={styles.cityBox}>
                      <input type ="checkbox" checked ={cities.includes(ele.name)}onClick={() => handleCities(ele.name)}/>
                        {ele.name}
                    </div>
                  ))}
                </div>
              )
              
            }
          </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
        </>
    )}
      </div>
  }
  
export default States;