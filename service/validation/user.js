let { body } = require('express-validator')
module.exports = {
  isPassword(path) {
    return body(path)
      .exists()
      .withMessage(
        `${path.split('.')[1] ? path.split('.')[1] : path} is required`
      )
      .isLength({
        min: 6
      })
      .withMessage(`${path} must be 6 characters`)
  },
  isEmail(path) {
    return body(path)
      .exists()
      .withMessage(
        `${path.split('.')[1] ? path.split('.')[1] : path} is required`
      )
      .isEmail()
      // .normalizeEmail()
      .withMessage(`Please provide a correct ${path}`)
  },
  isEmailOptional(path) {
    return body(path)
      .isEmail()
      .optional()
      .withMessage(
        `${path.split('.')[1] ? path.split('.')[1] : path} is required`
      )
      // .isEmail()
      // // .normalizeEmail()
      // .withMessage(`Please provide a correct ${path}`)
  },
  isPhoneNumber(path) {
    return body(path)
      .isLength({
        min: 10,
        max: 10
      })
      .withMessage('Please provide a correct mobile')
  },
  isPhoneNumberOptional(path) {
    return body(path)
      .optional()
      .isLength({
        min: 10,
        max: 10
      })
      .withMessage('Please provide a correct mobile')
  }, 

}
