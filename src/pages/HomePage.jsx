"use client"

import { useState } from "react"
import CustomButton from "../components/CustomButton"
import MenuPage from "../components/MenuPage"
import { useAuthContext } from "../context/useAuthContext"
import "./HomePage.css"

// Sample table data
const tables = [
  {
    id: 1,
    name: "Window Table for 2",
    capacity: 2,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=300&fit=crop",
    location: "By the window",
    amenities: ["Natural light", "Street view"],
    pricePerHour: 15,
  },
  {
    id: 2,
    name: "Cozy Corner Booth",
    capacity: 4,
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=300&h=300&fit=crop",
    location: "Corner section",
    amenities: ["Private seating", "Comfortable cushions"],
    pricePerHour: 25,
  },
  {
    id: 3,
    name: "Central Table for 6",
    capacity: 6,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop",
    location: "Main dining area",
    amenities: ["Spacious", "Great for groups"],
    pricePerHour: 35,
  },
  {
    id: 4,
    name: "Quiet Study Nook",
    capacity: 2,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=300&h=300&fit=crop",
    location: "Quiet zone",
    amenities: ["WiFi", "Power outlets", "Quiet atmosphere"],
    pricePerHour: 20,
  },
  {
    id: 5,
    name: "Outdoor Patio Table",
    capacity: 4,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&fit=crop",
    location: "Outdoor patio",
    amenities: ["Fresh air", "Garden view"],
    pricePerHour: 30,
  },
  {
    id: 6,
    name: "Bar Counter Seats",
    capacity: 3,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=300&fit=crop",
    location: "Coffee bar",
    amenities: ["Watch baristas work", "Quick service"],
    pricePerHour: 18,
  },
]

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
]

const capacityFilters = ["All", "2 seats", "3-4 seats", "5+ seats"]

export default function HomePage() {
  const { logout } = useAuthContext()
  const [activeTab, setActiveTab] = useState("tables")
  const [bookings, setBookings] = useState([])
  const [cart, setCart] = useState([])
  const [selectedCapacity, setSelectedCapacity] = useState("All")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const addBooking = (table, timeSlot, duration = 2) => {
    const booking = {
      id: Date.now(),
      table,
      timeSlot,
      duration,
      date: selectedDate,
      totalPrice: table.pricePerHour * duration,
      status: "confirmed",
    }

    setBookings((prevBookings) => [...prevBookings, booking])
  }

  const removeBooking = (bookingId) => {
    setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId))
  }

  const updateBookingDuration = (bookingId, newDuration) => {
    if (newDuration <= 0) {
      removeBooking(bookingId)
      return
    }

    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              duration: newDuration,
              totalPrice: booking.table.pricePerHour * newDuration,
            }
          : booking,
      ),
    )
  }

  const getTotalCost = () => {
    return bookings.reduce((total, booking) => total + booking.totalPrice, 0)
  }

  const removeCartItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeCartItem(itemId)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    )
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleConfirmOrder = async () => {
    try {
      const payload = {
        bookings,
        cart,
        total: (getTotalCost() + getCartTotal()),
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || 'Order failed')
      }

      // clear cart and bookings on success
      setCart([])
      setBookings([])
      alert(`Order placed successfully (id: ${data.orderId})`)
    } catch (err) {
      console.error('Order error', err)
      alert('Failed to place order. Please try again.')
    }
  }

  const filteredTables =
    selectedCapacity === "All"
      ? tables
      : selectedCapacity === "2 seats"
        ? tables.filter((table) => table.capacity === 2)
        : selectedCapacity === "3-4 seats"
          ? tables.filter((table) => table.capacity >= 3 && table.capacity <= 4)
          : tables.filter((table) => table.capacity >= 5)

  return (
    <div className="cafe-home">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h1>☕ CafeBook</h1>
          </div>
          <nav className="nav">
            <ul>
              <li>
                <button
                  onClick={() => setActiveTab("tables")}
                  style={{
                    background: activeTab === "tables" ? "#d4a574" : "transparent",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                >
                  Tables
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("menu")}
                  style={{
                    background: activeTab === "menu" ? "#d4a574" : "transparent",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                >
                  Menu
                </button>
              </li>
            </ul>
          </nav>
          <div className="header-actions">
            <div
              className="booking-icon"
              onClick={() => document.getElementById("booking-sidebar").classList.toggle("open")}
            >
              <span className="booking-count">{bookings.length + cart.length}</span>🛒
            </div>
            <CustomButton onPress={logout} name="Logout" />
          </div>
        </div>
      </header>

      {activeTab === "tables" ? (
        <>
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-content">
              <h1>Reserve Your Perfect Spot</h1>
              <p>Book a table at our cozy coffee cafe and enjoy premium coffee in comfort</p>
              <CustomButton
                name="Book Now"
                onPress={() => document.getElementById("tables").scrollIntoView({ behavior: "smooth" })}
              />
            </div>
          </section>

          {/* Date and Capacity Filter */}
          <section className="filter-section">
            <div className="container">
              <h2>Find Your Table</h2>
              <div className="filters">
                <div className="date-filter">
                  <label htmlFor="date">Select Date:</label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="date-input"
                  />
                </div>
                <div className="capacity-buttons">
                  {capacityFilters.map((capacity) => (
                    <button
                      key={capacity}
                      className={`capacity-btn ${selectedCapacity === capacity ? "active" : ""}`}
                      onClick={() => setSelectedCapacity(capacity)}
                    >
                      {capacity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Tables Section */}
          <section id="tables" className="tables-section">
            <div className="container">
              <h2>Available Tables</h2>
              <div className="tables-grid">
                {filteredTables.map((table) => (
                  <div key={table.id} className="table-card">
                    <div className="table-image">
                      <img src={table.image || "/placeholder.svg"} alt={table.name} />
                      <div className="table-overlay">
                        <div className="time-slots">
                          <h4>Available Times:</h4>
                          <div className="time-grid">
                            {timeSlots.slice(0, 4).map((time) => (
                              <button key={time} className="time-slot" onClick={() => addBooking(table, time)}>
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="table-info">
                      <h3>{table.name}</h3>
                      <p className="table-location">📍 {table.location}</p>
                      <p className="table-capacity">👥 Seats {table.capacity} people</p>
                      <div className="table-amenities">
                        {table.amenities.map((amenity) => (
                          <span key={amenity} className="amenity-tag">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <div className="table-price">${table.pricePerHour}/hour</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <MenuPage cart={cart} setCart={setCart} />
      )}

      {/* Booking & Cart Sidebar */}
      <div id="booking-sidebar" className="booking-sidebar">
        <div className="booking-header">
          <h3>{bookings.length > 0 || cart.length > 0 ? "Your Orders" : "Empty"}</h3>
          <button
            className="close-booking"
            onClick={() => document.getElementById("booking-sidebar").classList.remove("open")}
          >
            ✕
          </button>
        </div>
        <div className="booking-items">
          {bookings.length === 0 && cart.length === 0 ? (
            <p className="empty-bookings">No bookings or items yet</p>
          ) : (
            <>
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-item">
                  <img src={booking.table.image || "/placeholder.svg"} alt={booking.table.name} />
                  <div className="booking-item-info">
                    <h4>{booking.table.name}</h4>
                    <p>📅 {booking.date}</p>
                    <p>🕐 {booking.timeSlot}</p>
                    <p>💰 ${booking.table.pricePerHour}/hour</p>
                    <div className="duration-controls">
                      <label>Duration (hours):</label>
                      <button onClick={() => updateBookingDuration(booking.id, booking.duration - 1)}>-</button>
                      <span>{booking.duration}</span>
                      <button onClick={() => updateBookingDuration(booking.id, booking.duration + 1)}>+</button>
                    </div>
                    <p className="booking-total">Total: ${booking.totalPrice}</p>
                  </div>
                  <button className="remove-booking" onClick={() => removeBooking(booking.id)}>
                    ✕
                  </button>
                </div>
              ))}
              {cart.map((item) => (
                <div key={item.id} className="booking-item">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  <div className="booking-item-info">
                    <h4>{item.name}</h4>
                    <p>💰 ${item.price} each</p>
                    <div className="duration-controls">
                      <label>Qty:</label>
                      <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <p className="booking-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button className="remove-booking" onClick={() => removeCartItem(item.id)}>
                    ✕
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
        {(bookings.length > 0 || cart.length > 0) && (
            <div className="booking-footer">
            <div className="booking-total">
              <strong>Total: ${(getTotalCost() + getCartTotal()).toFixed(2)}</strong>
            </div>
            <CustomButton name="Confirm Order" onPress={handleConfirmOrder} />
          </div>
        )}
      </div>
    </div>
  )
}
