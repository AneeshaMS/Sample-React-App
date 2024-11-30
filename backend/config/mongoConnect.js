const mongoose = require("mongoose");

mongoose.Promise = Promise;

// MongoDB connection events
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connection Established");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB Connection Reestablished");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Connection Disconnected");
});

mongoose.connection.on("close", () => {
  console.log("MongoDB Connection Closed");
});

mongoose.connection.on("error", (error) => {
  console.log("MongoDB ERROR: " + error);
  process.exit(1);
});

// MongoDB connection function
const connectMongo = async () => {
  const connectionUri = process.env.MONGO_URL; // Use const for variable
  try {
    await mongoose.connect(connectionUri, {
      maxPoolSize: 10,
    });

    console.info(
      process.env.NODE_ENV,
      process.env.NODE_ENV === "development"
        ? `\x1b[4m\u001b[47;1m MongoDB Connected:\x1b[44;1m  ${process.env.NODE_ENV} DB \u001b[0m`
        : `\x1b[4m\u001b[47;1m MongoDB Connected:\x1b[42;1m  ${process.env.NODE_ENV} DB \u001b[0m`
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit process on failure
  }
};

module.exports = {
  connectMongo,
};
