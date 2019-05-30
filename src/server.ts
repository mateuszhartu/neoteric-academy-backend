// import 'dotenv/config';
// import App from './app';
// import AuthenticationController from './authentication/authentication.controller';
// import PostController from './post/post.controller';
// import ReportController from './report/report.controller';
// import UserController from './user/user.controller';
// import validateEnv from './utils/validateEnv';
//
// validateEnv();
//
// const app = new App(
//   [
//     new PostController(),
//     new AuthenticationController(),
//     new UserController(),
//     new ReportController(),
//   ],
// );
//
// app.listen();

// import * as express from 'express';
//
// const app = express();
//
// app.get('/', (request, response) => {
//     response.send({
//         hostname: request.hostname,
//         path: request.path,
//         method: request.method,
//     });
// });
//
// app.listen(5000);

// import 'dotenv/config';
// import * as mongoose from 'mongoose';
//
// const {
//     MONGO_USER,
//     MONGO_PASSWORD,
//     MONGO_PATH,
// } = process.env;
//
// mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);

import 'dotenv/config';
import App from './app';
import PostController from './post/post.controller';
import validateEnv from './utils/validateEnv';
import UserController from './user/user.controller';
import AuthenticationController from './authentication/authentication.controller';

validateEnv();

const app = new App(
    [
        new PostController(),
        new UserController(),
        new AuthenticationController(),
    ],
);

app.listen();
