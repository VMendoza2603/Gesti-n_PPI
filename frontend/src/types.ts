export type Category = 'Todo' | 'Mujer' | 'Hombre' | 'Accesorios'

export interface Product {
  id: number; name: string; category: Category; price: number
  oldPrice?: number; badge?: string; img: string
}

export interface CartItem extends Product { qty: number }

export const collections = [
  { id: 1, label: 'Nueva temporada', title: 'Verano 2025', count: 48, featured: true,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80' },
  { id: 2, label: 'Colección', title: 'Urbana', count: 32,
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80' },
  { id: 3, label: 'Colección', title: 'Clásica', count: 27,
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80' },
]

export const products: Product[] = [
  { id: 1, name: 'Vestido Lino Essenza', category: 'Mujer',      price: 189, oldPrice: 240, badge: 'Sale',
    img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80' },
  { id: 2, name: 'Blazer Estructurado',  category: 'Hombre',     price: 295,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80' },
  { id: 3, name: 'Blusa Seda Marbella',  category: 'Mujer',      price: 145, badge: 'Nuevo',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80' },
  { id: 4, name: 'Bolso Cuero Nativo',   category: 'Accesorios', price: 320,
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80' },
  { id: 5, name: 'Pantalón Sastre',      category: 'Mujer',      price: 165, oldPrice: 200, badge: 'Sale',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80' },
  { id: 6, name: 'Camisa Oxford Slim',   category: 'Hombre',     price: 125, badge: 'Nuevo',
    img: 'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=500&q=80' },
  { id: 7, name: 'Cinturón Trenzado',    category: 'Accesorios', price: 89,
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80' },
  { id: 8, name: 'Jumpsuit Terracota',   category: 'Mujer',      price: 220,
    img: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=500&q=80' },
]

export const FILTERS: Category[] = ['Todo', 'Mujer', 'Hombre', 'Accesorios']

export const MARQUEE_ITEMS = ['Nueva Colección Verano 2025','·','Envío gratis +$150','·',
  'Devoluciones 30 días','·','Tejidos sostenibles','·','Hecho en Ecuador','·']

export const SHIPPING_THRESHOLD = 150
