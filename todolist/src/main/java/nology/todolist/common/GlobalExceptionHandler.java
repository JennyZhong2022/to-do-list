package nology.todolist.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import nology.todolist.common.exceptions.NotFoundException;
import nology.todolist.common.exceptions.ServiceValidationException;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<String> handleNotFoundException(NotFoundException ex) {
    return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(ServiceValidationException.class)
  public ResponseEntity<ValidationErrors> handleServiceValidationException(ServiceValidationException ex) {
    return new ResponseEntity<ValidationErrors>(ex.getErrors(), HttpStatus.BAD_REQUEST);
  }
}
