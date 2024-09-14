
package nology.todolist.todopost;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.modelmapper.ModelMapper;

import java.util.Optional;

import nology.todolist.category.Category;
import nology.todolist.category.CategoryService;

public class TodopostServiceUnitTest {
  @Mock
  private ToDoPostRepository repo;

  @Mock
  private ModelMapper mapper;

  @Mock
  private CategoryService categoryService;

  @InjectMocks
  @Spy
  private ToDoPostService toDoPostService;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void findAll() {
    toDoPostService.findAllToDoPosts();
    verify(repo).findAll();
  }

  @Test
  public void findById() {
    Long todoPostId = 1L;
    toDoPostService.findToDoPostById(todoPostId);
    verify(repo).findById(todoPostId);
  }

  @Test
  public void createTodoPost_success() throws Exception {

    CreateToDoPostDTO mockTodoPostDTO = new CreateToDoPostDTO();
    mockTodoPostDTO.setContent("clean bathroom");
    mockTodoPostDTO.setCategoryId(1L);

    ToDoPost mockTodoPost = new ToDoPost();
    Category mockCategory = new Category();

    when(mapper.map(mockTodoPostDTO, ToDoPost.class)).thenReturn(mockTodoPost);
    when(categoryService.findById(mockTodoPostDTO.getCategoryId())).thenReturn(Optional.of(mockCategory));

    when(repo.save(any(ToDoPost.class))).thenReturn(mockTodoPost);

    ToDoPost result = toDoPostService.createToDoPost(mockTodoPostDTO);

    assertNotNull(result);
    assertEquals(mockTodoPost, result);
    verify(repo).save(mockTodoPost);
    assertEquals(mockCategory, mockTodoPost.getCategory());

  }

  @Test
  public void createTodoPost_emptyTodoPost_failure() throws Exception {

    CreateToDoPostDTO mockTodoPostDTO = new CreateToDoPostDTO();
    mockTodoPostDTO.setContent("");
    mockTodoPostDTO.setCategoryId(1L);

    ToDoPost mockTodoPost = new ToDoPost();
    Category mockCategory = new Category();

    when(mapper.map(mockTodoPostDTO, ToDoPost.class)).thenReturn(mockTodoPost);
    when(categoryService.findById(mockTodoPostDTO.getCategoryId())).thenReturn(Optional.of(mockCategory));

    when(repo.save(any(ToDoPost.class))).thenReturn(mockTodoPost);

    verify(repo, never()).save(any());
  }
}