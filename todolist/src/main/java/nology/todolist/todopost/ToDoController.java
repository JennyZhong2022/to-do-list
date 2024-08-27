package nology.todolist.todopost;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import nology.todolist.common.exceptions.NotFoundException;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("posts")
public class ToDoController {

  @Autowired
  private ToDoPostService toDoPostService;

  @PostMapping
  public ResponseEntity<ToDoPost> createToDoPost(@Valid @RequestBody CreateToDoPostDTO data) {
    ToDoPost createdPost = this.toDoPostService.createToDoPost(data);
    return new ResponseEntity<ToDoPost>(createdPost, HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<ToDoPost>> findAllToDoPosts() {
    List<ToDoPost> toDoPosts = this.toDoPostService.findAllToDoPosts();
    return new ResponseEntity<List<ToDoPost>>(toDoPosts, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ToDoPost> findToDoPostById(@PathVariable Long id) throws NotFoundException {
    Optional<ToDoPost> toDoPost = this.toDoPostService.findToDoPostById(id);
    ToDoPost foundToDoPost = toDoPost
        .orElseThrow(() -> new NotFoundException("Couldn't find to do list with id " + id));
    return new ResponseEntity<>(foundToDoPost, HttpStatus.OK);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<ToDoPost> updateToDoPostById(@PathVariable Long id,
      @Valid @RequestBody UpdateToDoPostDTO data) throws NotFoundException {
    Optional<ToDoPost> updatedToDoPost = this.toDoPostService.updateToDoPostById(id, data);
    ToDoPost foundToDoPost = updatedToDoPost
        .orElseThrow(() -> new NotFoundException("Couldn't find to do list with id " + id));
    return new ResponseEntity<>(foundToDoPost, HttpStatus.OK);
  }

}
