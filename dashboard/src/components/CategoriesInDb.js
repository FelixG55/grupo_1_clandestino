import React, {Component} from 'react';
import Category from './Category';
import { useState } from 'react';
import { useEffect } from 'react';

const CategoriesInDB = () => {

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
		fetch(`api/products`)
		.then(res =>{
			return res.json();
		})
		.then(data => {
			setCategories(data.countByCategory)
			console.log(data.countByCategory);
            const categories = data.countByCategory;
		})
	},[])
    
    return   (
        <React.Fragment>
                {/*<!-- Categories in DB -->*/}
                
                <div className="col-lg-6 mb-4">						
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-gray-800">Categorias en Data Base</h6>
                        </div>
                        <div className = {`card-body`} >
                            {categories && categories?.map((e,index) => {
                                return(
                            <div className="row">
                                {       
                                <Category {...e} key={index}/>
                                }
                                
                            </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
           
        </React.Fragment>
    )

}

export default CategoriesInDB;