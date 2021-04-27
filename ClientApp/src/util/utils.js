import { Redirect } from 'react-router-dom'
import React from 'react'
import Swal from "sweetalert2";

export const loginCheck = () => {
    if( window.localStorage.getItem("user") == undefined || null ){
      return <Redirect to='/' />
    }
}

export const showAlert = (header,message,type) => {
  Swal.fire(
    header,
    message,
    type
  );
}
export const showAlertFlow = (title, message, type,showCancelButton,confirmButtonText,cancelButtonText,callback) => {
  Swal.fire({
    title: title,
    text: message,
    icon: type,
    showCancelButton: showCancelButton,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  }).then(async (result) => {
    callback(result);
    return;
  })
}
export const DialogTypes = {
  WARNING: "warning",
  ERROR: "error",
  SUCCESS: "success",
  DANGER: "danger",
}
