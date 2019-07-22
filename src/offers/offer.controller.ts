import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import offerModel from './offer.model';
import authMiddleware from '../middleware/auth.middleware';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import { FilterData } from '../interfaces/filterData.interface';
import { Param } from './enums';
import * as moment from 'moment';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import Offer from './offer.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateOfferDto from './offer.dto';

class OfferController implements Controller {
  public path = '/offers';
  public router = express.Router();
  private offer = offerModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.getAllOffers);
    this.router.post(`${this.path}/new`, authMiddleware, this.createOffer);
    this.router
        .patch(`${this.path}/:id`, validationMiddleware(CreateOfferDto, true), this.updateOffer)
        .delete(`${this.path}/:id`, this.deleteOffer);
  }

  private getAllOffers = (request: express.Request, response: express.Response) => {
    let filterParams: string[] = request.body;
    let filterdata: FilterData = {};
    if (filterParams[Param.city] !== 'All') {
      filterdata.city = filterParams[Param.city];
    }
    if (filterParams[Param.technology] !== 'All') {
      filterdata.technology = filterParams[Param.technology];
    }
    if (filterParams[Param.expLvl] !== 'All') {
      filterdata.expLvl = filterParams[Param.expLvl];
    }
    if (filterParams[Param.salaryMin] !== '0') {
      filterdata['salary.min'] = { $gte: +filterParams[Param.salaryMin] };
    }
    if (filterParams[Param.salaryMax] !== '0') {
      filterdata['salary.max'] = { $lte: +filterParams[Param.salaryMax] };
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
      date: moment().format(),
      markerAnimation: '',
    });
    const savedOffer = await createdOffer.save();
    await savedOffer.populate('author', '-password').execPopulate();
    response.send(savedOffer);
  }

  private deleteOffer = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    this.offer.findByIdAndDelete(id)
            .then((successResponse) => {
              if (successResponse) {
                response.send(200);
              } else {
                response.send(404);
              }
            });
  }

  private updateOffer = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const offerData: Offer = request.body;
    this.offer.findByIdAndUpdate(id, offerData, { new: true })
        .then((post) => {
          if (post) {
            response.send(post);
          } else {
            next(new PostNotFoundException(id));
          }
        });
  }
}

export default OfferController;
