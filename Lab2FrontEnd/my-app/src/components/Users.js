import {Link, useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react'
import axios from "axios";

function Users() {
    const { id } = useParams();

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] =useState();

    useEffect(() => {
        axios.get('http://localhost:3001/')
        .then(res =>{
            console.log(res);
            setData(res.data);
        })
        .catch(err => console.log(err));
    },[])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteuser/'+id)
            .then(res => {
                console.log(res)
                window.location.reload();
            }).catch(err => console.log(err))
    }

    const filteredData = data.filter(user => {
        const search = searchQuery ? searchQuery.toLowerCase() : '';
    
        const name = user.name ? user.name.toLowerCase() : '';
        const age = user.age ? user.age.toString() : '';
        const birthdate = user.birthdate ? user.birthdate.toLowerCase() : '';
        const gender = user.gender ? user.gender.toLowerCase() : '';
        const constellation = user.constellation ? user.constellation.toLowerCase() : '';
        const country = user.country ? user.country.toLowerCase() : '';
        const affiliation = user.affiliation ? user.affiliation.toLowerCase() : '';
        const vision = user.vision ? user.vision.toLowerCase() : '';
        const weapon = user.weapon ? user.weapon.toLowerCase() : '';
        const artifacts = user.artifacts ? user.artifacts.toLowerCase() : '';
    
        return (
            name.includes(search) ||
            age.includes(search) ||
            birthdate.includes(search) ||
            gender.includes(search) ||
            constellation.includes(search) ||
            country.includes(search) ||
            affiliation.includes(search)||
            vision.includes(search)||
            weapon.includes(search)||
            artifacts.includes(search)
        );
    });

    return (
        <div className="backg pad ">
            <div className="width boxe marginsp">
            <div className="tit">
                <h1>Character Information Organizer</h1>
            </div>
            <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search"
                />
                <Link to="/create" className="btn btn-success btn-sm marginb ">
                    Add + 
                </Link>
                <table className="table">
                    <thead>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Birthdate</th>
                        <th>Gender</th>
                        <th>Constellation</th>
                        <th>Country</th>
                        <th>Affiliation</th>
                        <th>Vision</th>
                        <th>Weapon</th>
                        <th>Artifacts</th>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((user, index)=>{
                                return <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.birthdate}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.constellation}</td>
                                    <td>{user.country}</td>
                                    <td>{user.affiliation}</td>
                                    <td>{user.vision}</td>
                                    <td>{user.weapon}</td>
                                    <td>{user.artifacts}</td>
                                    <td>
                                        <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success box">Update</Link>
                                        <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger box">Delete</button>
                                        </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;