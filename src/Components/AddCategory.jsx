import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const backend_url = import.meta.env.VITE_BACKEND_URL;

const AddCategory = () => {
    // Initialize as empty string
    const [category, setCategory] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!category.trim()) {
            alert("Category cannot be empty")
            return
        }
        console.log("1" , category)
        // Send POST request with 'name' key to match backend
        axios.post(`${backend_url}/auth/add_category`, { name: category })
            .then(result => {
                console.log(category)
                if (result.data.Status) {
                    navigate('/dashboard/category')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-25 border'>
                <h2>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="category"><strong>Category:</strong></label>
                        <input
                            type="text"
                            name='category'
                            id='category'
                            placeholder='Enter Category'
                            value={category} // Controlled input
                            onChange={(e) => setCategory(e.target.value)}
                            className='form-control rounded-0'
                            required
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Add Category</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory
