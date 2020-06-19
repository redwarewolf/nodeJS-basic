const nodePagination = require('@wolox/pagination-node');
const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');

exports.createUser = data => {
  logger.info('Create User: ', data);

  return User.create(data).catch(error => {
    logger.error(error);
    throw errors.invalidParams(error.message);
  });
};

exports.getUsers = (page, limit, request) =>
  User.findAll({ where: request.query || {} })
    .then(users =>
      nodePagination.paginate(users, request, {
        page,
        limit
      })
    )
    .catch(err => {
      throw errors.databaseError(err);
    });
