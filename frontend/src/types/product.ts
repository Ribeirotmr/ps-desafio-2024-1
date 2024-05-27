import { categoryType } from '@/types/category'

export type productType = {
  available: unknown
  id: string
  name: string
  amount: number
  price: number
  image: string
  status: boolean
  category_id: string
  category: categoryType
  createdAt: Date
  updatedAt: Date
}
