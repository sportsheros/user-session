const ValidationRule = require('@service/validation/index')

module.exports = {

  registration() {
    return [
      ValidationRule.isEmail('userName'),
      ValidationRule.isPassword('password'),
      ValidationRule.required('userType')
    ]
  },

  login() {
    return [
      ValidationRule.isEmail('userName'),
      ValidationRule.isPassword('password'),
    ]
  },
  AddProducts() {
    return [
      ValidationRule.isStringNotEmpty('name'),
      ValidationRule.isNumber('price'),
    ]
  },
  
  AddCatalogs() {
    return [
      ValidationRule.isStringNotEmpty('name'),
      ValidationRule.requiredArrayWithLength('items',1)
    ]
  },

  CreateOrder() {
    return [
      ValidationRule.requiredArrayWithLength('items',1)
    ]
  },

}