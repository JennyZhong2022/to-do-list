package nology.todolist.todopost;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "todo_posts")
public class ToDoPost {

  public ToDoPost(Long id, String content, Date createdAt, String category) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.category = category;
  }

  public ToDoPost() {
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String content;

  @Column
  @Temporal(TemporalType.TIMESTAMP)
  private Date createdAt;

  @Column
  private String category;

  public void setId(Long id) {
    this.id = id;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public void setCreatedAt(Date createdAt) {
    this.createdAt = createdAt;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public Long getId() {
    return id;
  }

  public String getContent() {
    return content;
  }

  public Date getCreatedAt() {
    return createdAt;
  }

  public String getCategory() {
    return category;
  }

}