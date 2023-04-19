import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import AdminProductItem from "./Admin/AdminProductItem";
import SupervisorProductItem from "./Supervisor/SupervisorProductItem";
import ResHandler from "../components/ResHandler";

function ProductsPage() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  // eslint-disable-next-line
  useEffect(() => getAllProducts(), []);

  const getAllProducts = () => {
    fetch("http://localhost:8000/getAllProducts/" + params.id)
      .then((response) => response.json())
      .then((data) => {
        data.error ? ResHandler(data.error, "danger") : setProducts(data);
      });
  };

  const addProduct = (event) => {
    event.preventDefault();
    let name = document.getElementById("addProductName");
    let desc = document.getElementById("addDescription");
    let stock = document.getElementById("addStock");
    let price = document.getElementById("addPrice");
    let img = document.getElementById("addImg");
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("description", desc.value);
    formData.append("stock", stock.value);
    formData.append("price", price.value);
    formData.append("image", image);
    fetch("http://localhost:8000/addNewProduct/" + params.id, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        getAllProducts();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      })
      .catch((error) => console.error(error));
    name.value = "";
    desc.value = "";
    stock.value = "";
    price.value = "";
    img.value = "";
  };

  const editProduct = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", document.getElementById("editProductName").value);
    formData.append(
      "description",
      document.getElementById("editDescription").value
    );
    formData.append("stock", document.getElementById("editStock").value);
    formData.append("price", document.getElementById("editPrice").value);
    formData.append("image", image);
    fetch(
      "http://localhost:8000/updateProduct/" +
        document.getElementById("productId").value,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        getAllProducts();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      })
      .catch((error) => console.error(error));
  };

  const deleteProduct = (product) => {
    fetch("http://localhost:8000/deleteProduct/" + product.id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        getAllProducts();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      })
      .catch((error) => console.error(error));
  };

  const makeRequest = (event) => {
    event.preventDefault();
    const data = {
      SupervisorID: Cookies.get("id"),
      ProductID: document.getElementById("superRequestMaking").value,
      quantity: document.getElementById("stockRequest").value,
      isIncrease: document.getElementById("isIncrease").value,
    };
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch("http://localhost:8000/makeRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((data) => {
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      })
      .catch((error) => console.error(error));
  };

  //View
  const Admin = () => {
    const editProductModal = (product) => {
      document.getElementById("productId").value = product.id;
      document.getElementById("editProductName").value = product.name;
      document.getElementById("editDescription").value = product.description;
      document.getElementById("editStock").value = product.stock;
      document.getElementById("editPrice").value = product.price;
    };
    return products.map((product) => {
      console.log(product);
      return (
        <AdminProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          stock={product.stock}
          price={product.price}
          img={product.image}
          editProductModal={editProductModal}
          deleteProduct={deleteProduct}
        />
      );
    });
  };
  const Supervisor = () => {
    const getRequestData = (requestId) => {
      document.getElementById("superRequestMaking").value = requestId;
    };

    return products.map((product) => {
      return (
        <SupervisorProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          img={product.image}
          stock={product.stock}
          getRequestData={getRequestData}
        />
      );
    });
  };
  const AdminModals = () => {
    const handleFileChange = (event) => {
      setImage(event.target.files[0]);
    };
    return (
      <>
        <div
          className="modal fade"
          id="addProduct"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form encType="multipart/form-data" onSubmit={addProduct}>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Product
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="addProductName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="addProductName"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addDescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text-area"
                      className="form-control"
                      id="addDescription"
                      aria-describedby="emailHelp"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addStock" className="form-label">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="addStock"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addPrice" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="addPrice"
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="addImg"
                      onChange={handleFileChange}
                      required
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
                    className="btn btn-dark px-4"
                    data-bs-dismiss="modal"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="editProduct"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form encType="multipart/form-data" onSubmit={editProduct}>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Product
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input type="hidden" id="productId" />
                  <div className="mb-3">
                    <label htmlFor="editProductName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editProductName"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editDescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text-area"
                      className="form-control"
                      id="editDescription"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editStock" className="form-label">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="editStock"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editPrice" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="editPrice"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="editFile"
                      onChange={handleFileChange}
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
  };
  const SupervisorModals = () => {
    return (
      <div
        className="modal fade"
        id="makeRequest"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={(e) => makeRequest(e)}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Make a Request
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input type="hidden" id="superRequestMaking" />
                <div className="mb-3">
                  <label htmlFor="stockRequest" className="form-label">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="stockRequest"
                  />
                </div>
                <div className="mb-3">
                  <select className="form-control" id="isIncrease">
                    <option value={true}>Increase</option>
                    <option value={false}>Decrease</option>
                  </select>
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
    );
  };
  const AddProductBtn = () => {
    return (
      <button
        className="btn btn-sm btn-outline-dark"
        data-bs-toggle="modal"
        data-bs-target="#addProduct"
      >
        <i className="bi bi-bag-plus-fill fs-4"></i>
      </button>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap py-3 mb-2 border-bottom">
        <h1 className="h2 fs-1">
          <i className="bi bi-bag-heart mx-2"></i>
          Products
        </h1>
        {Cookies.get("isAdmin") === "true" ? AddProductBtn() : null}
      </div>

      <section className="container-fluid">
        <div className="row">
          {Cookies.get("isAdmin") === "true" ? Admin() : Supervisor()}
        </div>
      </section>

      {Cookies.get("isAdmin") === "true" ? AdminModals() : SupervisorModals()}
    </>
  );
}

export default ProductsPage;
