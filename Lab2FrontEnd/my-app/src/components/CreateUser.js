import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

function CreateUser(){
    
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

    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/create',{name, age, birthdate, gender, constellation, country, affiliation, vision, weapon, artifacts})
        .then(res=>{
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3 ">
                <form onSubmit={handleSubmit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input
                            type="text"
                            placeholder="Enter Age"
                            className="form-control"
                            onChange={(e)=>setAge(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Birthdate</label>
                        <input
                            type="text"
                            placeholder="Enter Birthdate"
                            className="form-control"
                            onChange={(e)=>setBirthdate(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Gender</label>
                        <input
                            type="text"
                            placeholder="Enter Gender"
                            className="form-control"
                            onChange={(e)=>setGender(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Constellation</label>
                        <input
                            type="text"
                            placeholder="Enter Constellation"
                            className="form-control"
                            onChange={(e)=>setConstellation(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Country</label>
                        <input
                            type="text"
                            placeholder="Enter Country"
                            className="form-control"
                            onChange={(e)=>setCountry(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Affiliation</label>
                        <input
                            type="text"
                            placeholder="Enter Affiliation"
                            className="form-control"
                            onChange={(e)=>setAffiliation(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Vision</label>
                        <input
                            type="text"
                            placeholder="Enter Vision"
                            className="form-control"
                            onChange={(e)=>setVision(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Weapon</label>
                        <input
                            type="text"
                            placeholder="Enter Weapon"
                            className="form-control"
                            onChange={(e)=>setWeapon(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Artifacts</label>
                        <input
                            type="text"
                            placeholder="Enter Artifacts"
                            className="form-control"
                            onChange={(e)=>setArtifacts(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success margint">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser;