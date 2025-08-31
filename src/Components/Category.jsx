import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
  const [category, setCategory] = useState([])

  useEffect(() => {
    axios.get(`${backend_url}/auth/category`)
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }, [])

  return (
    <div className="px-5 mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-primary">
          <i className="bi bi-grid me-2"></i> Category List
        </h3>
        <Link to="/dashboard/add_category" className="btn btn-success shadow-sm">
          <i className="bi bi-plus-circle me-1"></i> Add Category
        </Link>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-body p-0">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th className="text-secondary fw-semibold">S no.</th>
                <th className="text-secondary fw-semibold">Category Name</th>
              </tr>
            </thead>
            <tbody>
              {category.length > 0 ? (
                category.map((c, index) => (
                  <tr key={c.id || index}>
                    <td className="fw-medium">{index + 1}</td>
                    <td>{c.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center text-muted py-3">
                    <i className="bi bi-exclamation-circle me-2"></i> No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Category
