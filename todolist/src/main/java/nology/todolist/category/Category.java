package nology.todolist.category;

import java.util.List;

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

  @OneToMany(mappedBy = "category")
  private List<ToDoPost> posts;

  public Category() {

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