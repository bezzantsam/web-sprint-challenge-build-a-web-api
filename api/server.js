const express = require('express');

const server = express();

const actionsRouter = require("./actions/actions-router")

const projectsRouter = require("./projects/projects-router")

server.use(express.json());

server.use("/api/projects", projectsRouter)

server.use("/api/actions", actionsRouter)

server.use('*', (req, res) => {
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
   });
   
 
   
 module.exports = server;
 