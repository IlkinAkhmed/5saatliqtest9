import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "./index.scss";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

function Add() {
  const [allData, setAllData] = useState(null);
  const [input, setInput] = useState("");
  const [sortedData, setSortedData] = useState(null);

  async function fetchAllData() {
    const res = await axios.get("http://localhost:4100/products");
    setAllData(res.data);
  }
  async function deleteData(id) {
    await axios.delete(`http://localhost:4100/products/${id}`);
    await fetchAllData();
    Swal.fire({
      icon: "success",
      title: "Post Deleted",
    });
  }
  async function handleSubmit(values) {
    await axios.post("http://localhost:4100/products", values);
    Swal.fire({
      icon: "success",
      title: "Post Created",
    });
    await fetchAllData();
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  function checkPropertyString(item) {
    if (typeof item === "string") {
      return item.toLowerCase();
    } else {
      return item;
    }
  }

  return (
    <>
      <Helmet>
        <title>Home | Add</title>
      </Helmet>
      <div className="add">
        <h1>Post Data</h1>
        <Formik
          initialValues={{ image: "", title: "", price: "" }}
          validationSchema={Yup.object({
            image: Yup.string()
              .max(30, "Must be 30 characters or less")
              .required("Required"),
            title: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            price: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values);
            resetForm();
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="form">
            <label htmlFor="image">Image</label>
            <Field className="input" name="image" type="text" />
            <ErrorMessage name="image" />

            <label htmlFor="title">Title</label>
            <Field className="input" name="title" type="text" />
            <ErrorMessage name="title" />

            <label htmlFor="price">Price</label>
            <Field className="input" name="price" type="number" />
            <ErrorMessage name="price" />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
        <h1>Products</h1>
        <div className="filterArea">
          <input
            type="text"
            placeholder="search name..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={() => setSortedData({ property: "title", asc: true })}
          >
            A-z
          </button>
          <button
            onClick={() => setSortedData({ property: "title", asc: false })}
          >
            z-A
          </button>
          <button
            onClick={() => setSortedData({ property: "price", asc: true })}
          >
            price HIGH to LOW
          </button>
          <button
            onClick={() => setSortedData({ property: "price", asc: false })}
          >
            price LOW to HIGH
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allData &&
              allData
                .filter((item) =>
                  item.title
                    .trim()
                    .toLowerCase()
                    .includes(input.trim().toLowerCase())
                )
                .sort((a, b) => {
                  if (sortedData && sortedData.asc) {
                    return checkPropertyString(a[sortedData.property]) >
                      checkPropertyString(b[sortedData.property])
                      ? 1
                      : checkPropertyString(b[sortedData.property]) >
                        checkPropertyString(a[sortedData.property])
                      ? -1
                      : 0;
                  } else if (sortedData && sortedData.asc === false) {
                    return checkPropertyString(a[sortedData.property]) >
                      checkPropertyString(b[sortedData.property])
                      ? -1
                      : checkPropertyString(b[sortedData.property]) >
                        checkPropertyString(a[sortedData.property])
                      ? 1
                      : 0;
                  } else {
                    return 0;
                  }
                })
                .map((item) => (
                  <tr>
                    <td>{item._id}</td>
                    <td>
                      <i className={item.image}></i>
                    </td>
                    <td>{item.title}</td>
                    <td>${item.price}.00</td>
                    <td>
                      <i
                        onClick={() => deleteData(item._id)}
                        className="fa-solid fa-trash-can"
                      ></i>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Add;
