export interface Category {
  name: string  
  subcategories: Subcategories[]
}

interface Subcategories{
  name: string
  items: string[]
}