import React, { useEffect, useState } from "react";

const User = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    image: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNo: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleValidation = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Name validation
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!formData.name) {
      newErrors.name = "Name is required!";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name should only contain alphabets and spaces!";
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = "Email is required!";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email!";
    }

    // Phone number validation
    const phoneRegex = /^[789]\d{9}$/;
    if (!formData.phoneNo) {
      newErrors.phoneNo = "Phone number is required!";
    } else if (!phoneRegex.test(formData.phoneNo)) {
      newErrors.phoneNo =
        "Phone number must be a valid 10-digit Indian number!";
    }

    // Image validation
    const validImageTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];
    if (!formData.image) {
      newErrors.image = "Profile picture is required!";
    } else if (!validImageTypes.includes(formData.image.type)) {
      newErrors.image = "Only PNG, JPG, JPEG, and WEBP formats are allowed!";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
      console.log("Form Data:", formData);
    }
  };
  useEffect(() => {
    const sendUser = async () => {
      try {
        const res = await fetch("/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          alert("User registered successfully!");
        } else {
          const data = await res.json();
          console.error(data.error || "Something went wrong!");
          alert(data.error || "Error occurred while registering.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Error during registration. Please try again.");
      }
    };

    sendUser();
  }, [formData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-center text-3xl py-5 text-teal-800 font-noto font-bold">
        User Registration
      </h1>
      <form
        className="text-teal-700 font-kanit text-lg flex flex-col gap-5 p-8 bg-white rounded-lg shadow-md w-full max-w-lg border border-teal-700"
        onSubmit={handleValidation}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border rounded-md text-teal-600 focus:ring-2 focus:ring-teal-500"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border rounded-md text-teal-600 focus:ring-2 focus:ring-teal-500"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNo" className="font-bold">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNo"
            id="phoneNo"
            placeholder="Enter number"
            value={formData.phoneNo}
            onChange={handleChange}
            className="p-3 border rounded-md text-teal-600 focus:ring-2 focus:ring-teal-500"
          />
          {errors.phoneNo && <p className="text-red-500">{errors.phoneNo}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="font-bold">
            Profile Picture
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
            className="p-3 border rounded-md"
          />
          {errors.image && <p className="text-red-500">{errors.image}</p>}
        </div>
        <div>
          <input
            type="submit"
            value="Register"
            className="w-full p-3 bg-teal-700 text-white rounded-md cursor-pointer hover:bg-teal-800"
          />
        </div>
      </form>
    </div>
  );
};

export default User;
