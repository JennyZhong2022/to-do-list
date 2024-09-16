import { CategoryFormData } from "../components/CategoryForm/schema";
import { ToDoPostFormData } from "../components/ToDoPostForm/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface ToDoPostResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    color: string;
  };
}

export interface CategoryResponse {
  id: number;
  name: string;
  color: string;
}

export const getAllToDoPosts = async () => {
  const response = await fetch(baseURL + "/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as ToDoPostResponse[];
};

export const getAllCategories = async () => {
  const response = await fetch(baseURL + "/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as CategoryResponse[];
};

export const createToDoPost = async (data: ToDoPostFormData) => {
  const response = await fetch(baseURL + "/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as ToDoPostResponse;
};

export const createCategory = async (data: CategoryFormData) => {
  const response = await fetch(baseURL + "/categories", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as CategoryResponse;
};

export const getToDoPostById = async (id: number) => {
  const response = await fetch(baseURL + `/posts/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as ToDoPostResponse;
};

export const updateToDoPostById = async (
  id: number,
  data: ToDoPostFormData
) => {
  const response = await fetch(baseURL + `/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as ToDoPostResponse;
};

export const deleteToDoPostById = async (id: number) => {
  const response = await fetch(baseURL + `/posts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return true;
};

export const deleteCategoryById = async (id: number) => {
  try {
    const response = await fetch(baseURL + `/categories/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(
        `Failed to delete category: ${response.status} ${response.statusText}`,
        errorMessage
      );
      throw new Error("Failed to delete category");
    }

    return true;
  } catch (error) {
    console.error("Error during delete request:", error);
    throw error;
  }
};

export const deleteAllToDoPost = async () => {
  const response = await fetch(baseURL + "/posts", {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return true;
};

export const getCategoriesColors = async () => {
  const response = await fetch(baseURL + "/categories/colors", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch colors");
  }
  return (await response.json()) as string[];
};
