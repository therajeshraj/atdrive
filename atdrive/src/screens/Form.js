import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'

import Select from 'react-select'

const Home = () => {

    const history = useHistory()
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDOB] = useState("")
    const [country, setCountry] = useState("")
    const [image, setImage] = useState("")
    const [imgName, setImageName] = useState("")
    const [url, setURL] = useState("")

    const [subStatus, setSubStatus] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const {personId} = useParams()

    const handleImage = (e) => {
        setImage(e.target.files[0])
        setImageName(e.target.files[0].name)
    }

    const postDetails = () => {

        setSubStatus(true)

        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "ins_clone")
        data.append("cloud_name", "rajeshlearnmern")

        fetch("https://api.cloudinary.com/v1_1/rajeshlearnmern/image/upload", {
            method: 'post',
            body: data
        }) 
        .then(res => res.json())
        .then(data => {
            setURL(data.url)
        })
        .catch(err=> {
            console.log(err)
        })

    }

    const getPersonById = (personId) => {
        fetch(`/personById/${personId}`, {
            method: 'get',
            headers: {
                "Content-Type":"application/json",
            },
        }) 
        .then(res=> res.json())
        .then(result=> {

            setName(result.person[0].name)
            setPhone(result.person[0].phone)
            setEmail(result.person[0].email)
            setDOB(result.person[0].dob)
            setCountry(result.person[0].country)
            setURL(result.person[0].avatar)

        })
        .catch(err=> {
            console.log(err)
        }) 
    }


    const addPerson = () => {

        fetch("/addPerson", {
            method: 'post',
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                name,
                phone,
                email,
                dob,
                country,
                avatar: url
            })
        }) 
        .then(res=> res.json())
        .then(data=> {
            if(!data.status) {
                history.push("/")
            } else {
                history.push("/")
            }
            console.log(data)
        })
        .catch(err=> {
            console.log(err)
        })

    }

    const updatePerson = () => {

        fetch(`/updatePerson/${personId}`, {
            method: 'put',
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                name,
                phone,
                email,
                dob,
                country,
                avatar: url
            })
        }) 
        .then(res=> res.json())
        .then(data=> {
            setSubStatus(false)
            if(data.result) {
                history.push("/")
            }
        })
        .catch(err=> {
            console.log(err)
        })

    }

    useEffect(() => {

        if (personId) {
            setEdit(true)
            getPersonById(personId)
        }

        if(url && !isEdit && subStatus) {
            addPerson()
        } else if(isEdit && url && subStatus) {
            updatePerson()
        } else {
            console.log("No Effect")
        }

    }, [url])

    const countries  = [
        { label: "India", value: "India" },
        { label: "Albania", value: "Albania" },
        { label: "Argentina", value: "Argentina" },
        { label: "America", value: "America" },
        { label: "Austria", value: "Austria"}
    ];

    return (
        <div className="mycard">

            <div className="card auth-card input-field">
                <h2>{ isEdit?"Update": "Add"} Person

                </h2>

                    <input
                        type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        placeholder="Name"
                    />

                    <input
                        type="text"
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        placeholder="Phone"
                    />

                    <input
                        type="text"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Email"
                    />

                    <input
                        type="date"
                        value={dob}
                        onChange={(e)=>setDOB(e.target.value)}
                    />

                    <Select
                        onChange={(e)=>setCountry(e.value)}
                        options={countries}
                    />

                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Upload Image</span>
                            <input
                                type="file"
                                name="file"
                                onChange={(e)=> handleImage(e)}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input
                                className="file-path validate"
                                type="text"
                                value={imgName}
                            />
                        </div>
                        {
                            isEdit?
                                <img src={url} alt="" width={100}/>
                            : ""
                        }
                    </div>

                    <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={ ()=> postDetails() }> { isEdit?"UPDATE": "Submit"}</button>

            </div>

        </div>
    )

}

export default Home