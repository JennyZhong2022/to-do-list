package nology.todolist.common.exceptions;

import nology.todolist.common.ValidationErrors;

public class ServiceValidationException extends Exception {
  private ValidationErrors errors;

  public ServiceValidationException(ValidationErrors errors) {
    this.errors = errors;
  }

  public ValidationErrors getErrors() {
    return errors;
  }

}
