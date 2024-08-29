package nology.todolist.category;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
  boolean existsByName(String name); // check if duplicated like lower case is same of upper case.
}
