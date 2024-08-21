import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginImg from "../../assets/login-2.jpeg";
import { PostCustomerLogin } from "../Api";

const CustomerLogin = () => {
  const [errors, setErrors] = useState();
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      phone: data.get("phone"),
      password: data.get("password"),
    };
    PostCustomerLogin(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        localStorage.setItem("token", msg);
        navigate("/customer/main");
      } else {
        if (msg == "NO DATA") {
          setErrors("No User");
        } else if (msg == "Wrong Password") {
          setErrors("Wrong Password");
        } else {
          console.log(data);
        }
      }
    });
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
          <img className="w-full h-full object " src={LoginImg} alt="" />
        </div>

        <div className="bg-gray-100 flex flex-col justify-center">
          <form
            onSubmit={handleLogin}
            className="max-w-[400px] w-full mx-auto bg-white p-4"
          >
            <h1 className="text-4xl font-bold text-center py-6">Login</h1>

            <label className="form-control w-full flex flex-col p-2">
              <div className="label">
                <span className="label-text">Phone Number</span>
              </div>
              <input
                type="text"
                name="phone"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full flex flex-col p-2 ">
              <div className="label">
                <span className="label-text">Password</span>
              </div>

              <input
                type="password"
                name="password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full flex flex-col p-2 ">
              {errors && <p className="mt-1 text-red-500 text-sm">{errors}</p>}
            </label>

            <div className="py-4">
              <button className="btn btn-warning w-full" type="submit">
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerLogin;
