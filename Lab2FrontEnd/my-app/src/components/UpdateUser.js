import axios from "axios";
import { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";



function UpdateUser(){

    const { id } =useParams()

    const [name, setName]=useState()
    const [age, setAge]=useState()
    const [birthdate, setBirthdate]=useState()
    const [gender, setGender]=useState()
    const [constellation, setConstellation]=useState()
    const [country, setCountry]=useState()
    const [affiliation, setAffiliation]=useState()
    const [vision, setVision]=useState()
    const [weapon, setWeapon]=useState()
    const [artifacts, setArtifacts]=useState()

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await axios.get(`http://localhost:3001/get/` + id);
                console.log(response);
                setName(response.data.name)
                setAge(response.data.age)
                setBirthdate(response.data.birthdate) 
                setGender(response.data.gender)
                setConstellation(response.data.constellation)
                setCountry(response.data.country)
                setAffiliation(response.data.affiliation)
                setVision(response.data.vision)
                setWeapon(response.data.weapon)
                setArtifacts(response.data.artifacts)
            }catch (err){
                console.log(err)
            }
        }
        fetchData();
    },[])

    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3001/update/` + id, {name, age, birthdate, gender, constellation, country, affiliation, vision, weapon, artifacts})
            .then (res => {
                console.log(res);
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3 ">
                <form onSubmit={handleUpdate}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input
                            type="text"
                            placeholder="Enter Age"
                            className="form-control"
                            value={age}
                            onChange={(e)=>setAge(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Birthdate</label>
                        <input
                            type="text"
                            placeholder="Enter Birthdate"
                            className="form-control"
                            value={birthdate}
                            onChange={(e)=>setBirthdate(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Gender</label>
                        <input
                            type="text"
                            placeholder="Enter Gender"
                            className="form-control"
                            value={gender}
                            onChange={(e)=>setGender(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Constellation</label>
                        <input
                            type="text"
                            placeholder="Enter Constellation"
                            className="form-control"
                            value={constellation}
                            onChange={(e)=>setConstellation(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Country</label>
                        <input
                            type="text"
                            placeholder="Enter Country"
                            className="form-control"
                            value={country}
                            onChange={(e)=>setCountry(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Affiliation</label>
                        <input
                            type="text"
                            placeholder="Enter Affiliation"
                            className="form-control"
                            value={affiliation}
                            onChange={(e)=>setAffiliation(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Vision</label>
                        <input
                            type="text"
                            placeholder="Enter Vision"
                            className="form-control"
                            value={vision}
                            onChange={(e)=>setVision(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Weapon</label>
                        <input
                            type="text"
                            placeholder="Enter Weapon"
                            className="form-control"
                            value={weapon}
                            onChange={(e)=>setWeapon(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Artifacts</label>
                        <input
                            type="text"
                            placeholder="Enter Artifacts"
                            className="form-control"
                            value={artifacts}
                            onChange={(e)=>setArtifacts(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;