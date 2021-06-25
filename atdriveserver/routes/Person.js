const express = require('express');
const mongoose = require('mongoose')

const app = express()
const router = express.Router()

const People = mongoose.model("PeopleSchema")

router.post('/addPerson', (req, res) => {

    const {name, phone, email, dob, country, avatar} = req.body

    if(!name || !email) {
        return res.status(422).send({error: "All fields are required."})
    }

    const people = new People({
        name,
        phone,
        email,
        dob,
        country,
        avatar
    })

    people.save().then(result => {
        res.json({result: result})
    })

    .catch(err => {
        console.log(err)
    })

})

router.get('/allPerson', (req, res) => {

    People.find()
    .then(results=> {
        res.json({results})
    })
    .catch(err => {
        console.log(err)
    })

})


router.get('/personByID/:id', (req, res) => {

    People.findOne({_id:req.params.id})

    .then(user=> {
        People.find({_id: req.params.id})
        .exec((err, person) => {
            if(err) {
                return res.status(422).json({error: err})
            } else {
                res.json({person})
            }
        })
    })
    .catch(err => {
        return res.status(422).json({error: err})
    })

})

router.put('/updatePerson/:personId', (req, res) => {

    //People.findOne({_id:req.params.personId})

    // const {name, phone, email, dob, country, avatar} = req.body

    // if(!name || !email) {
    //     return res.status(422).send({error: "All fields are required."})
    // }

    People.findOneAndUpdate({_id:req.params.personId}, req.body, {new : true}, function (err, result) {

        if (err){
            console.log(err)
        }
        else{
            res.json({result})
        }

    });

    // const people = new People({
    //     name,
    //     phone,
    //     email,
    //     dob,
    //     country,
    //     avatar
    // })

    // People.findByIdAndUpdate(req.params.personId, { people },
    //                         function (err, docs) {
    //     if (err){
    //         console.log(err)
    //     }
    //     else{
    //         console.log("Updated User : ", docs);
    //     }
    // });

    // .exec((err, person) => {
    //     if(err || !person) {
    //         return res.status(422).json({error: err})
    //     }
    //     if(person._id.toString() === req.params.personId.toString()) {

    //         people.update()
    //         .then(results => {
    //             res.json(results)
    //         })
    //         .catch(err=> {
    //             console.log(err)
    //         })
    //     }
    // })

    // res.json({"id": req.params.personId})

    // const {name, phone, email, dob, country, avatar} = req.body

    // if(!name || !email) {
    //     return res.status(422).send({error: "All fields are required."})
    // }

    // const people = new People({
    //     name,
    //     phone,
    //     email,
    //     dob,
    //     country,
    //     avatar
    // })

    // people.update().then(result => {
    //     res.json({result: result})
    // })

    // .catch(err => {
    //     console.log(err)
    // })

})

//router.delete('/delPerson:personId', (req, res) => {
router.delete('/delPerson/:personId', (req,res) => {

    //res.send({"aa": req.params.personId})

    People.findOne({_id:req.params.personId})

    .exec((err, person) => {
        if(err || !person) {
            return res.status(422).json({error: err})
        }
        if(person._id.toString() === req.params.personId.toString()) {
            person.remove()
            .then(results => {
                res.json(results)
            })
            .catch(err=> {
                console.log(err)
            })
        }
    })

})

module.exports = router

// jB736gZnqVTF01KC
// 