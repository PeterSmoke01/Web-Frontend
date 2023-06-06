import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserRequest = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [requests, setRequests] = useState([]);

  // Get all requests
  const getUserRequests = async () => {
    try {
      const response = await axios.get("/api/v1/request/requests");
      setRequests(response.data);
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
    getUserRequests();
  }, []);

  // useEffect(() => {
  //   getSingleReq();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Update request
  // const handleUpdatedReq = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const requestData = new FormData();
  //     requestData.append("category", updatedCategory);
  //     requestData.append("name", updatedName);
  //     requestData.append("quantity", updatedQuantity);
  //     if (updatedPhoto) {
  //       requestData.append("updatedPhoto", updatedPhoto);
  //     }
  //     requestData.append("description", updatedDescription);

  //     const { data } = await axios.put(
  //       `/api/v1/request/requests/${selected._id}`,
  //       requestData
  //     );

  //     if (data.success) {
  //       Swal.fire({
  //         icon: "success",
  //         title: `${updatedReq.name} confirmed successfully!`,
  //       });
  //       navigate("/admin/user-request");
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: "Something went wrong!",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Something went wrong!",
  //     });
  //   }
  // };

  // Delete request
  const handleDeleteReq = async () => {
    try {
      const { data } = await axios.delete(
        `/api/v1/request/requests/${params.slug}`
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

  return (
    <Layout title={"Dashboard - User Request"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Request List</h1>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">User Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.user.name}</td>
                      <td>
                        <Link
                          key={c._id}
                          to={`/dashboard/admin/users-request/${c._id}`}
                        >
                          <button className="btn btn-primary ms-2">Edit</button>
                        </Link>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={handleDeleteReq}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserRequest;
