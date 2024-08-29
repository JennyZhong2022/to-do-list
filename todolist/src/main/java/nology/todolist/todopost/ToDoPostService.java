package nology.todolist.todopost;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class ToDoPostService {

  @Autowired
  private ToDoPostRepository repo;

  @Autowired
  private ModelMapper mapper;

  public ToDoPost createToDoPost(@Valid CreateToDoPostDTO data) {
    // ToDoPost newPost = new ToDoPost();
    // newPost.setContent(data.getContent().trim());
    // newPost.setCategory(data.getCategory().trim().toLowerCase());
    // newPost.setCreatedAt(new Date());
    // newPost.setUpdatedAt(new Date());
    ToDoPost newPost = mapper.map(data, ToDoPost.class);
    return this.repo.save(newPost);

  }

  public List<ToDoPost> findAllToDoPosts() {
    return this.repo.findAll();
  }

  public Optional<ToDoPost> findToDoPostById(Long id) {
    return this.repo.findById(id);
  }

  public Optional<ToDoPost> updateToDoPostById(Long id, @Valid UpdateToDoPostDTO data) {
    Optional<ToDoPost> result = this.findToDoPostById(id);
    if (result.isEmpty()) {
      return result;
    }
    ToDoPost foundToDoPost = result.get();
    // if (data.getContent() != null) {
    // foundToDoPost.setContent(data.getContent().trim());

    // }
    // if (data.getCategory() != null) {
    // foundToDoPost.setCategory(data.getCategory().trim().toLowerCase());

    // }
    // foundToDoPost.setUpdatedAt(new Date());
    ToDoPost updateToDoPost = this.repo.save(foundToDoPost);
    return Optional.of(updateToDoPost);
  }

  public boolean deleteToDoPostById(Long id) {
    Optional<ToDoPost> result = this.findToDoPostById(id);
    if (result.isEmpty()) {
      return false;
    }
    this.repo.delete(result.get());
    return true;
  }

}
