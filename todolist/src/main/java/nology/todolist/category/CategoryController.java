package nology.todolist.category;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

}