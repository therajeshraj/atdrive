import React, {useState, useEffect} from 'react'
import CardView from '../utility/CardView'
import PersonCell from '../utility/PersonCell'


const Home = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        
        fetch("/allPerson", {
            method: 'get',
            headers: {
                "Content-Type":"application/json",
            },
        }) 
        .then(res=> res.json())
        .then(result=> {
            setData(result.results)
           
        })
        .catch(err=> {
            console.log(err)
        }) 
        
    },[])


    const getAge = (dob) => {
        var today = new Date();
        var birthDate = new Date(dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
    }

    const deletePerson = (personId) => {
        fetch(`/delPerson/${personId}`, {
            method: 'delete',
            headers: {
                "Content-Type":"application/json"
            },
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.filter(item => {
                return item._id !== result._id
            })

            setData(newData)
        })
    }

    return (

        <CardView>
            <table>
                <tr>
                    <th>No.</th>
                    <th>AVATAR</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Action</th>

                </tr>
            
            <tbody>

                {

                    data.map((item, index) => (


                        <PersonCell
                            no={index}
                            _id={item._id}
                            name={item.name}
                            email={item.email}
                            age={ getAge(item.dob) }
                            avatar={item.avatar}
                            delete={()=>deletePerson(item._id)}
                        />
                        
                    ))

                }

            </tbody>
            </table>

        </CardView>
    )

}

export default Home