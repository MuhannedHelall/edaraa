import React from "react";
import { Link } from "react-router-dom";
import adminDashboardData from "../data/adminDashboardData";
import superDashboardData from "../data/superDashboardData";
import superWarehouseData from "../data/superWarehouseData";
import userData from "../data/userData";

function Dashboard() {
  const Admin = () => {
    return (
      <>
        <div className="col-12 col-lg-4 mt-3 box">
          <Link to={"/warehouses"} className="text-decoration-none link-dark">
            <div className="text-center border border-2 rounded-3 bg-light shadow py-3 my-5 mt-5 w-100">
              <i className="bi bi-houses-fill" style={{ fontSize: "80pt" }}></i>
              <p>Warehouses</p>
              <p>{adminDashboardData.numOfWarhouses}</p>
            </div>
          </Link>
        </div>
        <div className="col-12 col-lg-4 mt-3 box">
          <Link to={"/supervisors"} className="text-decoration-none link-dark">
            <div className="text-center border border-2 rounded-3 bg-light shadow py-3 my-5 mt-5 w-100">
              <i className="bi bi-people" style={{ fontSize: "80pt" }}></i>
              <p>Supervisors</p>
              <p>{adminDashboardData.numOfSupervisors}</p>
            </div>
          </Link>
        </div>
        <div className="col-12 col-lg-4 mt-3 box">
          <Link to={"/Requests"} className="text-decoration-none link-dark">
            <div className="text-center border border-2 rounded-3 bg-light shadow py-3 my-5 mt-5 w-100">
              <i className="bi bi-bell" style={{ fontSize: "80pt" }}></i>
              <p>Requests</p>
              <p>{adminDashboardData.numOfRequests}</p>
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
              <p>{superDashboardData.numOfProducts}</p>
            </div>
          </Link>
        </div>
        <div className="col-6 mt-3 box">
          <Link to={"/Requests"} className="text-decoration-none link-dark">
            <div className="text-center border border-2 rounded-3 bg-light shadow py-3 my-5 mt-5 w-100">
              <i className="bi bi-bell" style={{ fontSize: "80pt" }}></i>
              <p>Requests</p>
              <p>{superDashboardData.numOfRequests}</p>
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
          {userData.type === "Admin" ? Admin() : Supervisor()}
        </div>
      </section>
    </>
  );
}

export default Dashboard;
