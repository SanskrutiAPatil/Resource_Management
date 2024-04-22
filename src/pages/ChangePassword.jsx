/* eslint-disable react/prop-types */
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useContext,  useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { enqueueSnackbar } from "notistack";
import { getCookie } from "../utilities/getCSRF";

export default function ChangePassword({ closeModalChangePass }) {
  const { user } = useContext(UserContext);

  const [OTP, setOTP] = useState("");
  const [otpFieldStatus, setOtpFieldStatus] = useState(true);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");


  const handleOtp = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(
        "/verifyotponly/",
        { otp: OTP, mail: user.userDetails.email },
        {
          headers: {
            "X-CSRFToken": getCookie("csrftoken"),
          },
        }
      );
      if (res.data.status === 200) {
        enqueueSnackbar("Account Verified", { variant: "success" });
        setOtpFieldStatus(false);
      } else {
        enqueueSnackbar("Something Went Wrong", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePass = async (e) => {
    try {
      e.preventDefault();

      if (newPass !== confirmPass) {
        enqueueSnackbar("Passwords do not match", { variant: "error" });
        return;
      }

      const res = await axios.post(
        `/verifyotp/${user.userDetails.email}`,
        { otp: OTP, new_password: newPass },
        {
          headers: {
            "X-CSRFToken": getCookie("csrftoken"),
          },
        }
      );

      if (res.data.status === 200) {
        enqueueSnackbar("Password Changed ", { variant: "success" });
        closeModalChangePass();
      } else {
        enqueueSnackbar("Something Went Wrong", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <form className="flex flex-col gap-6" action="">
          <div className="flex justify-end relative">
            <span className="bg-red-500 absolute -top-3 -right-3 rounded-full text-white hover:bg-red-600">
              <CloseIcon
                onClick={closeModalChangePass}
                style={{
                  padding: "4px",
                  fontSize: "30px",
                  borderTopRightRadius: "10px",
                }}
              />
            </span>
          </div>

          <div
            className={
              " flex justify-center" + (otpFieldStatus ? " block " : " hidden ")
            }
          >
            <TextField
              label="Enter OTP"
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>

          <div
            className={
              " flex justify-center" +
              (!otpFieldStatus ? " block " : " hidden ")
            }
          >
            <TextField
              label="Enter New Password"
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>

          <div
            className={
              " flex justify-center" +
              (!otpFieldStatus ? " block " : " hidden ")
            }
          >
            <TextField
              label="Confirm New Password"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>

          <div
            className={
              " flex justify-center " +
              (otpFieldStatus ? " block " : " hidden ")
            }
          >
            <Button
              onClick={handleOtp}
              variant="contained"
              style={{ backgroundColor: "rgb(107 114 128)" }}
            >
              verify
            </Button>
          </div>

          <div
            className={
              " flex justify-center " +
              (!otpFieldStatus ? " block " : " hidden ")
            }
          >
            <Button
              onClick={handleChangePass}
              variant="contained"
              style={{ backgroundColor: "rgb(107 114 128)" }}
            >
              Change
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
