import express, { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import User, { IUserDoc } from '../models/user';
import isAuthenticated from '../middlewares/isAuthenticated';

const accountRouter = express.Router();

interface UserRequest extends Request {
  body: IUserDoc;
  params: {
    username: string;
  };
}

accountRouter.post('/signup', async (req: UserRequest, res: Response) => {
  const { username, password, email, phone } = req.body;

  const existUser = await User.findOne({ username });

  if (existUser) {
    res.status(400).send('User already exists');
  }

  const newUser = new User({
    username,
    password,
    email,
    phone: phone || undefined,
  });

  await newUser.save();
  res.status(201).send('User registered successfully');
});

accountRouter.post('/login', async (req: UserRequest, res: Response) => {
  const { username, password } = req.body;

  const existUser = await User.findOne({ username });

  if (!existUser) {
    res.status(401).send('User does not exist');
  } else {
    const isRight = existUser.checkPassword(password);
    if (isRight && req.session) {
      req.session.user = existUser.username;
      res.status(200).send('You are logged in');
    } else {
      return res.status(401).send('Wrong Password');
    }
  }
});

accountRouter.post(
  '/logout',
  isAuthenticated,
  (req: UserRequest, res: Response) => {
    req.session = null;
    res.status(200).send('Logout successful');
  },
);

accountRouter.get('/get', (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    process.env.API_SECRET as string,
  );
  res.json({ timestamp, signature });
});

accountRouter.get(
  '/user/:username',
  async (req: UserRequest, res: Response) => {
    const user = await User.findOne({ username: req.params.username });
    res.status(200).json(user);
  },
);

export default accountRouter;
