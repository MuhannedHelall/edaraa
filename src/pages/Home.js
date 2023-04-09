import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Home() {
  const errMsgAlert = (message) => {
    const alert = document.getElementById("login-alert");
    alert.firstChild.innerText = message;
    alert.classList.remove("opacity-0");
  };
  const saveCookie = (user) => {
    Cookies.set("id", user.id, { expires: 7 });
    Cookies.set("name", user.name, { expires: 7 });
    Cookies.set("email", user.email, { expires: 7 });
    Cookies.set("isAdmin", user.isAdmin, { expires: 7 });
    Cookies.set("isActive", user.isActive, { expires: 7 });
    Cookies.set("phone", user.phone, { expires: 7 });
    Cookies.set("token", user.token, { expires: 7 });
    window.location.replace("/Dashboard");
  };
  const login = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify({
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        data.user ? saveCookie(data.user) : errMsgAlert(data.message);
      })
      .catch((error) => console.error(error));
  };
  console.log(Cookies.get());
  return (
    <>
      <div className="bg-light px-5 py-2 d-flex justify-content-evenly align-items-center sticky-top">
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
        className="d-flex flex-column justify-content-end align-items-center text-uppercase"
        style={{ minHeight: "60vh" }}
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

      <div id="liveAlertPlaceholder" className="mx-5 m-5 py-2 px-5">
        <div
          className="col alert alert-danger alert-dismissible rounded-pill px-5 mx-5 opacity-0"
          role="alert"
          id="login-alert"
        >
          <div className="text-center fs-4">1</div>
          <button
            type="button"
            className="btn-close mt-1"
            onClick={() =>
              document.getElementById("login-alert").classList.add("opacity-0")
            }
          ></button>
        </div>
      </div>

      <div id="footer" className="text-center">
        <p>&copy; COPYRIGHTS ARE RESERVED 2023.</p>
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
            <form onSubmit={(e) => login(e)}>
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
                <div className="mb-3">
                  <label htmlFor="login-email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="login-email"
                    aria-describedby="emailHelp"
                    name="email"
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="login-password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="login-password"
                    name="password"
                  />
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
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
