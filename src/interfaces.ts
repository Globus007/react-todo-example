export interface ITodo {
  _id: string;
  message: string;
  completed: boolean;
}

export interface Pages {
  todos: ITodo[];
  pageInfo: PagesInfo;
}

export interface PagesInfo {
  totalPages: number;
  currentPage: number;
  limit: number;
  totalElements: number;
}
