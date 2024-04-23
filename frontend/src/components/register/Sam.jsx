import { useEffect, useState } from "react";

function Registration() {
  const data = { name: "", email: "", password: "" };
  const [inputData, setInputData] = useState(data);
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    console.log("Registered");
  }, [isRegistered]);

  function handleData(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(inputData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputData.name || !inputData.email || !inputData.password) {
      alert("All fields are mandatory");
    } else {
      setIsRegistered(true);
    }
  }

  return (
    <>
      <pre>
        {" "}
        {isRegistered ? (
          <h2> Hello {inputData.name}, You have registered Successfully </h2>
        ) : (
          ""
        )}{" "}
      </pre>
      <form className="container" onSubmit={handleSubmit}>
        <div className="header">
          <h1>Registration Form</h1>

          <div>
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              value={inputData.name}
              onChange={handleData}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Your Email"
              name="email"
              value={inputData.email}
              onChange={handleData}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Your Password"
              name="password"
              value={inputData.password}
              onChange={handleData}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Renter Your Password"
              name="password"
              value={inputData.password}
              onChange={handleData}
            />
          </div>

          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default Registration;
