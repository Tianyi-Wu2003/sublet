import express, { Request, Response } from 'express';
import House, { IHouse } from '../models/house';
import isAuthenticated from '../middlewares/isAuthenticated';

const apiRouter = express.Router();

interface HouseRequest extends Request {
  body: IHouse;
}

interface HouseFilterRequest extends Request {
  owner: string;
  pricein: string;
  price_max: string;
  bedroom: string;
  bathroom: string;
  start_date: string;
  end_date: string;
  address: string;
}

apiRouter.get('/isloggedin', (req: Request, res: Response) => {
  if (req.session && req.session.user) {
    res.json({ isloggedin: true, username: req.session.user as string });
  } else {
    res.json({ isloggedin: false, username: '' });
  }
});

apiRouter.get('/houses', async (req: HouseRequest, res: Response) => {
  const houses = await House.find();
  res.status(200).json(houses);
});

apiRouter.post('/houses/add', async (req: HouseRequest, res: Response) => {
  const {
    address,
    description,
    bedroom,
    bathroom,
    price,
    startDate,
    endDate,
    picture1,
    picture2,
  } = req.body;
  if (req.session) {
    const owner = req.session.user as string;

    const newHouse = new House({
      owner,
      address,
      description,
      bedroom,
      bathroom,
      price,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      picture1,
      picture2,
    });

    const savedHouses = await newHouse.save();
    res.status(201).json(savedHouses);
  }
});

apiRouter.get(
  '/houses/filters',
  async (req: HouseFilterRequest, res: Response) => {
    console.log(req.query.end_date);

    const conditions: Record<string, unknown> = {
      ...(req.query.price_min && {
        price: { $gte: parseInt(req.query.price_min as string, 10) },
      }),
      ...(req.query.price_max && {
        price: { $lte: parseInt(req.query.price_max as string, 10) },
      }),
      ...(req.query.bedroom && {
        bedroom: parseInt(req.query.bedroom as string, 10),
      }),

      ...(req.query.start_date && {
        startDate: { $lte: new Date(req.query.start_date as string) },
      }),
      ...(req.query.end_date && {
        endDate: { $gte: new Date(req.query.end_date as string) },
      }),
      ...(req.query.address && {
        address: {
          $regex: `.*${req.query.address as string}.*`,
          $options: 'i',
        },
      }),
    };
    const houses = await House.find(conditions);
    res.status(200).json(houses);
  },
);

export default apiRouter;
