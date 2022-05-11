import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// Store
import { GlobalContext } from "../Store/Globalstate";

const ItemDetails = (props) => {

    const { state, dispatch } = useContext(GlobalContext);
    const [itemDetails, setItemDetails] = useState('')
    let {itemId} = useParams()
    useEffect(() => {
        getItemDetails(itemId);
    }, []);

    const getItemDetails = (id) => {
        let data =  state.rows.find(element => element.id == id);
        setItemDetails(data)
    }

    return (
        <div>
             <h1>Detail Page</h1>
            <Link to={`/dashboard`}>&laquo; Back</Link>

            <table>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>{itemDetails.name}</td>
                    <td>{itemDetails.price}</td>
                    <td>{itemDetails.is_completed ? 'Completed' : 'Not completed'}</td>
                </tr>
            </table>
        </div>
    )
}

export default ItemDetails