const { body, param } = require("express-validator");

const validateBookBody = [
  body("name")
    .isString()
    .notEmpty()
    .isLength({ min: 1, max: 50 })
    .matches(/^[a-zA-Z ]+$/)
    .trim()
    .escape()
    .withMessage("Name must be a string"),
];

const validateBookUpdateBody = [
  body("name")
    .isString()
    .notEmpty()
    .matches(/^[a-zA-Z ]+$/)
    .isLength({ min: 1, max: 50 })
    .trim()
    .escape()
    .withMessage("Name must be a string"),
];

module.exports = {
  validateBookBody,
  validateBookUpdateBody,
};