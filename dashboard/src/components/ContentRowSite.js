import React, { useState } from 'react';
import SmallCard from './SmallCard';
import { useEffect } from 'react';
import fetch from 'node-fetch';



function ContentRowSite(){
    
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [productSales, setProductSales] = useState(0);
    const [totalSales, setTotalSales] = useState(0);

    const [totalSalesByProduct, setTotalSalesByProduct] = useState(0);

    
    let products = {
        total:  totalProducts,
        titulo: "Total de Productos",
        icono: "fas fa-hamburger",
        color: "success"
    }
    
    let users = {
        total:  totalUsers,
        titulo: "Total de usuarios",
        icono: "fas fa-users",
        color: "warning"
    }
    
    let categories = {
        total:  totalCategories,
        titulo: "Total de categorias",
        icono: "fas fa-boxes",
        color: "primary"
    }

    let sellProduct ={
        total : totalSales,
        titulo: "Total de ventas",
        icono: "fas fa-credit-card",
        color: "secondary"    
    }
    
    useEffect(() => {
        fetch('api/products')
        .then(res =>{
            return res.json();
        })
        .then(products =>{
            setTotalCategories([products.countByCategory.length])
            setTotalProducts([products.countProducts])
        })        
    }, [])
    
    useEffect(() => {
        fetch('api/users')
        .then(res =>{
            return res.json();
        })
        .then(users =>{
            setTotalUsers([users.count])
        })
        
    }, [])

    useEffect(() => {
        fetch('api/sales')
        .then(res =>{
            return res.json();
        })
        .then(sales =>{
            setTotalSales([sales.totalSales[0].total_sales])
            setTotalSalesByProduct([sales.saleByProduct.total_p])
            setProductSales([sales.saleByProduct.product_id])
        })
        
    }, [])
    
    const cardProps = [products,users,categories,sellProduct];
    
    return (
        <React.Fragment>
        {/*<!-- Content Row -->*/}
        <div className="row">
            {
                cardProps.map((item,index)=>{
                    return <SmallCard  {...item}  key= {index}/>
                })
            }      
        </div>
        </React.Fragment>
    )
}
export default ContentRowSite;