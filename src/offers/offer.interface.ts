interface Offer {
  jobTitle: string;
  companyName: string;
  city: string;
  technology: string;
  expLvl: string;
  salary: {min: number, max: number};
  imagePath: string;
  lat: number;
  lng: number;
  details: string;
  requirements: string;
  skills: [];
}

export default Offer;
