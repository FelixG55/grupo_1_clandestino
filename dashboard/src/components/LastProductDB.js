import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';


const LastProductDB = () => {
	
	const [lastProductDB, setLastProductDB] = useState([]);

	useEffect(()=>{
		fetch(`api/products/last`)
		.then(res =>{
			return res.json();
		})
		.then(lastProduct => {
			setLastProductDB(lastProduct)
			console.log(lastProductDB[0]);
		})
	},[])

  return (
						<div className="col-lg-6 mb-4">
							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<h5 className="m-0 font-weight-bold text-gray-800">Ultimo producto en Data Base</h5>
								</div>
								{ lastProductDB && lastProductDB?.map((e)=>{
									return(
								<div className="card-body">
									<div className="text-center">
									<p>{e.name}</p>
										<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={require(`../assets/images/delivery-products/productosDelivery/${e.image}`)} alt={e.name}/>
									</div>
									<p>{e.description}</p>
									<a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>
								</div>
									)
								})

								}
							</div>
						</div>            
  )
}

export default LastProductDB