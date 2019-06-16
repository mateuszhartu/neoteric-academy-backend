import 'dotenv/config';
import App from './app';
import PostController from './post/post.controller';
import validateEnv from './utils/validateEnv';
import UserController from './user/user.controller';
import AuthenticationController from './authentication/authentication.controller';
import OfferController from './offers/offer.controller';

validateEnv();

const app = new App(
  [
    new OfferController(),
    new UserController(),
    new AuthenticationController(),
  ],
);

app.listen();
