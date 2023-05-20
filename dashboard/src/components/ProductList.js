import React from 'react'

const ProductList = (props) => {
  return (
    <tr>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>{props.description}</td>
        <td>{props.categories.name}</td>
        <td>
        <img  style={{width: 5 +'rem'}} src={require(`../assets/images/delivery-products/productosDelivery/${props.image}`)} alt={props.name} />
        </td>
    </tr>
  )
}

export default ProductList