const ValidationRule = require('@service/validation/index')

module.exports = {

  registration() {
    return [
      ValidationRule.isEmail('email'),
      ValidationRule.isPassword('password'),
      ValidationRule.required('mobile'),
      ValidationRule.isStringOptionalNotEmpty('name')
    ]
  },

  login() {
    return [
      ValidationRule.isEmail('email'),
      ValidationRule.isPassword('password'),
    ]
  },
 
  todoValidation(){
    return [
      ValidationRule.requiredArrayWithLength('tasks',1),
    ]
  }
}