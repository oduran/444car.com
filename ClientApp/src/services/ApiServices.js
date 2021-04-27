import axios from "axios";
import Swal from "sweetalert2";
const instance = axios.create({
  withCredentials: true,
});
export const get = async (url, conf) => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  let requestBase = {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: new Headers({
      Authorization: "Bearer " + window.localStorage.getItem("token"),
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };

  let request = Object.assign({}, requestBase, { method: "GET" });
  const handleResponse = (response) => {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data) || response.statusText;
        return Promise.reject(error);
      }

      return { data: data };
    });
  };
  return fetch(url, request).then(handleResponse);

  //return await instance
  //  .get(url,{
  //    headers: {}
  //  })
  //  .then((response) => {
  //    return response;
  //  })
  //  .catch((error) => {
  //    if (error.message.indexOf("404") >= 1) {
  //      return error;
  //    } else {
  //      Swal.fire("Error", "There is a connection error!", "error");
  //      //return error.request.status + "-"+error.response.data
  //      return error;
  //    }
  //  });
};

export const post = async (url, data, conf) => {
 
  return await instance
    .post(
      url,
      data,
      {
          headers: {  },
      },
      { withCredentials: true }
    )
    .then((response) => {
      
      return response;
    })
    .catch((error) => {
     
      Swal.fire("Error", "There is a connection error!", "error");
      //return error.request.status + "-"+error.response.data
      return error.request.status;
    });
};
export const postForm = async (url, data, conf) => {
    
  return await instance
    .post(
      url,
      data,
      {
          headers: {
              "Accept": "application/x-www-form-urlencoded",
              "Content-Type": "application/x-www-form-urlencoded", 
 },
      },
      { withCredentials: true }
    )
    .then((response) => {
      
      return response;
    })
    .catch((error) => {
     
      Swal.fire("Error", "There is a connection error!", "error");
      //return error.request.status + "-"+error.response.data
      return error.request.status;
    });
};
