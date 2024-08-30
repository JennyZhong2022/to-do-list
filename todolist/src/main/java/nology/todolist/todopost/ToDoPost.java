package nology.todolist.todopost;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import nology.todolist.category.Category;
import nology.todolist.common.BaseEntity;

@Entity
@Table(name = "todo_posts")
public class ToDoPost extends BaseEntity {

  public ToDoPost() {
  }

  @Column(columnDefinition = "TEXT")
  private String content;

  @ManyToOne
  @JoinColumn(name = "category_id")
  @JsonIgnoreProperties("posts")
  private Category category;

  public void setContent(String content) {
    this.content = content;
  }

  public void setCategory(Category category) {
    this.category = category;
  }

  public String getContent() {
    return content;
  }

  public Category getCategory() {
    return category;
  }

}