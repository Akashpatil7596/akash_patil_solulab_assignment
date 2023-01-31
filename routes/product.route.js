'use strict';

const { query } = require('express');
const express = require('express');
const app = express();
const dbConn = require('../config/database');
const router = express.Router();

//Product Table Insert Query

router.post('/create', (req, res) => {
    let product = req.body;
    console.log(req.body);
    let queryFetchCatagory;
    queryFetchCatagory = "select category_id from tbl_category where category_id = "+product.category_id;
    dbConn.query(queryFetchCatagory, (err, result) => {
        console.log('err',result);
        if(!err){
            if(result.length > 0){
                let query = "insert into tbl_product (product_name, qty_per_unit, unit_price, unit_in_stock, discontinued, category_id) values(?, ?, ?, ?, ?, ?)";
                dbConn.query(query, [product.product_name, product.qty_per_unit, product.unit_price, product.unit_in_stock, product.discontinued, product.category_id], (err, result) => {
                    console.log('err', err);
                    if(!err){
                        return res.status(200).json({message: "Product Added Successfully"});
                    }
                    else{
                        return res.status(500);
                    }
                });
            } else {
                return res.status(500).json({message: "category not available"});
            }
        }
        else{
            return res.status(500);
        }
    });
});

//Product Table Read Query

router.get('/view', (req, res) => {
    let query = 'select tbl_category.category_id, tbl_product.product_name, qty_per_unit, unit_price,unit_in_stock, discontinued from tbl_product inner join tbl_category on tbl_product.category_id = tbl_category.category_id and tbl_category.category_id = 3';
    dbConn.query(query, (err, result) => {
        console.log(err);
        if(!err){
            return res.status(200).json(result); 
        }
        else{
            return res.status(500);
        }
    });
})

//Product Table ReadAll Query

router.get('/viewAll', (req, res) => {
    let query = "select * from tbl_product cross join tbl_category";
    dbConn.query(query, (err, result) => {
        console.log(err);
        if(!err){
            return res.status(200).json(result); 
        }
        else{
            return res.status(500);
        }
    });
})

//Product Table Update Query

router.patch('/update/:product_id', (req, res) => {
    let id = req.params.product_id;
    let product = req.body;
    let query = "update tbl_product set product_name=?, qty_per_unit=?, unit_price=?, unit_in_stock=?, discontinued=?, category_id=? where product_id=?"
    dbConn.query(query, [product.product_name, product.qty_per_unit, product.unit_price, product.unit_in_stock, product.discontinued, product.category_id, product.product_id], (err, result) => {
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

//Product Table Delete Query

router.delete('/delete/:product_id', (req, res) => {
    let id = req.params.product_id;
    let query = "delete from tbl_product where product_id = ?";
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