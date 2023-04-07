import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="bg-light px-5 py-2 d-flex justify-content-evenly align-items-center">
        <span className="fs-2 fw-bold">Edaraa</span>
        <button
          className="btn btn-outline-secondary fs-4 px-4 rounded-5"
          data-bs-toggle="modal"
          data-bs-target="#Login"
        >
          Login
        </button>
      </div>

      <div
        className="d-flex flex-column justify-content-center align-items-center text-uppercase"
        style={{ height: "90vh" }}
      >
        <h1 className="fw-bolder" style={{ fontSize: "60pt" }}>
          Welcome to our
        </h1>
        <h3 className="fw-bold mb-4" style={{ fontSize: "40pt" }}>
          Inventory Management System
        </h3>
        <Link
          to={"/Dashboard"}
          className="btn btn-outline-dark fs-3 rounded-5 px-5"
          data-bs-toggle="modal"
          data-bs-target="#Login"
        >
          Discover More
        </Link>
        <p className="text-capitalize mt-4 text-muted">
          The best inventory management system ever that anyone can use, try it
          now !
        </p>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="Login"
        tabIndex="-1"
        aria-labelledby="LoginLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="LoginLabel">
                Login Form
              </h1>
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
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                  </label>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-dark">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
