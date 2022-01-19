import dotenv from 'dotenv';

import app from './app';

// Configuring environmental varialble
dotenv.config();


// Port implementation
const port = process.env.PORT || 3050;

// Starting server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
