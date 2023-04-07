import React, { useState } from "react";
import WarehouseNavItem from "./WarehouseNavItem";
import { Link, Outlet } from "react-router-dom";
import userData from "../data/userData";
import warehouseTableData from "../data/warehouseTableData";
import superWarehouseData from "../data/superWarehouseData";
import "../assets/styles/MainPage.css";

function MainPage() {
  const [items, setItems] = useState(warehouseTableData);
  const Admin = () => {
    return (
      <>
        <li className="mb-1">
          <div className="d-inline-flex align-items-center">
            <button
              className="btn-toggle border-0"
              data-bs-toggle="collapse"
              data-bs-target="#home-collapse"
              aria-expanded="false"
            >
              <i className="bi bi-houses-fill fs-5"></i>
            </button>
            <Link to={"/warehouses"} className="link-dark text-decoration-none">
              Warehouses
            </Link>
          </div>
          <div className="collapse" id="home-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              {items.map((item) => {
                return (
                  <WarehouseNavItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                  />
                );
              })}
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <Link
            to={"/supervisors"}
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0"
          >
            <i className="bi bi-people me-2 fs-5"></i>
            Supervisors
          </Link>
        </li>
      </>
    );
  };
  const Supervisor = () => {
    return (
      <li className="mb-1">
        <Link
          to={"/warehouses/" + superWarehouseData.id}
          className="btn btn-toggle d-inline-flex align-items-center rounded border-0"
        >
          <i className="bi bi-bag-heart me-2 fs-5"></i>
          Products
        </Link>
      </li>
    );
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg border-bottom sticky-top">
        <div className="container-fluid">
          <Link to={"/Dashboard"} className="link-dark text-decoration-none">
            <span className="fs-5 fw-semibold mx-5 text-white">Edaraa</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to={"/Dashboard"}
                  className="nav-link active"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/"} className="btn nav-link">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="container-fluid">
        <div className="row" style={{ minHeight: "92.2vh" }}>
          {/* <!-- Sidebar --> */}
          <div className="col-2 bg-light border">
            <ul className="list-unstyled p-3">
              <li className="mb-1">
                <Link
                  to={"/Dashboard"}
                  className="btn btn-toggle d-inline-flex align-items-center rounded border-0"
                >
                  <i className="bi bi-table me-2 fs-5"></i>
                  Dashboard
                </Link>
              </li>
              {userData.type === "Admin" ? Admin() : Supervisor()}
              <li className="mb-1">
                <Link
                  to={"/Requests"}
                  className="btn btn-toggle d-inline-flex align-items-center rounded border-0"
                >
                  <i className="bi bi-bell me-2 fs-5"></i>
                  Requests
                </Link>
              </li>
              <li className="border-top my-3"></li>
              <li className="mb-1">
                <button
                  className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#account-collapse"
                  aria-expanded="false"
                >
                  <i className="bi bi-fingerprint me-2 fs-5"></i>
                  Account
                </button>
                <div className="collapse" id="account-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <Link
                        to={""}
                        className="link-dark d-inline-flex text-decoration-none rounded fs-6"
                        data-bs-toggle="modal"
                        data-bs-target="#editProfile"
                      >
                        <i className="bi bi-person-fill-gear me-2"></i>
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/"}
                        className="link-dark d-inline-flex text-decoration-none rounded fs-6"
                      >
                        <i className="bi bi-box-arrow-left me-2"></i>
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          {/* <!-- Content --> */}
          <div className="col-10 bg-white px-5">
            <Outlet />
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="editProfile"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {userData.type === "Admin" ? "Edit Admin" : "Edit Supervisor"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="editAdminName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editAdminName"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editAdminEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="editAdminEmail"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editAdminPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="editAdminPassword"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editAdminPhoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editAdminPhoneNumber"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-dark px-4">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
