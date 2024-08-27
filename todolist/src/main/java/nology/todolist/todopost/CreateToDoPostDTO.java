package nology.todolist.todopost;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;

public class CreateToDoPostDTO {

  @NotBlank
  @Length(min = 5)
  private String content;

  @NotBlank
  private String category;

  @Override
  public String toString() {
    return "CreateToDoPostDTO [content=" + content + ", category=" + category + "]";
  }

  public String getContent() {
    return content;
  }

  public String getCategory() {
    return category;
  }

}
