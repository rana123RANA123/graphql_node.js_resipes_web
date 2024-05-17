const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ApolloServer } = require("apollo-server");

require("dotenv").config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Ensure that the connection string is correctly set in your environment variables
const mongoDB = process.env.CONNECTION_STRING || "your_fallback_connection_string";

mongoose.connect(mongoDB, {
    useNewUrlParser: true, // This is safe to remove as it's deprecated
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB connected");
        return server.listen({ port: process.env.PORT || 8000 });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch((error) => {
        console.error("MongoDB connection error: ", error);
    });

const db = mongoose.connection;

db.on("error", (error) => {
    console.error("MongoDB error: ", error);
});

db.once("open", () => {
    console.log("MongoDB connected successfully!");
});
