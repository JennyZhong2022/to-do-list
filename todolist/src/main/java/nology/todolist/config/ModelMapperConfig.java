package nology.todolist.config;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import nology.todolist.category.Category;
import nology.todolist.category.CreateCategoryDTO;

@Configuration
public class ModelMapperConfig {
  @Bean
  public ModelMapper modelMapper() {
    ModelMapper mapper = new ModelMapper();
    mapper.getConfiguration().setSkipNullEnabled(false);
    // mapper.typeMap(String.class, String.class).
    // .setConverter(new StringTrimConverter());
    // mapper.typeMap(CreateCategoryDTO.class, Category.class).addMappings(m -> m
    // .using(new
    // CreateCategoryDTOToCategoryConvertor()).map(CreateCategoryDTO::getName,
    // Category::setName));
    return mapper;

  }

}
