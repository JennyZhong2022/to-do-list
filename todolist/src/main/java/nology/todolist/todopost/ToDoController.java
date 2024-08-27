package nology.todolist.todopost;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping
public class ToDoController {

  @Autowired
  private ToDoPostService toDoPostService;

  @PostMapping("posts")
  public ResponseEntity<ToDoPost> createToDoPost(@Valid @RequestBody CreateToDoPostDTO data) {
    ToDoPost createdPost = this.toDoPostService.createToDoPost(data);
    return new ResponseEntity<ToDoPost>(createdPost, HttpStatus.CREATED);
  }

}
