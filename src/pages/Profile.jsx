// import { FaRegCircleUser } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import ReqFieldItem from "../components/ReqFieldItem";
import { deleteCookie, getCookie } from "../utilities/getCSRF";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { UserContext } from "../context/userContext";
import { enqueueSnackbar } from "notistack";
import Navbar from "../components/Navbar";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditProfile from "./EditProfile";
import ChangePassword from "../pages/ChangePassword.jsx";

const style = {
  position: "absolute", // as 'absolute'
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 280,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "10px",
  // p: 4,
};

const styleForChangePassword = {
  position: "absolute", // as 'absolute'
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 370,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "10px",
  // p: 4,
};
// above is style for modal which is copied from material ui

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //  this code is copied from meterial ui for modal for edit

  const [openChangePass, setOpenChangePass] = React.useState(false);
  const handleOpenChangePass = () => setOpenChangePass(true);
  const handleCloseChangePass = () => setOpenChangePass(false);
  //  this code is copied from meterial ui for modal for change password
  const [requests, setRequests] = useState(null);
  const { user, isUserInfoReady } = useContext(UserContext);
  const [login, setLogin] = useState(getCookie("csrftoken"));

  useEffect(() => {
    axios
      .get("/userrequests/", {
        headers: {
          "X-CSRFToken": login,
        },
      })
      .then(({ data }) => {
        setRequests(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [login]);

  const logout = () => {
    axios
      .get("/logout/", {
        headers: {
          "X-CSRFToken": login,
        },
      })
      .then(() => {
        deleteCookie("csrftoken");
        setLogin("");
        enqueueSnackbar("Logged out Successfully", { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar("Something went wrong", { variant: "error" });
        console.log(error);
      });
  };

  if (login === "") {
    return <Navigate to="/login" />;
  }

  const steps = ["You", "Teacher", "Resource Head", "Principle", "Director"];

  // const step2 = [
  //   'You',
  //   'Teacher',
  //   'HOD',
  //   'Resource Head'
  // ]

  return (
    <>
      <Navbar />
      <div className=" mx-auto rounded-xl  grid grid-cols-4 gap-4 p-6 w-[99%] sm:w-[70%] md:[60%] mt-8 bg-gray-100">
        {isUserInfoReady && (
          <div className="col-span-3 gap-6  grid grid-cols-2 px-4 ">
            <ReqFieldItem
              label="Name"
              value={
                user["userDetails"].Username !== ""
                  ? user["userDetails"].Username
                  : "Add Name edit btn"
              }
            />
            <ReqFieldItem label="Position" value={user["userDetails"].Role} />
            <ReqFieldItem label="Email" value={user["userDetails"].email} />
            <ReqFieldItem
              label="Organization"
              value={user["userDetails"].organization}
            />
          </div>
        )}

        <div className="flex flex-col justify-end gap-2">
          <button  onClick={handleOpen} className="text-md transition-all duration-300 text-center  font-semibold text-white border border-white px-4 py-2 cursor-pointer rounded-xl bg-gray-500 hover:bg-gray-800 hover:text-white">
            Edit
          </button>
          <button onClick={handleOpenChangePass} className="text-md transition-all duration-300 text-center  font-semibold text-white border border-white px-4 py-2 cursor-pointer rounded-xl bg-gray-500 hover:bg-gray-800 hover:text-white">
            Change Password
          </button>
          <button
            onClick={logout}
            className="text-md transition-all duration-300 text-center  font-semibold text-white border border-white px-4 py-2 cursor-pointer rounded-xl bg-gray-500 hover:bg-gray-800 hover:text-red-500 "
          >
            Logout
          </button>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <EditProfile
                data='user[" user Details"]'
                closeModal={handleClose}
              />
            </div>
          </Box>
        </Modal>

        <Modal
          open={openChangePass}
          onClose={handleCloseChangePass}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleForChangePassword}>
            <div>
              <ChangePassword closeModalChangePass={handleCloseChangePass} />
            </div>
          </Box>
        </Modal>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        {!requests && <Spinner />}

        {requests && requests.length === 0 && (
          <div className="flex gap-10 justify-center items-center mx-auto w-[30%]">
            <h1 className="text-4xl font-bold text-[#202c34]">No Requests Made...</h1>
            <img src="images/no-req-made.png" alt="" />
            </div>
        )}

        {requests &&
          requests.map((request) => (
            <ProgressBar
              steps={steps}
              request={request}
              key={request.booking_id + "req"}
            />
          ))}
      </div>
    </>
  );
};

export default Profile;
