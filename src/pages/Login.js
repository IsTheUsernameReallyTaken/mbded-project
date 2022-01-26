import { Button, Grid, TextField, IconButton } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [usernameHelper, setUsernameHelper] = React.useState("");
  const [passwordHelper, setPasswordHelper] = React.useState("");

  const [invalidCredentials, setInvalidCredentials] = React.useState(false);

  const history = useHistory();

  function onUsernameChange() {
    setUsername(document.getElementById("email-field").value);
  }

  function onPasswordChange() {
    setPassword(document.getElementById("password-field").value);
  }

  function onClickLogin() {
    let reUsername = /\S+@\S+\.\S+/;

    if (username.length == 0) {
      setUsernameHelper("Email cannot be empty");
      return;
    }

    if (reUsername.test(username) == false) {
      setUsernameHelper("Invalid Email");
      return;
    }

    setUsernameHelper("");

    if (password.length == 0) {
      setPasswordHelper("Password cannot be empty");
      return;
    }

    setPasswordHelper("");

    let data1 = {
      email: username,
      passwd: password,
    };

    fetch("http://127.0.0.1:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data1),
    }).then((response) => {
      if (response.status == "200") {
        setTimeout(() => {
          history.push("/dashboard/" + username);
        }, 1000);
      } else {
        setInvalidCredentials(true);
      }
    });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "600px",
          height: "450px",
          backgroundColor: "#d8deeb",
          boxShadow: "-3px 3px 4px 4px #061947",
          marginTop: "150px",
          marginBottom: "100px",
          borderRadius: "10px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h3
            style={{
              fontFamily: "Papyrus",
              color: "#000000",
              fontSize: "30px",
              marginBottom: "50px",
            }}
          >
            Login
          </h3>
          <Grid container spacing={3}>
            <Grid item xs={12} spacing={6} align="center">
              {invalidCredentials ? (
                <div style={{ width: "250px" }}>
                  <Alert
                    severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setInvalidCredentials(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                    style={{
                      borderRadius: "10px",
                    }}
                  >
                    <strong>Invalid credentials!</strong>
                  </Alert>
                </div>
              ) : null}
            </Grid>
            <Grid item xs={12} spacing={6} align="center">
              <TextField
                id="email-field"
                color="primary"
                label="E-mail"
                required="true"
                onChange={() => {
                  onUsernameChange();
                }}
                helperText={usernameHelper}
                error={
                  invalidCredentials ||
                  (usernameHelper.length == 0 ? false : true)
                }
              />
            </Grid>
            <Grid item xs={12} spacing={6} align="center">
              <TextField
                id="password-field"
                color="primary"
                label="Password"
                type="password"
                required="true"
                onChange={() => {
                  onPasswordChange();
                }}
                helperText={passwordHelper}
                error={
                  invalidCredentials ||
                  (passwordHelper.length == 0 ? false : true)
                }
              />
            </Grid>
            <Grid item xs={12} spacing={6} align="center">
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  onClickLogin();
                }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Login;
