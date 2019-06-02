import * as mongoose from 'mongoose';
import Offer from './offer.interface';

const offerSchema = new mongoose.Schema({
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  jobTitle: String,
  companyName: String,
  city: String,
  technology: String,
  salary: { min: Number, max: Number },
  imagePath: String,
  lat: Number,
  lng: Number,
  details: String,
  requirement: String,
  skills: [],
});

const offerModel = mongoose.model<Offer & mongoose.Document>('Offer', offerSchema);
export default offerModel;