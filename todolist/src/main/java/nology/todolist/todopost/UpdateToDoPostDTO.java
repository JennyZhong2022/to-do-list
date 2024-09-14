package nology.todolist.todopost;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class UpdateToDoPostDTO {

  @NotBlank
  @Length(min = 5)
  private String content;

  @Min(1)
  private Long categoryId;

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public void setCategoryId(Long categoryId) {
    this.categoryId = categoryId;
  }

  public Long getCategoryId() {
    return categoryId;
  }

}
