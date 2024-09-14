package nology.todolist.todopost;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateToDoPostDTO {

  @NotBlank
  @Length(min = 5)
  private String content;

  @NotNull
  @Min(1)
  private Long categoryId;

  public String getContent() {
    return content;
  }

  public Long getCategoryId() {
    return categoryId;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public void setCategoryId(Long categoryId) {
    this.categoryId = categoryId;
  }

}
