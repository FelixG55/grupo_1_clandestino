import React, { useState } from 'react';
import SmallCard from './SmallCard';
import { useEffect } from 'react';
import fetch from 'node-fetch';


let user ={
    color:   "success",
    titulo: "Total de usuarios",
    icono: "fas fa-award",
}


function ContentRowTop(){
    
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    
    let products = {
        total:  totalProducts,
        titulo: "Total de Productos",
        icono: "fas fa-film",
        color: "success"
    }
    
    let users = {
        total:  totalUsers,
        titulo: "Total de usuarios",
        icono: "fas fa-film",
        color: "warning"
    }
    
    let categories = {
        total:  totalCategories,
        titulo: "Total de categorias",
        icono: "fas fa-film",
        color: "primary"
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
    
    const cardProps = [products,users,categories];
    
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
export default ContentRowTop;