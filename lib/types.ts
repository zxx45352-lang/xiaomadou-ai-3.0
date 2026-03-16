export interface Product {
  id: string;
  name: string;
  spu: string;
  category: string;
  gender: string;
  age_group: string;
  season: string;
  price: number;
  image_url: string;
  tags: string[];
  status: string;
  created_at: string;
}

export interface Template {
  id: string;
  name: string;
  type: string;
  style: string;
  scene: string;
  output_type: string;
  prompt_base: string;
  status: string;
  cover_image: string;
  created_at: string;
}

export interface Generation {
  id: string;
  product_id: string;
  template_id: string;
  task_name: string;
  prompt_text: string;
  generated_image_url: string;
  marketing_copy: string;
  status: string;
  aspect_ratio: string;
  created_at: string;
  
  // Joined fields for UI
  product?: Product;
  template?: Template;
}
