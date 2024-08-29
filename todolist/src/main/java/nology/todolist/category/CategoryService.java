package nology.todolist.category;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository repo;

  @Autowired
  private ModelMapper mapper;

  public Category create(@Valid CreateCategoryDTO data) throws Exception {
    // Category newCategory = new Category();
    Category newCategory = mapper.map(data, Category.class);

    // newCategory.setName(data.getName().trim());

    if (repo.existsByName(data.getName().trim())) {
      throw new Exception("name already exists");
    }
    return this.repo.save(newCategory);

  }

  public List<Category> findAll() {
    return this.repo.findAll();
  }

}
