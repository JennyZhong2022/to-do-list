package nology.todolist.todopost;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class ToDoPostService {

  @Autowired
  private ToDoPostRespository repo;

  public ToDoPost createToDoPost(@Valid CreateToDoPostDTO data) {
    ToDoPost newPost = new ToDoPost();
    newPost.setContent(data.getContent().trim());
    newPost.setCategory(data.getCategory().trim().toLowerCase());
    newPost.setCreatedAt(new Date());
    return this.repo.save(newPost);

  }

}
