
package nology.todolist.category;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.modelmapper.ModelMapper;

import nology.todolist.common.exceptions.ServiceValidationException;

import static org.mockito.Mockito.when;

public class CategoryServiceUnitTest {
  @Mock
  private CategoryRepository repo;

  @Mock
  private ModelMapper mapper;

  @InjectMocks
  @Spy
  private CategoryService categoryService;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void findAll() {
    categoryService.findAll();
    verify(repo).findAll();
  }

  @Test
  public void findById() {
    Long categoryId = 1L;
    categoryService.findById(categoryId);
    verify(repo).findById(categoryId);
  }

  @Test
  public void create_success() throws Exception {

    CreateCategoryDTO mockCategoryDTO = new CreateCategoryDTO();
    mockCategoryDTO.setName("work");
    mockCategoryDTO.setColor("#d5e4f5");
    Category mockCategory = new Category();

    when(mapper.map(mockCategoryDTO, Category.class)).thenReturn(mockCategory);
    when(repo.existsByName(mockCategoryDTO.getName())).thenReturn(false);
    when(repo.save(any(Category.class))).thenReturn(mockCategory);

    Category result = categoryService.create(mockCategoryDTO);
    assertNotNull(result);
    assertEquals(mockCategory, result);
    verify(repo).save(mockCategory);

  }

  @Test
  public void createCategory_existingCategory_failure() throws Exception {

    CreateCategoryDTO mockCategoryDTO = new CreateCategoryDTO();
    mockCategoryDTO.setName("work");
    Category mockCategory = new Category();

    when(mapper.map(mockCategoryDTO, Category.class)).thenReturn(mockCategory);
    when(repo.existsByName(mockCategoryDTO.getName())).thenReturn(true);

    assertThrows(ServiceValidationException.class, () -> categoryService.create(mockCategoryDTO));
    verify(repo, never()).save(any());

  }

  @Test
  public void createCategory_emptyCategory_failure() throws Exception {

    CreateCategoryDTO mockCategoryDTO = new CreateCategoryDTO();
    mockCategoryDTO.setName("");
    Category mockCategory = new Category();

    when(mapper.map(mockCategoryDTO, Category.class)).thenReturn(mockCategory);

    assertThrows(ServiceValidationException.class, () -> categoryService.create(mockCategoryDTO));

    verify(repo, never()).save(any());
  }

  @Test
  public void createCategory_nullCategory_failure() {

    CreateCategoryDTO mockCategoryDTO = new CreateCategoryDTO();

    Category mockCategory = new Category();

    when(mapper.map(mockCategoryDTO, Category.class)).thenReturn(mockCategory);

    assertThrows(ServiceValidationException.class, () -> categoryService.create(mockCategoryDTO));

    verify(repo, never()).save(any());

  }

  @Test
  public void deleteCategoryById_success() {

    Long categoryId = 2L;
    Category category = mock(Category.class);

    when(category.getId()).thenReturn(categoryId);
    when(repo.findById(categoryId)).thenReturn(Optional.of(category));

    categoryService.deleteCategoryById(categoryId);
    verify(repo).deleteById(categoryId);
  }

}