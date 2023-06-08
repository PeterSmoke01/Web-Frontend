import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Select } from "antd";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Option } from "antd/es/mentions";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUserRequest = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");

  const getSingleReq = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/request/requests?id=${params.slug}`
      );
      const userData = data[0];
      console.log(userData);

      const categoryData = categories.find(
        (category) => category._id === userData.product.category
      );
      if (categoryData) {
        setCategory(categoryData.name);
      }

      setName(userData.product.name);
      setCategory(userData.product.category);
      console.log(userData);

      console.log(name); // The updated value of `name`
    } catch (error) {
      console.log(error);
    }
    console.log(name);
  };

  useEffect(() => {
    getSingleReq();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //post product to collection products
  const postProduct = async () => {
    try {
      const productData = {
        name,
        category,
        // Add other properties as needed (e.g., photo, description)
      };

      // Make the POST request to create the product
      const response = await axios.post(
        "/api/v1/request/users-request",
        productData
      );
      console.log(response.data);
      // Handle the response as needed
    } catch (error) {
      console.log(error);
      // Handle the error
    }
  };

  // confirm request แล้วจะเพิ่ม product นั้นเข้าไปใน collection products
  // และลบ request นั้นออกจาก collection requests
  // const confirmRequest = async () => {
  //   const products = new productModel({
  //     name,
  //     quantity,
  //     category,
  //     photo,
  //     description,
  //   });

  //   await products.save();
  //   await axios.delete(`/api/v1/request/requests/${id}`);
  //   Swal.fire({
  //     icon: "success",
  //     title: "Success!",
  //     text: "Add product successfully!",
  //   });
  //   navigate("/admin/products");
  // };

  // Delete request
  const handleDeleteReq = async () => {
    try {
      const { data } = await axios.delete(
        `/api/v1/request/users-request/${params.slug}`
      );
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Request deleted successfully!",
        });
        navigate("/admin/user-request");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  //get all category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  console.log(value);
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3" onClick={postProduct}>
                <button className="btn btn-primary">UPDATE PRODUCT</button>
              </div>
              <button className="btn btn-danger ms-2" onClick={handleDeleteReq}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateUserRequest;
