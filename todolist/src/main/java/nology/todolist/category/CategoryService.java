package nology.todolist.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository repo;

  public Category create(@Valid CreateCategoryDTO data) throws Exception {
    Category newCategory = new Category();
    newCategory.setName(data.getName().trim());
    if (repo.existsByName(data.getName().trim())) {
      throw new Exception("name already exists");
    }
    return this.repo.save(newCategory);

  }

}
