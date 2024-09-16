package nology.todolist.category;

import java.util.List;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import nology.todolist.common.BaseEntity;
import nology.todolist.todopost.ToDoPost;

@Entity
@Table(name = "categories")
public class Category extends BaseEntity {

  @Column(unique = true)
  private String name;

  @Column
  private String color;

  @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
  // cascade = CascadeType.ALL,, orphanRemoval = true: Removes child entities
  @JsonIgnoreProperties("category")
  private List<ToDoPost> posts = new ArrayList<>();

  public Category() {

  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public String getName() {
    return name;
  }

  public List<ToDoPost> getPosts() {
    return posts;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setPosts(List<ToDoPost> posts) {
    this.posts = posts;
  }

}
