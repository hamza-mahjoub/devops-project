import { React, useState } from "react";

// material ui components
import { Button, Container, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../slices/auth.slice";

export const LoginPage = (props) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: null, password: null });

  const handleChange = (e) => {
    setForm({ ...form, [e.currentTarget.id]: e.currentTarget.value });
  };

  const handleAuto = () => {
    dispatch(login({ username: "felten", password: "123456789" }));
  };

  const handleLogin = () => {
    dispatch(login({ username: "felten", password: "123456789" }));
  };

  return (
    <Container
      fixed
      sx={{
        padding: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
      }}
    >
      <TextField
        sx={{ width: "80%", m: 3 }}
        label="Username"
        id="usename"
        onChange={handleChange}
        type="text"
        defaultValue={null}
      />
      <TextField
        sx={{ width: "80%", m: 3 }}
        label="Password"
        id="password"
        onChange={handleChange}
        type="password"
        defaultValue={null}
      />

      <Button
        type="button"
        color="primary"
        variant="contained"
        sx={{ mt: 2, width: "50%" }}
        onClick={handleLogin}
      >
        Log in
      </Button>
      <Button
        type="button"
        color="info"
        variant="outlined"
        sx={{ mt: 2, width: "50%" }}
        onClick={handleAuto}
      >
        Auto Login
      </Button>
    </Container>
  );
};

LoginPage.prototype = {};
