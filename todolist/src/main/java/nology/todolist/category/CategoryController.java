package nology.todolist.category;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import nology.todolist.common.exceptions.NotFoundException;

import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("categories")
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  @PostMapping
  public ResponseEntity<Category> createCategory(@Valid @RequestBody CreateCategoryDTO data) throws Exception {

    Category newCategory = this.categoryService.create(data);
    return new ResponseEntity<Category>(newCategory, HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<Category>> getAllCategories() {
    List<Category> allCategories = this.categoryService.findAll();

    return new ResponseEntity<List<Category>>(allCategories, HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Category> deleteCategoryById(@PathVariable Long id) throws NotFoundException {
    boolean result = this.categoryService.deleteCategoryById(id);
    if (result == false) {
      throw new NotFoundException("Couldn't find the category with id " + id);
    }
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @GetMapping("/colors")
  public ResponseEntity<List<String>> getColors() {
    return ResponseEntity.ok(Arrays.asList("#f7d0cf", "#d5e4f5", "#d1cefb", "#dff1d8"));
  }

}
