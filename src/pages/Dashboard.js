import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import superWarehouseData from "../data/superWarehouseData";

function Dashboard() {
  // console.log(Cookies.get());
  const [adminData, setAdminData] = useState([]);
  const [superData, setSuperData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/DashboardDataForAdmin")
      .then((response) => response.json())
      .then((data) =>
        Cookies.get("isAdmin") ? setAdminData(data) : setSuperData(data)
      )
      .catch((error) => console.error(error));
  }, []);

  const Admin = () => {
    return (
      <>
        <div className="col-12 col-lg-4 mt-3 box">
          <Link to={"/warehouses"} className="text-decoration-none link-dark">
            <div className="text-center border border-2 rounded-3 bg-light shadow py-3 my-5 mt-5 w-100">
              <i className="bi bi-houses-fill" style={{ fontSize: "80pt" }}></i>
              <p>Warehouses</p>
              <p>{adminData.warehouse}</p>
            </div>
          </Link>
        </div>
        <div className="col-12 col-lg-4 mt-3 box">
          <Link to={"/supervisors"} className="text-decoration-none link-dark">
            <div className="text-center border border-2 rounded-3 bg-light shadow py-3 my-5 mt-5 w-100">
              <i className="bi bi-people" style={{ fontSize: "80pt" }}></i>
              <p>Supervisors</p>
              <p>{adminData.supervisors}</p>
            </div>
          </Link>
        </div>
        <div className="col-12 col-lg-4 mt-3 box">
          <Link to={"/Requests"} className="text-decoration-none link-dark">
            <div className="text-center border border-2 rounded-3 bg-light shadow py-3 my-5 mt-5 w-100">
              <i className="bi bi-bell" style={{ fontSize: "80pt" }}></i>
              <p>Requests</p>
              <p>{adminData.requests}</p>
            </div>
          </Link>
        </div>
      </>
    );
  };
  const Supervisor = () => {
    return (
      <>
        <div className="col-6 mt-3 box">
          <Link
            to={"/warehouses/" + superWarehouseData.id}
            className="text-decoration-none link-dark"
          >
            <div className="text-center border border-2 rounded-3 bg-light shadow py-3 my-5 mt-5 w-100">
              <i className="bi bi-bag-heart" style={{ fontSize: "80pt" }}></i>
              <p>Products</p>
              <p>{superData.numOfProducts}</p>
            </div>
          </Link>
        </div>
        <div className="col-6 mt-3 box">
          <Link to={"/Requests"} className="text-decoration-none link-dark">
            <div className="text-center border border-2 rounded-3 bg-light shadow py-3 my-5 mt-5 w-100">
              <i className="bi bi-bell" style={{ fontSize: "80pt" }}></i>
              <p>Requests</p>
              <p>{superData.numOfRequests}</p>
            </div>
          </Link>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2 fs-1">
          <i className="bi bi-table me-3"></i>
          Dashboard
        </h1>
      </div>

      <section className="container-fluid">
        <div className="row" style={{ fontSize: "35pt" }}>
          {Cookies.get("isAdmin") ? Admin() : Supervisor()}
        </div>
      </section>
    </>
  );
}

export default Dashboard;
