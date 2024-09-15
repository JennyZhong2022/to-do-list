package nology.todolist.todopost;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;
import nology.todolist.category.Category;
import nology.todolist.category.CategoryService;
import nology.todolist.common.ValidationErrors;
import nology.todolist.common.exceptions.ServiceValidationException;

@Service
public class ToDoPostService {

  @Autowired
  private ToDoPostRepository repo;

  @Autowired
  private CategoryService categoryService;

  @Autowired
  private ModelMapper mapper;

  public ToDoPost createToDoPost(@Valid CreateToDoPostDTO data) throws Exception {
    ValidationErrors errors = new ValidationErrors();
    ToDoPost newPost = mapper.map(data, ToDoPost.class);
    Optional<Category> categoryResult = this.categoryService.findById(data.getCategoryId());

    if (categoryResult.isEmpty()) {
      errors.addError("category", String.format("Category with id %s does not exist", data.getCategoryId()));
    } else {
      newPost.setCategory(categoryResult.get());
    }

    if (errors.hasErrors()) {
      throw new ServiceValidationException(errors);
    }

    return this.repo.save(newPost);

  }

  public List<ToDoPost> findAllToDoPosts() {
    return this.repo.findAll();
  }

  public Optional<ToDoPost> findToDoPostById(Long id) {
    return this.repo.findById(id);
  }

  public Optional<ToDoPost> updateToDoPostById(Long id, @Valid UpdateToDoPostDTO data) throws Exception {
    Optional<ToDoPost> result = this.findToDoPostById(id);
    if (result.isEmpty()) {
      return result;
    }

    ToDoPost foundToDoPost = result.get();
    mapper.map(data, foundToDoPost);

    ValidationErrors errors = new ValidationErrors();
    if (data.getCategoryId() != null) {

      Optional<Category> categoryResult = this.categoryService.findById(data.getCategoryId());

      if (categoryResult.isEmpty()) {
        errors.addError("category", String.format("Category with id %s does not exist", data.getCategoryId()));
      } else {
        foundToDoPost.setCategory(categoryResult.get());
      }
    }

    if (errors.hasErrors()) {
      throw new ServiceValidationException(errors);
    }
    ToDoPost updateToDoPost = this.repo.save(foundToDoPost);

    return Optional.of(updateToDoPost);
  }

  public boolean deleteToDoPostById(Long id) {
    Optional<ToDoPost> result = this.findToDoPostById(id);
    if (result.isEmpty()) {
      return false;
    }
    this.repo.deleteById(id);
    // this.repo.delete(result.get());
    return true;
  }

  public boolean deleteAllToDoPost() {
    List<ToDoPost> result = this.findAllToDoPosts();
    if (result.isEmpty()) {
      return false;
    }
    this.repo.deleteAll();
    return true;
  }

}
