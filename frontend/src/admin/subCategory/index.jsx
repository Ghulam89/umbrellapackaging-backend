import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"
import { FaSearch } from "react-icons/fa";
import AddSubCategory from "./AddSubCategory";
import UploadCSV from "./UploadCSV";
import { BaseUrl } from "../../utils/BaseUrl";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

const SubCategory = () => {
  const [users, setUsers] = useState([]);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSizes();
  }, [currentPage, search]);

  const fetchSizes = () => {
    setLoading(true);
    axios
      .get(`${BaseUrl}/category/getAll?page=${currentPage}&perPage=${itemsPerPage}&search=${search}`)
      .then((res) => {
        setUsers(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
        setTotalItems(res.data.totalItems);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

 const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages && !loading) { 
    setCurrentPage(page);
  }
};

  const handleEdit = (item) => {
    setEditData(item);
    setIsUpdateOpen(true);
  };

  const removeFunction = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#A47ABF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BaseUrl}/category/delete/${id}`)
          .then((res) => {
            if (res.data.status === "success") {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              fetchSizes();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="main_title">Sub Categories</h2>
        <div className="flex items-center gap-2">
          <Button
            className="bg-primary py-2.5"
            label="Add"
            onClick={() => {
              setEditData(null);
              setIsUpdateOpen(true);
            }}
          />
        </div>
      </div>

      <UploadCSV 
        setIsModalOpen={setIsUploadOpen} 
        isModalOpen={isUploadOpen} 
        fetchSizes={fetchSizes}
      />

      <AddSubCategory 
        isModalOpen={isUpdateOpen}
        setIsModalOpen={setIsUpdateOpen}
        isEditMode={!!editData}
        editData={editData}
        fetchSizes={fetchSizes}
      />

      <div className="my-4">
        <Input
          placeholder="Search..."
          Icon={<FaSearch />}
          value={search}
          onChange={handleSearch}
          className="w-full bg-white border"
        />
      </div>

      {/* Display total items and current range */}
      <div className="mb-2 text-sm text-gray-600">
        Total Sub Categories: {totalItems} | Showing {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </div>

      <section className="mb-20 mt-5 text-gray-800">
        <div className="block rounded-lg shadow-lg bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full mb-0">
              <thead className="bg-primary rounded-lg">
                <tr>
                  <th className="text-sm text-white font-bold px-6 py-4">No</th>
                  <th className="text-sm text-white font-bold px-6 py-4">Category Name</th>
                  <th className="text-sm text-white font-bold px-6 py-4">Title</th>
                  <th className="text-sm text-white font-bold px-6 py-4">Image</th>
                  <th className="text-sm text-white font-bold px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                     <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-2 text-gray-600">Loading categories...</p>
        </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No sub categories found
                    </td>
                  </tr>
                ) : (
                  users.map((item, index) => (
                    <tr key={item._id} className="bg-white text-center border-b">
                      <td className="text-sm font-normal px-6 py-4">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="text-sm font-normal px-6 py-4">
                        <span className="text-base text-black bg-green-200 py-1 px-2.5 rounded-full">
                          {item?.brandId?.name || 'N/A'}
                        </span>
                      </td>
                      <td className="text-sm font-normal px-6 py-4">
                        <span className="text-base text-black bg-green-200 py-1 px-2.5 rounded-full">
                          {item?.title}
                        </span>
                      </td>
                      <td className="text-sm font-normal px-6 py-4">
                        {item?.image ? (
                          <img 
                            src={`${Base_url}/${item.image}`} 
                            className="rounded-md w-16 h-16 mx-auto object-cover" 
                            alt="Sub Category" 
                          />
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </td>
                      <td className="text-sm font-normal px-6 py-4">
                        <div className="flex gap-2 justify-center items-center">
                          <img
                            onClick={() => handleEdit(item)}
                            src={require("../../assets/image/edit.png")}
                            alt="Edit"
                            className="cursor-pointer w-6 h-6"
                          />
                          <img
                            onClick={() => removeFunction(item._id)}
                            src={require("../../assets/image/del.png")}
                            alt="Delete"
                            className="cursor-pointer w-6 h-6"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
              </div>
              
              <div className="flex gap-2 items-center">
                <button
                  className="px-4 py-2 text-white bg-black rounded disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                <div className="flex items-center gap-2">
                  <select
                    className="px-2 py-1 border rounded"
                    value={currentPage}
                    onChange={(e) => handlePageChange(Number(e.target.value))}
                  >
                    {Array.from({ length: totalPages }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        Page {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  className="px-4 py-2 text-white bg-black rounded disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubCategory;