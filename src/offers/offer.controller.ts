import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import offerModel from './offer.model';
import authMiddleware from '../middleware/auth.middleware';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import { FilterData } from '../interfaces/filterData.interface';
import { Param } from './enums';

class OfferController implements Controller {
  public path = '/offers';
  public router = express.Router();
  private offer = offerModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllOffers);
    this.router.post(this.path, authMiddleware, this.createOffer);
  }

  private getAllOffers = (request: express.Request, response: express.Response) => {
    let filterParams: string[] = request.body;
    let filterdata: FilterData = {};
    return request.body;
    if (filterParams[Param.city] !== 'All'){
      filterdata['city'] = filterParams[Param.city];
    }
    if (filterParams[Param.technology] !== 'All'){
      filterdata['technology'] = filterParams[Param.technology];
    }
    if (filterParams[Param.experience] !== 'All'){
      filterdata['experience'] = filterParams[Param.experience];
    }
    if (filterParams[Param.salary] !== 'All'){
      filterdata['salary.min'] = { $gte: +filterParams[Param.salary] };
    }
    this.offer.find(filterdata)
        .then((offers) => {
          response.send(offers);
        });
  }

  private createOffer = async (request: RequestWithUser, response: express.Response) => {
    const offerData = request.body;
    const createdOffer = new this.offer({
      ...offerData,
      author: request.user._id,
    });
    const savedOffer = await createdOffer.save();
    await savedOffer.populate('author', '-password').execPopulate();
    response.send(savedOffer);
  }
}

export default OfferController;
