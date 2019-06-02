interface Offer {
  jobTitle: string;
  companyName: string;
  city: string;
  technology: string;
  salary: {min: number, max: number};
  imagePath: string;
  lat: number;
  lng: number;
  details: string;
  requirement: string;
  skills: [];
}

export default Offer;
