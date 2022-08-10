import { connect } from 'mongoose';

const database = () => {
  const init = async () => {
    const uri = process.env.DB_URI;
    if (!uri) throw Error('DB URI missing env variable');
    await connect(uri);
  }

  return {
    init
  };
}

export { database };
