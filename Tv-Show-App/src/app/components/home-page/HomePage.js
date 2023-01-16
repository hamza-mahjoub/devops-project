import { React } from "react";

// material ui components
import { Container, Typography } from "@mui/material";

export const HomePage = (props) => {
  return (
    <Container
      fixed
      sx={{
        padding: 5,
      }}
    >
      <Typography variant="h4" align="center">
        Welcome to the discovery app
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
        What is it ?
      </Typography>
      <Typography variant="body">
        An application that enables the user to look for a tv-show or a movie
        using the movie's database.
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
        How it is built?
      </Typography>
      <Typography variant="body" sx={{ mt: 1, mb: 1 }}>
        <strong>The front-end </strong> application is deployed on a virtual
        machine in azure.
        <br />
        <strong>The back-end </strong> is deployed in a kubernetes cluster in
        azure. <br />
        <strong>The database </strong> is the azure CosmosDb for mongo.
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
        with what technologies ?
      </Typography>
      <Typography variant="body" sx={{ mt: 1, mb: 1 }}>
        <strong>The front-end: </strong> ReactJs
        <br />
        <strong>The back-end: </strong> All services are built using NestJs.{" "}
        <br />
        <strong>Containerization: </strong> Images are built using Docker.{" "}
        <br />
        <strong>Orchestration: </strong> Azure kubernetes cluster. <br />
        <strong>Monitoring: </strong> Prometheus, Grafana, Signoz.
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
        More Informations
      </Typography>
      <Typography variant="body" sx={{ mt: 1, mb: 1 }}>
        For more informations on the project and to see how it was implemented
        Check the{" "}
        <a
          style={{ color: "blue" }}
          href="https://github.com/hamza-mahjoub/devops-project.git"
        >
          Github Repository.
        </a>
      </Typography>
    </Container>
  );
};

HomePage.prototype = {};
