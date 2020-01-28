import React, { useEffect, useGlobal } from "reactn";
import { withRouter } from "react-router-dom";
import axios from "axios";

const PrivateRoute = props => {
  const [value, setValue] = useGlobal();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (!token || !id) {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      return props.history.push("/");
    }

    axios
      .get(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.data)
      .then(data => {
        setValue(v => ({
          user: data
        }));
      })
      .catch(err => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        props.history.push("/");
        console.log(err);
      });
  });

  if (value.user) {
    return <>{props.children}</>;
  } else {
    return <center>Loading...</center>;
  }
};

export default withRouter(PrivateRoute);
