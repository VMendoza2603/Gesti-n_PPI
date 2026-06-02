import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Collections from './components/Collections'
import Products from './components/Products'
import Banner from './components/Banner'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Toast from './components/Toast'
import type { Product, CartItem, Category } from './types'
import { products } from './types'
import './shared.css'

export default function LandingPage() {
  const [filter,   setFilter]   = useState<Category>('Todo')
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [toast,    setToast]    = useState({ msg: '', visible: false })

  const visible   = filter === 'Todo' ? products : products.filter(p => p.category === filter)
  const totalQty  = cartItems.reduce((s, i) => s + i.qty, 0)

  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id)
      return exists
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }]
    })
    setToast({ msg: `✓ "${product.name}" agregado`, visible: true })
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2200)
  }, [])

  const updateQty = useCallback((id: number, delta: number) => {
    setCartItems(prev =>
      prev
        .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    )
  }, [])

  const removeItem = useCallback((id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const toggleWish = (id: number) =>
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id])

  return (
    <>
      <Navbar totalQty={totalQty} onCartOpen={() => setCartOpen(true)} />

      <main id="main-content">
        <Hero />
        <Marquee />
        <Collections />
        <Products
          filter={filter}
          onFilterChange={setFilter}
          visible={visible}
          wishlist={wishlist}
          onToggleWish={toggleWish}
          onAddToCart={addToCart}
        />
        <Banner />
        <ContactSection />
      </main>

      <Footer />

      <CartDrawer
        items={cartItems}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onQty={updateQty}
        onRemove={removeItem}
      />

      <Toast message={toast.msg} visible={toast.visible} />
    </>
  )
}
