package nology.todolist.category;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;
import nology.todolist.common.ValidationErrors;
import nology.todolist.common.exceptions.ServiceValidationException;

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository repo;

  @Autowired
  private ModelMapper mapper;

  private static final List<String> VALID_COLORS = Arrays.asList("#f7d0cf", "#d5e4f5", "#d1cefb", "#dff1d8");

  public Category create(@Valid CreateCategoryDTO data) throws Exception {
    ValidationErrors errors = new ValidationErrors();

    if (!VALID_COLORS.contains(data.getColor())) {
      errors.addError("color", "Invalid color selected");
    }

    if (data.getName() == null || data.getName().trim().isEmpty()) {
      throw new ServiceValidationException(errors);
    }

    if (repo.existsByName(data.getName().trim())) {
      errors.addError("name", String.format("category with name '%s' already exists", data.getName().trim()));
    }

    Category newCategory = mapper.map(data, Category.class);

    if (errors.hasErrors()) {
      throw new ServiceValidationException(errors);
    }

    return this.repo.save(newCategory);

  }

  public List<Category> findAll() {
    return this.repo.findAll();
  }

  public Optional<Category> findById(Long categoryId) {
    return this.repo.findById(categoryId);
  }

  public boolean deleteCategoryById(Long id) {
    Optional<Category> result = this.findById(id);
    if (result.isEmpty()) {
      return false;
    }
    // this.repo.delete(result.get());
    this.repo.deleteById(id);
    return true;
  }

}
