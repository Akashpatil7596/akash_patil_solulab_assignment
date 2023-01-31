const express = require('express');
const app = express();
const dbConn = require('../config/database');
const router = express.Router();

//Category Table Insert Query

router.post('/create', (req, res) => {
    let category = req.body;
    console.log(req.body);
    query = "insert into tbl_category (category_name) values (?)";
    dbConn.query(query, [category.category_name], (err, result) => {
        console.log(err);
        if(!err){
            return res.status(200).json({message: "Category Uploaded Successfully"});
        }
        else{
            return res.status(500);
        }
    });
})

//Category Table Read Query

router.get('/view', (req, res) => {
    let query = "select * from tbl_category";
    dbConn.query(query, (err, result) => {
        console.log(result);
        if(!err){
            return res.status(200).json(result); 
        }
        else{
            return res.status(500);
        }
    });
})

//Category Update Read Query

router.patch('/update/:category_id', (req, res) => {
    let id = req.params.category_id;
    let category = req.body;
    let query = "update tbl_category set category_name=? where category_id=?"
    dbConn.query(query, [category.category_name, category.category_id], (err, result) => {
        console.log(err);
        if(!err){
            if(result.affectedRows == 0){
                return res.status(500).json(result);
            }
            // console.log(result.affectedRows);
            return res.status(200).json({message: "Product Updated Successfully"});
        }
        else{
            return res.status(500);
        }
    });
});

//Category Delete Read Query

router.delete('/delete/:category_id', (req, res) => {
    let id = req.params.category_id;
    let query = "delete from tbl_category where category_id = ?";
    dbConn.query(query, [id], (err, result) => {
        console.log(err);
        if(!err){
            return res.status(200).json({message:"Table Removed From Database"});
        }
        else{
            return res.status(500);
        }
    })
})

module.exports = router;