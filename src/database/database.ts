import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const mongoDBConnect = () => {
  try {
    const DB = process.env.MONGO_URL?.replace(
      '<PASSWORD>',
      process.env.MONGO_PASS!
    ) as string;

    mongoose
      .connect(DB)
      .then(() => {
        console.log(`DB connection successful....`);
      })
      .catch((err) => {
        console.log(`DB connection error: ${err}`);
      });
  } catch (error) {
    console.log(error);
  }
};

export const mongoMockConnect = () => {
  try {
    MongoMemoryServer.create().then((mongo) => {
      const uri = mongo.getUri();

      mongoose.connect(uri).then(() => {
        console.log(`Mock DB connected...`);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
