import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import Swal from "sweetalert2";
import { Select } from "antd";

const { Option } = Select;

const Orders = () => {
  const user = JSON.parse(localStorage.getItem("auth")).user;
  const status = "pending";
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState("");

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

  // const checkRequestStatus = async (requestId) => {
  //   try {
  //     const { data } = await axios.post(
  //       `/api/v1/request/requests/${requestId}`,
  //       {
  //         user,
  //       }
  //     );

  //     if (data?.status === "submitted") {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Request submitted successfully",
  //       });
  //       navigate("/dashboard/user/products");
  //     } else if (data?.status === "rejected") {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Request rejected",
  //         text: data?.reason || "The request was rejected by the admin.",
  //       });
  //     } else {
  //       // Request is still pending, continue polling
  //       setTimeout(() => checkRequestStatus(requestId), 2000); // Poll every 2 seconds
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Failed to check the request status.",
  //     });
  //   }
  // };

  //create request function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      category,
      quantity,
      photo,
    };
    if (name === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields!",
      });
    } else {
      await axios
        .post("http://localhost:8080/api/v1/request/requests", {
          product,
          user,
          status,
        })
        .then((res) => {
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "Product created successfully",
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  };

  return (
    <Layout title={"Add New Car"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Add New Car</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
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
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  SEND REQUEST
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
