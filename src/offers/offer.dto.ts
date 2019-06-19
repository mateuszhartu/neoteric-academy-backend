import {IsNumber} from 'class-validator';

class CreateOfferDto {
  @IsNumber()
    public lat: number;

  @IsNumber()
    public lng: number;
}

export default CreateOfferDto;