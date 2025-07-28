import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.connect(process.env.DB_URL).then((connect) => {
      console.log(
        `Database is connected ⚙️ \n  host: ${connect.connection.host}`
      );
    });
  } catch (error) {
    console.log("Error 💥" + error.message);
  }
};

export default connect;
