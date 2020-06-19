const usersService = require('../services/users');
const userMapper = require('../mappers/user');
const bcrypt = require('../services/bcrypt');

exports.createUser = (req, res, next) =>
  bcrypt
    .crypt(req.body.password)
    .then(hash => userMapper.create(req.body, hash))
    .then(mapped_body => usersService.createUser(mapped_body))
    .then(user => res.status(201).send(user))
    .catch(error => next(error));

exports.getUsers = (req, res, next) =>
  usersService
    .getUsers(req.headers.page, req.headers.limit, req)
    .then(users => res.send(users))
    .catch(error => next(error));
