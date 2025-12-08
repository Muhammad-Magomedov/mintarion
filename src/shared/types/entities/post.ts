export interface IPostBaseData {
  id: string;
  category: string;
  imgSrc: string;
  title: string;
  href: string;
  excerpt?: string;
  author: any;
  createdAt: string;
}

export interface IPost extends IPostBaseData {
  content: string;
}

export interface ICategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IFilter {
  id: string;
  slug: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}