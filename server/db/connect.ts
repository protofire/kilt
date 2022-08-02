import mongoose from "mongoose";

// interface Option {
//   useNewUrlParser: boolean;
//   useUnifiedTopology: boolean;
//   useCreateIndex: boolean;
// }
// const option: Option = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// };

export async function connectDb() {
  try {
    const db = mongoose.connect(
      process.env.MONGODB_URI!,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      () => {
        console.log("Connect to database successfully");
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
