import { ToDoPostFormData } from "../components/ToDoPostForm/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface ToDoPostResponse{
  id: number
  content: string
  createdAt: string;
  updatedAt: string;
  category:{ name: string; }
}

export interface CategoryResponse{
  id: number
  name: string;
}

export const getAllToDoPosts = async() => {
  const response = await fetch(baseURL + '/posts');
  if (!response.ok) {
    throw new Error("Failed to fetch");

  }
  return (await response.json()) as ToDoPostResponse[];
  
}

export const getAllCategories = async () => {
  const response = await fetch(baseURL + '/categories');
  if (!response.ok) {
    throw new Error("Failed to fetch");

  }
  return (await response.json()) as CategoryResponse[];
}


export const createToDoPost =async (data:ToDoPostFormData) => {
  const response = await fetch(baseURL + '/posts', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }

  });
  if (!response.ok) {
    throw new Error("Failed to fetch");

  }
  return (await response.json()) as ToDoPostResponse;
}


export const getToDoPostById = async(id:number) => {
  const response = await fetch(baseURL + `/posts/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch");

  }
  return (await response.json()) as ToDoPostResponse;
}


export const updateToDoPostById = async(id:number, data:ToDoPostFormData)  => {
  const response = await fetch(baseURL + `/posts/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch");

  }
  return (await response.json()) as ToDoPostResponse;
}


export const deleteToDoPostById = async(id:number) => {
  const response = await fetch(baseURL + `/posts/${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch");

  }
  return true
}

