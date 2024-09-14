
package nology.todolist.todopost;

import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.modelmapper.ModelMapper;

public class TodopostServiceUnitTest {
  @Mock
  private ToDoPostRepository repo;

  @Mock
  private ModelMapper mapper;

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

}