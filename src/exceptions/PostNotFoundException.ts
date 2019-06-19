import HttpException from './HttpException';

class PostNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Offer with id ${id} not found`);
  }
}

export default PostNotFoundException;
