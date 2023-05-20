import React, {Component} from 'react';
import ProductList from './ProductList';
import { useState } from 'react';
import { useEffect } from 'react';

const Product = () => {

	// const [products, setProducts] = useState([]);
	const [detailProduct, setDetailProduct] = useState([]);

	useEffect(()=>{
		fetch(`api/detail`)
		.then(res =>{
			return res.json();
		})
		.then(data => {
			setDetailProduct(data)
		})
	},[])
		console.log(detailProduct);
		return(
			<React.Fragment>
						{/*<!-- PRODUCTS LIST -->*/}
						<h1 className="h3 mb-2 text-gray-800">Todos los productos en Data Base</h1>
						
						{/*<!-- DataTales Example -->*/}
						<div className="card shadow mb-4">
							<div className="card-body">
								<div className="table-responsive">
									<table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
										<thead>
											<tr>
												<th>Id</th>
												<th>Nombre</th>
												<th>Descripción</th>
												<th>Categoria</th>
												<th>Imagen</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>Id</th>
												<th>Nombre</th>
												<th>Descripción</th>
												<th>Categoria</th>
												<th>Imagen</th>
											</tr>
										</tfoot>
											{detailProduct.map((e,index)=>{
												return(
													<tbody>
													<ProductList {...e} key={index}/>
												</tbody>
												)
											})
											}
										
									</table>
								</div>
							</div>
						</div>            
			</React.Fragment>
		)
	}

export default Product;