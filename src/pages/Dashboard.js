import React, { useContext, useState } from 'react';

// Component
import { Table } from '../component/Table';

// Store
import { GlobalContext } from "../Store/Globalstate";

// Lib
import CsvDownload from 'react-json-to-csv'

const Dashboard = () => {
    const { state, dispatch } = useContext(GlobalContext);

    // Form States
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [is_completed, setCompleted] = useState(false);

    const formSubmit = e => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            name,
            price,
            is_completed
        };

        dispatch({
            type: "ADD_ITEM",
            payload: newItem
        });

        setName("");
        setPrice("");
        setCompleted("");
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>User item list</h2>
            <CsvDownload data={state.rows} className="btn-default">Export to csv</CsvDownload>
            {/* Display */}
            <div>
                <Table rows={state.rows} columns={state.columns} />
            </div>

            {/* Add */}
            <div>
            <h1>Add new item</h1>
                <form onSubmit={formSubmit}>
                    <div>
                        <label
                            htmlFor="name"
                        >
                            Name of the Item
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            onChange={e => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="price"
                        >
                            Price
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your price"
                            onChange={e => setPrice(e.target.value)}
                            value={price}
                        />
                    </div>{" "}{" "}
                    <div>
                        <button className="btn-default">
                            ADD ITEM
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Dashboard