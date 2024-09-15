
package nology.todolist.todopost;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.mock;
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
import java.util.List;
import java.util.Collections;

import nology.todolist.category.Category;
import nology.todolist.category.CategoryService;
import nology.todolist.common.exceptions.ServiceValidationException;

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

  @Test
  public void createTodoPost_nullTodoPost_failure() throws Exception {

    CreateToDoPostDTO mockTodoPostDTO = new CreateToDoPostDTO();

    ToDoPost mockTodoPost = new ToDoPost();
    Category mockCategory = new Category();

    when(mapper.map(mockTodoPostDTO, ToDoPost.class)).thenReturn(mockTodoPost);
    when(categoryService.findById(mockTodoPostDTO.getCategoryId())).thenReturn(Optional.of(mockCategory));

    when(repo.save(any(ToDoPost.class))).thenReturn(mockTodoPost);

    verify(repo, never()).save(any());
  }

  @Test
  public void create_categoryNotFound_failure() throws Exception {

    CreateToDoPostDTO mockTodoPostDTO = new CreateToDoPostDTO();
    mockTodoPostDTO.setContent("clean bathroom");
    mockTodoPostDTO.setCategoryId(1L);

    when(categoryService.findById(mockTodoPostDTO.getCategoryId())).thenReturn(Optional.empty());

    assertThrows(ServiceValidationException.class, () -> toDoPostService.createToDoPost(mockTodoPostDTO));

    verify(repo, never()).save(any());
  }

  @Test
  public void updateTodoPostById_with_same_category_success() throws Exception {
    Long todoPostId = 1L;
    UpdateToDoPostDTO mockUpdateTodoPostDTO = new UpdateToDoPostDTO();
    mockUpdateTodoPostDTO.setContent("clean kitchen");
    mockUpdateTodoPostDTO.setCategoryId(1L);

    ToDoPost existingTodoPost = new ToDoPost();
    existingTodoPost.setContent("clean bathroom");
    Category mockCategory = new Category();
    existingTodoPost.setCategory(mockCategory);

    when(repo.findById(todoPostId)).thenReturn(Optional.of(existingTodoPost));
    when(categoryService.findById(mockUpdateTodoPostDTO.getCategoryId())).thenReturn(Optional.of(mockCategory));

    doAnswer(invocation -> {
      UpdateToDoPostDTO dto = invocation.getArgument(0);
      ToDoPost post = invocation.getArgument(1);
      post.setContent(dto.getContent());
      return null; // void method returns null
    }).when(mapper).map(any(UpdateToDoPostDTO.class), any(ToDoPost.class));

    when(repo.save(any(ToDoPost.class))).thenAnswer(invocation -> {
      ToDoPost savedPost = invocation.getArgument(0);
      return savedPost;
    });

    Optional<ToDoPost> result = toDoPostService.updateToDoPostById(todoPostId, mockUpdateTodoPostDTO);

    assertTrue(result.isPresent());
    System.out.println("Result content: " + result.get().getContent());
    assertEquals("clean kitchen", result.get().getContent());
    assertEquals(mockCategory, result.get().getCategory());

    verify(repo).findById(todoPostId);
    verify(mapper).map(mockUpdateTodoPostDTO, existingTodoPost);
    verify(repo).save(existingTodoPost);
  }

  @Test
  public void deleteTodoPostById_success() {

    Long todoPostId = 1L;
    ToDoPost toDoPost = mock(ToDoPost.class);

    when(toDoPost.getId()).thenReturn(todoPostId);
    when(repo.findById(todoPostId)).thenReturn(Optional.of(toDoPost));

    toDoPostService.deleteToDoPostById(todoPostId);
    verify(repo).deleteById(todoPostId);
  }

  @Test
  public void deleteAllTodoPost_success() {

    List<ToDoPost> mockToDoPosts = List.of(mock(ToDoPost.class));

    when(repo.findAll()).thenReturn(mockToDoPosts);

    boolean result = toDoPostService.deleteAllToDoPost();
    verify(repo).deleteAll();
    assertTrue(result);
  }

  @Test
  public void deleteAllTodoPost_noPosts_success() {
    when(repo.findAll()).thenReturn(Collections.emptyList());
    boolean result = toDoPostService.deleteAllToDoPost();
    verify(repo, never()).deleteAll();
    assertFalse(result);
  }

}
