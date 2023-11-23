const CATEGORY = require('../model/category')


exports.AddCategory = async function (req, res, next) {
    try {
        console.log(req.body);
        if (!req.body.name || !req.body.colorcode) {
            throw new Error("Please Enter the Valid Field")
        }
        const data = await CATEGORY.create(req.body)
        res.status(201).json({
            message: "Created",
            data: data
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

exports.GetCategories = async function (req, res, next) {
    try {
        const data = await CATEGORY.find()
        res.status(200).json({
            message: "All Record Find",
            data: data
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.DeleteCategory = async function (req, res, next) {
    try {
        console.log(req.query.id)
        await CATEGORY.findByIdAndDelete(req.query.id)
        res.status(200).json({
            message: "Data Delete Successful"
        })


    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

exports.UpdateCategory = async function (req, res, next) {
    try {

        await CATEGORY.findByIdAndUpdate(req.query.id, req.body)
        res.status(200).json({
            message: "Data Update Successful"
        })


    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}