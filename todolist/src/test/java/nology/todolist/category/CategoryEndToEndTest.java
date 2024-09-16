package nology.todolist.category;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class CategoryEndToEndTest {
  @LocalServerPort
  private int port;

  @Autowired
  private CategoryRepository categoryRepository;

  @BeforeEach
  public void setUp() {
    RestAssured.port = port;
    categoryRepository.deleteAll();

    Category category1 = new Category();
    category1.setName("work");
    categoryRepository.save(category1);

    Category category2 = new Category();
    category2.setName("shopping");
    categoryRepository.save(category2);
  }

  @Test
  public void getAllCategories() {
    given()
        .when()
        .get("/categories")
        .then()
        .statusCode(HttpStatus.OK.value()).body("$", hasSize(2)).body("name", hasItems("work", "shopping"));
    // .body(matchesJsonSchemaInClasspath("nology/todolist/category/schemas/categories-schema.json"));
  }

  @Test
  public void createCategory_success() {
    CreateCategoryDTO data = new CreateCategoryDTO();
    data.setName("new category");
    data.setColor("#f7d0cf"); // this is a valid color

    given()
        .contentType(ContentType.JSON)
        .body(data)
        .when()
        .post("/categories")
        .then()
        .statusCode(HttpStatus.CREATED.value())
        .body("name", equalTo("New category"))
        .body("id", notNullValue())
        .body("color", equalTo("#f7d0cf"));
    // .body(matchesJsonSchemaInClasspath("nology/todolist/category/schemas/category-schema.json"));

  }

  @Test
  public void createCategory_existingCategory_failure() {
    CreateCategoryDTO data = new CreateCategoryDTO();
    data.setName("work");
    data.setColor("#d5e4f5");

    given()
        .contentType(ContentType.JSON)
        .body(data)
        .when()
        .post("/categories")
        .then()
        .statusCode(HttpStatus.BAD_REQUEST.value())
        // .body(matchesJsonSchemaInClasspath("nology/todolist/category/schemas/existing-category-error-schema.json"))
        .body("errors.name[0]", equalTo("category with name 'work' already exists"));
  }

  @Test
  public void createCategory_emptyCategory_failure() {
    CreateCategoryDTO data = new CreateCategoryDTO();
    data.setName("");

    given()
        .contentType(ContentType.JSON)
        .body(data)
        .when()
        .post("/categories")
        .then()
        .statusCode(HttpStatus.BAD_REQUEST.value());

  }

  @Test
  public void createCategory_nullCategory_failure() {
    CreateCategoryDTO data = new CreateCategoryDTO();

    given()
        .contentType(ContentType.JSON)
        .body(data)
        .when()
        .post("/categories")
        .then()
        .statusCode(HttpStatus.BAD_REQUEST.value());

  }

  @Test
  public void deleteCategoryById_success() {
    Long idToDelete = 1L;

    given()
        .when()
        .delete("/categories/{id}", idToDelete)
        .then()
        .statusCode(HttpStatus.NO_CONTENT.value());
  }
}