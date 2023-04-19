import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import WarehouseNavItem from "./WarehouseNavItem";
import DeleteUserCookies from "../components/DeleteUserCookies";
import ResHandler from "./../components/ResHandler";
import "../assets/styles/MainPage.css";

function MainPage() {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    if (Cookies.get("id") === undefined || Cookies.get("id") === null)
      navigate("/");
    getAllWarehouses();
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const getAllWarehouses = () => {
    fetch("http://localhost:8000/getWarehouses")
      .then((response) => response.json())
      .then((data) => setWarehouses(data));
  };
  const updateUser = (event) => {
    event.preventDefault();
    const user = {
      name: document.getElementById("editAdminName").value,
      email: document.getElementById("editAdminEmail").value,
      phone: document.getElementById("editAdminPhone").value,
      password: document.getElementById("editAdminPassword").value,
    };
    fetch(
      "http://localhost:8000/updateSupervisor/" +
        document.getElementById("userId").value,
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data.error
          ? ResHandler(data.error, "danger")
          : saveCookie(data.message, user);
      })
      .catch((error) => console.error(error));
  };
  const saveCookie = (msg, user) => {
    if (user.name) Cookies.set("name", user.name, { expires: 7 });
    if (user.email) Cookies.set("email", user.email, { expires: 7 });
    if (user.phone) Cookies.set("phone", user.phone, { expires: 7 });
    ResHandler(msg);
  };
  const editUserModal = () => {
    document.getElementById("userId").value = Cookies.get("id");
    document.getElementById("editAdminName").value = Cookies.get("name");
    document.getElementById("editAdminEmail").value = Cookies.get("email");
    document.getElementById("editAdminPhone").value = Cookies.get("phone");
  };
  const handleClick = () => {
    document.getElementById("liveAlertPlaceholder").innerHTML = "";
  };

  // View
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
              {warehouses.map((item) => {
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
          to={"/warehouses/" + 1}
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
                <button
                  type="button"
                  className="btn nav-link"
                  onClick={DeleteUserCookies}
                >
                  Sign out
                </button>
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
              {Cookies.get("isAdmin") === "true" ? Admin() : Supervisor()}
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
                      <button
                        type="button"
                        className="btn link-dark d-inline-flex text-decoration-none rounded fs-6"
                        data-bs-toggle="modal"
                        data-bs-target="#editProfile"
                        onClick={editUserModal}
                      >
                        <i className="bi bi-person-fill-gear me-2"></i>
                        Edit Profile
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="btn link-dark d-inline-flex text-decoration-none rounded fs-6"
                        onClick={DeleteUserCookies}
                      >
                        <i className="bi bi-box-arrow-left me-2"></i>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          {/* <!-- Content --> */}
          <div className="col-10 bg-white px-5">
            <div id="liveAlertPlaceholder" className="mt-3"></div>
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
            <form onSubmit={(e) => updateUser(e)}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {Cookies.get("isAdmin") === "true"
                    ? "Edit Admin"
                    : "Edit Supervisor"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input id="userId" name="userId" type="hidden" />
                <div className="mb-3">
                  <label htmlFor="editAdminName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editAdminName"
                    name="name"
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
                  <label htmlFor="editAdminPhone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editAdminPhone"
                  />
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-outline-dark my-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#editPassword"
                    aria-expanded="false"
                    aria-controls="collapseWidthExample"
                  >
                    Change Password
                  </button>
                  <div
                    id="editPassword"
                    className="collapse collapse-horizontal"
                  >
                    <div style={{ width: "465px" }}>
                      <label htmlFor="editAdminPassword" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="editAdminPassword"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-dark px-4"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
