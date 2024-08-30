package nology.todolist.todopost;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;
import nology.todolist.category.Category;
import nology.todolist.category.CategoryService;

@Service
public class ToDoPostService {

  @Autowired
  private ToDoPostRepository repo;

  @Autowired
  private CategoryService categoryService;

  @Autowired
  private ModelMapper mapper;

  public ToDoPost createToDoPost(@Valid CreateToDoPostDTO data) throws Exception {
    // ToDoPost newPost = new ToDoPost();
    // newPost.setContent(data.getContent().trim());
    // newPost.setCategory(data.getCategory().trim().toLowerCase());
    // newPost.setCreatedAt(new Date());
    // newPost.setUpdatedAt(new Date());
    ToDoPost newPost = mapper.map(data, ToDoPost.class);
    Optional<Category> categoryResult = this.categoryService.findById(data.getCategoryId());

    if (categoryResult.isEmpty()) {
      throw new Exception("Category doesn't exist");
    } else {
      newPost.setCategory(categoryResult.get());
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
    // ToDoPost foundToDoPost = mapper.map(data, ToDoPost.class);
    ToDoPost foundToDoPost = result.get();
    mapper.map(data, foundToDoPost);
    // if (data.getContent() != null) {
    // foundToDoPost.setContent(data.getContent().trim());

    // }
    // if (data.getCategory() != null) {
    // foundToDoPost.setCategory(data.getCategory().trim().toLowerCase());

    // }
    // foundToDoPost.setUpdatedAt(new Date());

    if (data.getCategoryId() != null) {

      Optional<Category> categoryResult = this.categoryService.findById(data.getCategoryId());

      if (categoryResult.isEmpty()) {
        throw new Exception("Category doesn't exist");
      } else {
        foundToDoPost.setCategory(categoryResult.get());
      }
    }
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
