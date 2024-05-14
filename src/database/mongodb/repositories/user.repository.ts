import { Types } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import APIFeatures from '../../../utils/apiFeatures';
import IUser, { User } from '../models/user.model';

const getAll = async (condition: object, paging: pagingObj, query: object) => {
  let findAllQuery = User.find({ ...condition });

  const features = new APIFeatures(findAllQuery, query)
    .filter()
    .sort()
    .limitFields()
    .search(['name']);

  const options = {
    query: features.query,
    limit: paging.limit ? paging.limit : null,
    page: paging.page ? paging.page : null,
  };

  const res = (await User.paginate(options)) as PaginationModel<IUser>;
  return res;
};

const getById = async (id: Types.ObjectId, select: string = '', populate: string = '') =>
  await User.findById(id).select(select).populate(populate);

const getByQuery = async (options: object, select: string = '', populate: string = '') =>
  await User.find(options).select(select).populate(populate);

const getOneByQuery = async (options: object, select: string = '', populate: string = '') =>
  await User.findOne(options).select(select).populate(populate);

const create = async (item: object) => await User.create(item);

const edit = async (id: Types.ObjectId, item: object) =>
  await User.findByIdAndUpdate(id, item, { new: true });

const remove = async (id: Types.ObjectId) => await User.findByIdAndDelete(id);

export default {
  getAll,
  getById,
  getByQuery,
  getOneByQuery,
  create,
  edit,
  remove,
};
