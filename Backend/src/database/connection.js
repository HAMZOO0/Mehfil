import mongoose from "mongoose";

const dataBase_connection = async () => {
  try {
    const db = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}`
    );
    console.log(db.connection.host);
  } catch (error) {
    console.log("Error", error);
    process.exit(1);
  }
};

export { dataBase_connection };
