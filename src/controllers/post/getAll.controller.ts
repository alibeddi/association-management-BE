import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import PostRepo from '../../database/repository/postRepo';
import { SuccessResponsePaginate } from '../../core/ApiResponse';

export const getAll = asyncHandler(async (req: ProtectedRequest, res) => {
  const { page, perPage, deleted } = req.query;
  const options = {
    page: parseInt(page as string, 10) || 1,
    limit: parseInt(perPage as string, 10) || 10,
  };

  const posts = await PostRepo.findAll(options, req.query, {
    isPaging: true,
    deleted: deleted == 'true' ? true : false,
  });
  const { docs, ...meta } = posts;
  new SuccessResponsePaginate(
    'All posts returned successfully',
    docs,
    meta
  ).send(res);
});
