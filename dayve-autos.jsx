import React, { useContext, useEffect, useRef, useState } from "react";

const GOLD = "#C9A96E";
const GOLD_LIGHT = "#E8C98A";
const DARK = "#0A0A0A";
const CHARCOAL = "#111111";
const CHARCOAL2 = "#161616";
const SURFACE = "#1A1A1A";
const SURFACE2 = "#222222";
const BUSINESS_NAME = "Dayve Autos";
const BUSINESS_PHONE = "09151369309";
const WHATSAPP_NUMBER = "2349151369309";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const BUSINESS_LOCATION = "FUT Minna, Minna, Niger State, Nigeria";
const BODY_FONT = "'Trebuchet MS', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const HEADING_FONT = "Georgia, 'Times New Roman', serif";

const THEMES = {
  dark: {
    name: "Black",
    page: "#090909",
    section: "#111111",
    sectionAlt: "#161616",
    card: "#1A1A1A",
    cardAlt: "#222222",
    border: "rgba(255,255,255,0.08)",
    text: "#F8F4EE",
    muted: "rgba(255,255,255,0.68)",
    subtle: "rgba(255,255,255,0.38)",
    nav: "rgba(10,10,10,0.92)",
  },
  light: {
    name: "Light",
    page: "#F5EFE6",
    section: "#FFF9F1",
    sectionAlt: "#F3ECE1",
    card: "#FFFFFF",
    cardAlt: "#FBF6EF",
    border: "rgba(20,16,12,0.10)",
    text: "#16110D",
    muted: "rgba(22,17,13,0.72)",
    subtle: "rgba(22,17,13,0.50)",
    nav: "rgba(255,249,242,0.90)",
  },
};

const ThemeContext = React.createContext(THEMES.dark);
const useTheme = () => useContext(ThemeContext);

const formatWhatsAppMessage = (carName = "", purpose = "general inquiry") => {
  const messageLines = [
    `Hello ${BUSINESS_NAME},`,
    `I would like to make a ${purpose}.`,
    carName ? `Vehicle: ${carName}` : null,
    `Phone: ${BUSINESS_PHONE}`,
    `Location: ${BUSINESS_LOCATION}`,
  ].filter(Boolean);
  return encodeURIComponent(messageLines.join("\n"));
};

const buildWhatsAppLink = (carName = "", purpose = "general inquiry") => `${WHATSAPP_LINK}?text=${formatWhatsAppMessage(carName, purpose)}`;

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

function ThemeToggle({ themeMode, onToggle }) {
  const theme = useTheme();
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${themeMode === "dark" ? "light" : "black"} theme`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        border: `1px solid ${theme.border}`,
        background: themeMode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(20,16,12,0.04)",
        color: theme.text,
        padding: "10px 14px",
        borderRadius: 999,
        fontSize: 11,
        letterSpacing: 2,
        textTransform: "uppercase",
        fontFamily: BODY_FONT,
        cursor: "pointer",
        transition: "transform 0.3s ease, border-color 0.3s ease, background 0.3s ease",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.borderColor = GOLD; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = theme.border; }}
    >
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: GOLD, boxShadow: `0 0 0 4px ${themeMode === "dark" ? "rgba(201,169,110,0.18)" : "rgba(201,169,110,0.12)"}` }} />
      {themeMode === "dark" ? "Light mode" : "Black mode"}
    </button>
  );
}

function InventoryFilters({ query, setQuery, condition, setCondition, status, setStatus }) {
  const theme = useTheme();
  const fieldTextColor = theme.name === "Light" ? "#14110D" : theme.text;
  const fieldBackground = theme.name === "Light" ? "#FFFFFF" : themeModeBackground(theme);
  const commonFieldStyle = {
    width: "100%",
    borderRadius: 16,
    border: `1px solid ${theme.border}`,
    background: fieldBackground,
    color: fieldTextColor,
    padding: "14px 16px",
    outline: "none",
    fontSize: 14,
    fontFamily: BODY_FONT,
    colorScheme: theme.name === "Light" ? "light" : "dark",
    transition: "border-color 0.3s ease, transform 0.3s ease",
  };
  return (
    <div className="inventory-filter-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14, marginBottom: 28 }}>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search make, model, year, or price"
        style={commonFieldStyle}
      />
      <select value={condition} onChange={e => setCondition(e.target.value)} style={commonFieldStyle}>
        <option value="All" style={{ color: "#14110D", background: "#FFFFFF" }}>All conditions</option>
        <option value="Brand New" style={{ color: "#14110D", background: "#FFFFFF" }}>Brand New</option>
        <option value="Foreign Used" style={{ color: "#14110D", background: "#FFFFFF" }}>Foreign Used</option>
      </select>
      <select value={status} onChange={e => setStatus(e.target.value)} style={commonFieldStyle}>
        <option value="All" style={{ color: "#14110D", background: "#FFFFFF" }}>All stock</option>
        <option value="AVAILABLE" style={{ color: "#14110D", background: "#FFFFFF" }}>Available</option>
        <option value="NEW" style={{ color: "#14110D", background: "#FFFFFF" }}>New arrivals</option>
        <option value="SOLD OUT" style={{ color: "#14110D", background: "#FFFFFF" }}>Sold out</option>
        <option value="RARE FIND" style={{ color: "#14110D", background: "#FFFFFF" }}>Rare find</option>
      </select>
      <style>{`.inventory-controls input::placeholder{color:${theme.subtle};}`}</style>
    </div>
  );
}

function themeModeBackground(theme) {
  return theme.name === "Black" ? "rgba(255,255,255,0.03)" : "rgba(22,17,13,0.03)";
}

function CarDetailModal({ car, onClose, onOpenInquiry }) {
  const theme = useTheme();
  if (!car) return null;
    const details = [
      { label: "Year", value: car.year || "-" },
      { label: "Condition", value: car.condition || "-" },
      { label: "Transmission", value: car.trans || "Automatic" },
      { label: "Mileage", value: car.mileage || "Verified on request" },
      { label: "Fuel", value: car.fuel || "Petrol" },
      { label: "Engine", value: car.engine || "Premium spec" },
      { label: "Drive", value: car.drive || "4WD / AWD" },
      { label: "Status", value: car.tag || "AVAILABLE" },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 250, background: "rgba(0,0,0,0.74)", backdropFilter: "blur(18px)", display: "grid", placeItems: "center", padding: 20, animation: "fadeIn 0.25s ease" }} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
        style={{
          width: "min(100%, 980px)",
          maxHeight: "90vh",
          overflow: "auto",
          background: theme.card,
          color: theme.text,
          border: `1px solid ${theme.border}`,
          borderRadius: 28,
          boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
          animation: "popUp 0.3s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: `1px solid ${theme.border}` }}>
          <div>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: 4, fontFamily: BODY_FONT, textTransform: "uppercase" }}>Vehicle Details</div>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: HEADING_FONT, marginTop: 6 }}>{car.name}</div>
          </div>
          <button type="button" onClick={onClose} style={{ border: `1px solid ${theme.border}`, background: "transparent", color: theme.text, width: 40, height: 40, borderRadius: "50%", cursor: "pointer" }}>×</button>
        </div>
        <div className="modal-two-column" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, padding: 24 }}>
          <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", minHeight: 320 }}>
            <img src={car.img} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.66), transparent 50%)" }} />
            <div style={{ position: "absolute", bottom: 18, left: 18, right: 18, display: "flex", justifyContent: "space-between", alignItems: "end", gap: 12 }}>
              <div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 10, letterSpacing: 3, fontFamily: BODY_FONT, textTransform: "uppercase" }}>{car.tag}</div>
                <div style={{ color: "#fff", fontSize: 26, fontWeight: 800, fontFamily: HEADING_FONT }}>{car.price}</div>
              </div>
              <button type="button" onClick={() => onOpenInquiry(car)} style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, border: "none", color: "#000", padding: "14px 18px", borderRadius: 999, fontFamily: BODY_FONT, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>Inquire</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
              {details.map(item => (
                <div key={item.label} style={{ background: themeModeBackground(theme), border: `1px solid ${theme.border}`, borderRadius: 18, padding: 14 }}>
                  <div style={{ color: GOLD, fontSize: 10, letterSpacing: 3, fontFamily: BODY_FONT, textTransform: "uppercase", marginBottom: 8 }}>{item.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, fontFamily: BODY_FONT }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: themeModeBackground(theme), border: `1px solid ${theme.border}`, borderRadius: 20, padding: 18, lineHeight: 1.75, color: theme.muted, fontFamily: BODY_FONT }}>
              {car.description || "Verified stock, premium condition, and ready for inspection or delivery in Minna and across Nigeria."}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <button type="button" onClick={() => window.open(buildWhatsAppLink(car.name, "car inquiry"), "_blank", "noopener,noreferrer")} style={{ background: "#25D366", color: "#fff", border: "none", padding: "14px 18px", borderRadius: 999, fontFamily: BODY_FONT, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>WhatsApp now</button>
              <button type="button" onClick={() => onOpenInquiry(car)} style={{ background: "transparent", color: theme.text, border: `1px solid ${theme.border}`, padding: "14px 18px", borderRadius: 999, fontFamily: BODY_FONT, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>Open inquiry form</button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes popUp { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
    </div>
  );
}

function InquiryModal({ car, onClose }) {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  if (!car) return null;

  const handleSubmit = event => {
    event.preventDefault();
    const text = [
      `Hello ${BUSINESS_NAME},`,
      `I want to inquire about ${car.name}.`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      budget ? `Budget: ${budget}` : null,
      message ? `Message: ${message}` : null,
      `Location: ${BUSINESS_LOCATION}`,
    ].filter(Boolean).join("\n");
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 260, background: "rgba(0,0,0,0.76)", backdropFilter: "blur(18px)", display: "grid", placeItems: "center", padding: 20 }} onClick={onClose}>
      <form onSubmit={handleSubmit} onClick={e => e.stopPropagation()} style={{ width: "min(100%, 620px)", background: theme.card, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: 28, padding: 24, boxShadow: "0 30px 100px rgba(0,0,0,0.45)", animation: "popUp 0.3s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "start", marginBottom: 18 }}>
          <div>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: 4, fontFamily: BODY_FONT, textTransform: "uppercase" }}>Inquiry form</div>
            <h3 style={{ fontFamily: HEADING_FONT, marginTop: 8, fontSize: 24 }}>{car.name}</h3>
          </div>
          <button type="button" onClick={onClose} style={{ border: `1px solid ${theme.border}`, background: "transparent", color: theme.text, width: 40, height: 40, borderRadius: "50%", cursor: "pointer" }}>×</button>
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          {[
            [name, setName, "Your name"],
            [phone, setPhone, "Phone number"],
            [budget, setBudget, "Budget / payment plan"],
          ].map(([value, setter, placeholder]) => (
            <input key={placeholder} value={value} onChange={e => setter(e.target.value)} placeholder={placeholder} required={placeholder === "Your name" || placeholder === "Phone number"} style={{ borderRadius: 16, border: `1px solid ${theme.border}`, background: themeModeBackground(theme), color: theme.text, padding: "14px 16px", fontSize: 14, fontFamily: BODY_FONT }} />
          ))}
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Extra notes" rows={4} style={{ borderRadius: 16, border: `1px solid ${theme.border}`, background: themeModeBackground(theme), color: theme.text, padding: "14px 16px", fontSize: 14, fontFamily: BODY_FONT, resize: "vertical" }} />
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 18, flexWrap: "wrap" }}>
          <button type="button" onClick={onClose} style={{ background: "transparent", color: theme.text, border: `1px solid ${theme.border}`, padding: "14px 18px", borderRadius: 999, fontFamily: BODY_FONT, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>Cancel</button>
          <button type="submit" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, color: "#000", border: "none", padding: "14px 18px", borderRadius: 999, fontFamily: BODY_FONT, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}>Send on WhatsApp</button>
        </div>
      </form>
    </div>
  );
}

const cars = [
  {
    name: "Mercedes-Benz GLE 450",
    year: "2021",
    trans: "Automatic",
    condition: "Foreign Used",
    price: "₦95,000,000",
    img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    tag: "SOLD OUT",
  },
  {
    name: "BMW X5 xDrive40i",
    year: "2020",
    trans: "Automatic",
    condition: "Foreign Used",
    price: "₦78,000,000",
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    tag: "AVAILABLE",
  },
  {
    name: "Lexus LX 570",
    year: "2022",
    trans: "Automatic",
    condition: "Brand New",
    price: "₦145,000,000",
    img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    tag: "NEW",
  },
  {
    name: "Range Rover Vogue SE",
    year: "2021",
    trans: "Automatic",
    condition: "Foreign Used",
    price: "₦120,000,000",
    img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
    tag: "AVAILABLE",
  },
  {
    name: "Porsche Cayenne GTS",
    year: "2023",
    trans: "Automatic",
    condition: "Brand New",
    price: "₦180,000,000",
    img: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80",
    tag: "NEW",
  },
  {
    name: "Bentley Bentayga V8",
    year: "2020",
    trans: "Automatic",
    condition: "Foreign Used",
    price: "₦260,000,000",
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    tag: "RARE FIND",
  },
];

const services = [
  { icon: "◆", title: "Luxury Vehicle Sales", desc: "Premium selection of the world's finest automobiles, curated for discerning buyers." },
  { icon: "✦", title: "Foreign Used Cars", desc: "Thoroughly inspected foreign-used vehicles with verified history and condition reports." },
  { icon: "◈", title: "Brand New Cars", desc: "Factory-fresh vehicles delivered directly from authorised channels worldwide." },
  { icon: "⬡", title: "Car Sourcing", desc: "We locate your dream car anywhere in the world and handle the import process." },
  { icon: "◉", title: "Vehicle Inspection", desc: "Comprehensive pre-purchase inspection and verification by certified engineers." },
];

const reasons = [
  { num: "01", title: "Verified Vehicles Only", desc: "Every car undergoes thorough documentation and condition verification before listing." },
  { num: "02", title: "Transparent Pricing", desc: "No hidden fees. What you see is exactly what you pay — honest deals always." },
  { num: "03", title: "Fast & Reliable Delivery", desc: "Seamless logistics from sourcing to your doorstep across Nigeria." },
  { num: "04", title: "Trusted in Abuja", desc: "Established dealership with a proven track record and hundreds of satisfied clients." },
];

function Nav({ scrolled, themeMode, onToggleTheme }) {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "Cars", "Services", "About", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? theme.nav : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${theme.border}` : "none",
      transition: "all 0.4s ease",
      padding: "0 4vw",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 76 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, border: `2px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(45deg)" }}>
            <div style={{ transform: "rotate(-45deg)", fontSize: 13, fontWeight: 800, color: GOLD, letterSpacing: 0, fontFamily: "Georgia, serif" }}>D</div>
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 700, letterSpacing: 3, fontFamily: "Georgia, serif", lineHeight: 1 }}>DAYVE</div>
            <div style={{ color: GOLD, fontSize: 9, letterSpacing: 5, fontFamily: "'Courier New', monospace" }}>AUTOS</div>
          </div>
        </div>
        {/* Desktop links */}
        <div style={{ display: "flex", gap: 40, alignItems: "center" }} className="desk-nav">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: theme.muted, fontSize: 11, letterSpacing: 3,
              textDecoration: "none", fontFamily: BODY_FONT, textTransform: "uppercase",
              transition: "color 0.3s",
            }}
              onMouseEnter={e => e.target.style.color = GOLD}
              onMouseLeave={e => e.target.style.color = theme.muted}
            >{l}</a>
          ))}
          <ThemeToggle themeMode={themeMode} onToggle={onToggleTheme} />
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            color: "#000", padding: "10px 24px", fontSize: 10, letterSpacing: 3,
            fontFamily: BODY_FONT, textTransform: "uppercase", textDecoration: "none",
            fontWeight: 700, transition: "opacity 0.3s",
          }}
            onMouseEnter={e => e.target.style.opacity = "0.85"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >WhatsApp</a>
        </div>
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", display: "none", padding: 8 }} className="hamburger">
          <div style={{ width: 24, height: 2, background: GOLD, margin: "5px 0", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: GOLD, margin: "5px 0", opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
          <div style={{ width: 24, height: 2, background: GOLD, margin: "5px 0", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "rgba(10,10,10,0.98)", padding: "20px 4vw 30px", borderTop: `1px solid rgba(201,169,110,0.2)` }}>
          <div style={{ marginBottom: 14 }}>
            <ThemeToggle themeMode={themeMode} onToggle={onToggleTheme} />
          </div>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
              display: "block", color: theme.text, padding: "14px 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)", textDecoration: "none",
              fontSize: 11, letterSpacing: 3, fontFamily: BODY_FONT, textTransform: "uppercase",
            }}>{l}</a>
          ))}
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{
            display: "block", marginTop: 20, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            color: "#000", padding: "14px 0", textAlign: "center", fontSize: 11, letterSpacing: 3,
            fontFamily: BODY_FONT, textTransform: "uppercase", textDecoration: "none", fontWeight: 700,
          }}>Contact on WhatsApp</a>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) { .desk-nav { display: none !important; } .hamburger { display: block !important; } }
      `}</style>
    </nav>
  );
}

function Hero() {
  const theme = useTheme();
  const heroTextColor = theme.name === "Light" ? "#FFFDF6" : theme.text;
  const heroMutedColor = theme.name === "Light" ? "rgba(255,250,240,0.86)" : theme.muted;
  const heroBorderColor = theme.name === "Light" ? "rgba(255,250,240,0.72)" : theme.border;
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  return (
    <section id="home" className="hero-section" style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden", display: "flex", alignItems: "center" }}>
      {/* BG image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85)",
        backgroundSize: "cover", backgroundPosition: "center 30%",
        transform: loaded ? "scale(1.04)" : "scale(1.12)",
        transition: "transform 1.8s cubic-bezier(0.25,0.46,0.45,0.94)",
        filter: "brightness(0.38)",
      }} />
      {/* Gold gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(110deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.5) 60%, rgba(201,169,110,0.08) 100%)`,
      }} />
      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: `linear-gradient(to top, ${DARK}, transparent)` }} />

      <div style={{ position: "relative", zIndex: 2, padding: "0 6vw", maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        {/* Eyebrow */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14, marginBottom: 32,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.9s ease 0.2s",
        }}>
          <div style={{ width: 40, height: 1, background: GOLD }} />
          <span style={{ color: GOLD, fontSize: 10, letterSpacing: 5, fontFamily: BODY_FONT, textTransform: "uppercase" }}>Minna's Premium Dealership</span>
        </div>

        <h1 style={{
          fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 900, lineHeight: 1.05,
          fontFamily: HEADING_FONT, color: heroTextColor,
          maxWidth: 780, marginBottom: 28,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s ease 0.4s",
        }}>
          Drive Into a New<br />
          <span style={{ color: GOLD }}>Level of Luxury</span>
        </h1>

        <p style={{
          color: heroMutedColor, fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
          maxWidth: 500, marginBottom: 50, lineHeight: 1.8,
          fontFamily: BODY_FONT,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease 0.6s",
        }}>
          Luxury vehicles. Trusted sourcing.<br />Premium experience — every time.
        </p>

        <div className="hero-actions" style={{
          display: "flex", gap: 20, flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease 0.8s",
        }}>
          <a href="#cars" style={{
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            color: "#000", padding: "18px 44px", fontSize: 11, letterSpacing: 4,
            fontFamily: BODY_FONT, textTransform: "uppercase",
            textDecoration: "none", fontWeight: 800,
            boxShadow: `0 0 40px rgba(201,169,110,0.25)`,
            transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 50px rgba(201,169,110,0.4)`; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 0 40px rgba(201,169,110,0.25)`; }}
          >View Our Cars</a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{
            background: "transparent", color: heroTextColor,
            padding: "18px 44px", fontSize: 11, letterSpacing: 4,
            fontFamily: BODY_FONT, textTransform: "uppercase",
            textDecoration: "none", fontWeight: 700,
            border: `1px solid ${heroBorderColor}`,
            transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = GOLD; e.target.style.color = GOLD; }}
            onMouseLeave={e => { e.target.style.borderColor = heroBorderColor; e.target.style.color = heroTextColor; }}
          >Contact on WhatsApp</a>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: 50, marginTop: 80, flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transition: "all 1s ease 1.1s",
        }}>
          {[["500+", "Cars Sold"], ["10+", "Years Experience"], ["100%", "Verified Stock"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ color: GOLD, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, fontFamily: "Georgia, serif" }}>{n}</div>
              <div style={{ color: theme.subtle, fontSize: 10, letterSpacing: 3, fontFamily: BODY_FONT }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.5s",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      }}>
        <div style={{ color: theme.subtle, fontSize: 9, letterSpacing: 4, fontFamily: BODY_FONT }}>SCROLL</div>
        <div style={{
          width: 1, height: 50, background: `linear-gradient(to bottom, ${GOLD}, transparent)`,
          animation: "scrollPulse 2s ease-in-out infinite",
        }} />
      </div>
      <style>{`@keyframes scrollPulse { 0%,100%{opacity:0.4;transform:scaleY(0.8)} 50%{opacity:1;transform:scaleY(1)} }`}</style>
    </section>
  );
}

function CarCard({ car, i, onViewDetails }) {
  const theme = useTheme();
  const [ref, inView] = useInView(0.1);
  const [hov, setHov] = useState(false);
  const tagColors = { "AVAILABLE": "#2A7A4B", "NEW": "#1A4A7A", "SOLD OUT": "#5A1A1A", "RARE FIND": "#5A3A1A" };
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
      transition: `all 0.7s ease ${i * 0.1}s`,
    }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => onViewDetails(car)}
        style={{
          background: theme.card, border: `1px solid ${hov ? GOLD : theme.border}`,
          overflow: "hidden", cursor: "pointer",
          transform: hov ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hov ? `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.2)` : "0 4px 30px rgba(0,0,0,0.3)",
          transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
          <img src={car.img} alt={car.name} style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hov ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
            display: "block",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: hov ? "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7))" : "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5))",
            transition: "all 0.4s",
          }} />
          {/* Tag */}
          <div style={{
            position: "absolute", top: 16, right: 16,
            background: tagColors[car.tag] || "#333",
            color: "#fff", fontSize: 9, letterSpacing: 3,
            padding: "5px 12px", fontFamily: BODY_FONT,
          }}>{car.tag}</div>
        </div>
        {/* Content */}
        <div style={{ padding: "24px 28px 28px" }}>
          <div style={{ color: theme.subtle, fontSize: 9, letterSpacing: 3, fontFamily: BODY_FONT, marginBottom: 10 }}>
            {car.year} • {car.trans} • {car.condition}
          </div>
          <h3 style={{ color: theme.text, fontSize: "1.1rem", fontWeight: 700, fontFamily: HEADING_FONT, marginBottom: 16, lineHeight: 1.3 }}>{car.name}</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: GOLD, fontSize: "1.1rem", fontWeight: 800, fontFamily: HEADING_FONT }}>{car.price}</span>
            <button type="button" onClick={(e) => { e.stopPropagation(); onViewDetails(car); }} style={{
              background: "transparent", border: `1px solid ${hov ? GOLD : theme.border}`,
              color: hov ? GOLD : theme.muted,
              padding: "10px 20px", fontSize: 9, letterSpacing: 3,
              fontFamily: BODY_FONT, textTransform: "uppercase", cursor: "pointer",
              transition: "all 0.3s",
            }}>View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ s, i }) {
  const theme = useTheme();
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s, background 0.3s`,
      background: theme.cardAlt, padding: "32px 28px",
      border: `1px solid ${theme.border}`,
      gridColumn: i === 4 ? "1 / -1" : "auto",
      cursor: "default",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(201,169,110,0.06)"}
      onMouseLeave={e => e.currentTarget.style.background = theme.cardAlt}
    >
      <div style={{ color: GOLD, fontSize: 22, marginBottom: 16, fontFamily: HEADING_FONT }}>{s.icon}</div>
      <div style={{ color: theme.text, fontSize: "0.95rem", fontWeight: 700, fontFamily: HEADING_FONT, marginBottom: 10 }}>{s.title}</div>
      <div style={{ color: theme.muted, fontSize: "0.82rem", lineHeight: 1.7, fontFamily: BODY_FONT }}>{s.desc}</div>
    </div>
  );
}

function ReasonCard({ r, i }) {
  const theme = useTheme();
  const [ref, inView] = useInView(0.1);
  return (
    <div key={r.num} ref={ref} style={{
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.7s ease ${i * 0.15}s`,
      background: theme.card, border: `1px solid ${theme.border}`, padding: "40px 32px",
      position: "relative", overflow: "hidden",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
      onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}
    >
      <div style={{ color: "rgba(201,169,110,0.15)", fontSize: "4rem", fontWeight: 900, fontFamily: HEADING_FONT, position: "absolute", top: 10, right: 20, lineHeight: 1 }}>{r.num}</div>
      <div style={{ color: GOLD, fontSize: 28, marginBottom: 20, fontFamily: HEADING_FONT }}>◆</div>
      <div style={{ color: theme.text, fontSize: "1.05rem", fontWeight: 700, fontFamily: HEADING_FONT, marginBottom: 14 }}>{r.title}</div>
      <div style={{ color: theme.muted, fontSize: "0.85rem", lineHeight: 1.8, fontFamily: BODY_FONT }}>{r.desc}</div>
    </div>
  );
}

function CtaContent() {
  const theme = useTheme();
  const [ref, inView] = useInView();
  return (
    <div ref={ref}>
      <div style={{
        color: GOLD, fontSize: 10, letterSpacing: 6, fontFamily: BODY_FONT,
        marginBottom: 24, opacity: inView ? 1 : 0, transition: "all 0.7s ease",
      }}>LIMITED STOCK AVAILABLE</div>
      <h2 style={{
        color: theme.text, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900,
        fontFamily: HEADING_FONT, lineHeight: 1.2, marginBottom: 20,
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease 0.1s",
      }}>Ready to Drive Your <span style={{ color: GOLD }}>Dream Car?</span><br />Let's Make It Happen.</h2>
      <p style={{
        color: theme.muted, marginBottom: 40, fontSize: "1rem",
        fontFamily: BODY_FONT, lineHeight: 1.8,
        opacity: inView ? 1 : 0, transition: "all 0.8s ease 0.25s",
      }}>Get in touch today and let our team guide you to your perfect vehicle.</p>
      <a href="https://wa.me/+2349151369309" target="_blank" rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          background: "#25D366", color: "#fff",
          padding: "20px 50px", fontSize: 12, letterSpacing: 3,
          fontFamily: "'Courier New', monospace", textTransform: "uppercase",
          textDecoration: "none", fontWeight: 700,
          animation: "whatsappPulse 2.5s infinite",
          opacity: inView ? 1 : 0, transition: "opacity 0.8s ease 0.4s",
          boxShadow: "0 0 40px rgba(37,211,102,0.2)",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.083 1.512 5.797L.057 23.882a.5.5 0 00.611.61l6.162-1.566A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.843 9.843 0 01-5.031-1.382l-.36-.214-3.731.949.988-3.637-.235-.374A9.845 9.845 0 012.118 12C2.118 6.54 6.54 2.118 12 2.118c5.46 0 9.882 4.422 9.882 9.882 0 5.46-4.422 9.882-9.882 9.882z"/></svg>
        Chat Us on WhatsApp
      </a>
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub, center }) {
  const theme = useTheme();
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ textAlign: center ? "center" : "left", marginBottom: 70 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 14, marginBottom: 20,
        justifyContent: center ? "center" : "flex-start",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.7s ease",
      }}>
        <div style={{ width: 30, height: 1, background: GOLD }} />
        <span style={{ color: GOLD, fontSize: 10, letterSpacing: 5, fontFamily: BODY_FONT, textTransform: "uppercase" }}>{eyebrow}</span>
        <div style={{ width: 30, height: 1, background: GOLD }} />
      </div>
      <h2 style={{
        color: theme.text, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900,
        fontFamily: HEADING_FONT, lineHeight: 1.1, marginBottom: 18,
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease 0.15s",
      }}>{title}</h2>
      {sub && <p style={{
        color: theme.muted, fontSize: "1rem", fontFamily: BODY_FONT,
        maxWidth: 560, margin: center ? "0 auto" : 0, lineHeight: 1.8,
        opacity: inView ? 1 : 0, transition: "all 0.8s ease 0.3s",
      }}>{sub}</p>}
    </div>
  );
}

export default function DayveAutos() {
  const [scrolled, setScrolled] = useState(false);
  const [themeMode, setThemeMode] = useState("dark");
  const [searchQuery, setSearchQuery] = useState("");
  const [conditionFilter, setConditionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeCar, setActiveCar] = useState(null);
  const [inquiryCar, setInquiryCar] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const theme = THEMES[themeMode];

  const filteredCars = cars.filter(car => {
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery = !query || [car.name, car.year, car.condition, car.price, car.tag].join(" ").toLowerCase().includes(query);
    const matchesCondition = conditionFilter === "All" || car.condition === conditionFilter;
    const matchesStatus = statusFilter === "All" || car.tag === statusFilter;
    return matchesQuery && matchesCondition && matchesStatus;
  });

  return (
    <ThemeContext.Provider value={theme}>
      <div data-theme={themeMode} style={{ background: theme.page, color: theme.text, fontFamily: BODY_FONT, overflowX: "hidden" }}>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body { background: ${theme.page}; color: ${theme.text}; font-family: ${BODY_FONT}; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: ${theme.page}; }
          ::-webkit-scrollbar-thumb { background: ${GOLD}; }
          [data-theme="light"]::selection { background: rgba(201,169,110,0.28); color: #121212; }
          @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          @keyframes whatsappPulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.4)} 50%{box-shadow:0 0 0 12px rgba(37,211,102,0)} }

          @media (max-width: 1024px) {
            .inventory-filter-grid { grid-template-columns: 1fr 1fr !important; }
            .inventory-filter-grid > :first-child { grid-column: 1 / -1; }
            .services-grid, .contact-grid, .modal-two-column { grid-template-columns: 1fr !important; }
          }

          @media (max-width: 768px) {
            .hero-section { min-height: 520px !important; }
            .hero-actions { gap: 12px !important; }
            .hero-actions a { width: 100%; text-align: center; }
            .inventory-filter-grid { grid-template-columns: 1fr !important; }
            .cars-grid { grid-template-columns: 1fr !important; }
            .reasons-grid { grid-template-columns: 1fr !important; }
            .footer-top { justify-content: center !important; text-align: center; }
            .footer-bottom { justify-content: center !important; text-align: center; }
            .floating-whatsapp {
              width: 52px !important;
              height: 52px !important;
              right: 18px !important;
              bottom: 18px !important;
            }
            .floating-whatsapp svg { width: 24px !important; height: 24px !important; }
          }

          @media (max-width: 360px) {
            .hero-section { min-height: 480px !important; }
            .hero-section h1 { font-size: clamp(2rem, 10vw, 2.5rem) !important; }
            .hero-section p { font-size: 0.93rem !important; line-height: 1.6 !important; }
            #cars, #services, #about, #contact { padding: 82px 5vw !important; }
            .inventory-filter-grid { gap: 10px !important; }
            .inventory-filter-grid input,
            .inventory-filter-grid select { padding: 12px 13px !important; font-size: 13px !important; }
            .cars-grid { gap: 16px !important; }
            .cars-grid > div h3 { font-size: 1rem !important; }
            .modal-two-column { padding: 14px !important; gap: 14px !important; }
            .footer-top, .footer-bottom { gap: 10px !important; }
            .floating-whatsapp {
              width: 48px !important;
              height: 48px !important;
              right: 14px !important;
              bottom: 14px !important;
            }
            .floating-whatsapp svg { width: 20px !important; height: 20px !important; }
          }
        `}</style>
        <Nav scrolled={scrolled} themeMode={themeMode} onToggleTheme={() => setThemeMode(mode => (mode === "dark" ? "light" : "dark"))} />
        <Hero />

        <section id="cars" style={{ background: theme.sectionAlt, padding: "120px 6vw" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <SectionHeader eyebrow="Our Inventory" title={<>Our Featured <span style={{ color: GOLD }}>Collection</span></>} sub="Use search and filters to narrow the stock, then open a car for more details or inquiry." center />
            <div className="inventory-controls" style={{ marginBottom: 28 }}>
              <InventoryFilters query={searchQuery} setQuery={setSearchQuery} condition={conditionFilter} setCondition={setConditionFilter} status={statusFilter} setStatus={setStatusFilter} />
            </div>
            {filteredCars.length ? (
              <div className="cars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 28 }}>
                {filteredCars.map((car, i) => <CarCard key={car.name} car={car} i={i} onViewDetails={setActiveCar} />)}
              </div>
            ) : (
              <div style={{ border: `1px solid ${theme.border}`, background: theme.card, borderRadius: 24, padding: 32, color: theme.muted, textAlign: "center" }}>
                No cars match your current search. Try widening the filters or ask us on WhatsApp.
              </div>
            )}
            <div style={{ textAlign: "center", marginTop: 60 }}>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-block", background: "transparent",
                border: `1px solid ${GOLD}`, color: GOLD,
                padding: "18px 50px", fontSize: 11, letterSpacing: 4,
                fontFamily: BODY_FONT, textTransform: "uppercase",
                textDecoration: "none", transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.target.style.background = GOLD; e.target.style.color = "#000"; }}
                onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = GOLD; }}
              >Enquire About More Vehicles</a>
            </div>
          </div>
        </section>

        <section id="services" style={{ background: theme.section, padding: "120px 6vw" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <div>
                <SectionHeader eyebrow="What We Offer" title={<>Premium Services<br /><span style={{ color: GOLD }}>Tailored For You</span></>} sub="From sourcing to delivery, we handle every step of your luxury car journey with precision and care." />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                {services.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
              </div>
            </div>
          </div>
          <style>{`@media(max-width:768px){.services-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        <section id="about" style={{ background: theme.sectionAlt, padding: "120px 6vw", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -100, top: "50%", transform: "translateY(-50%)", width: 500, height: 500, borderRadius: "50%", border: `1px solid ${theme.border}`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: -50, top: "50%", transform: "translateY(-50%)", width: 300, height: 300, borderRadius: "50%", border: `1px solid ${theme.border}`, pointerEvents: "none" }} />
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <SectionHeader eyebrow="Our Promise" title={<>Why Choose <span style={{ color: GOLD }}>Dayve Autos</span></>} sub="We've built our reputation on trust, quality, and an uncompromising commitment to your satisfaction." center />
            <div className="reasons-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2 }}>
              {reasons.map((r, i) => <ReasonCard key={r.num} r={r} i={i} />)}
            </div>
          </div>
        </section>

        <section style={{ position: "relative", overflow: "hidden", backgroundImage: "url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80)", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "scroll" }}>
          <div style={{ position: "absolute", inset: 0, background: themeMode === "dark" ? "rgba(10,10,10,0.88)" : "rgba(245,239,230,0.84)" }} />
          <div style={{ position: "relative", zIndex: 2, padding: "100px 6vw", textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
            <CtaContent />
          </div>
        </section>

        <section id="contact" style={{ background: theme.section, padding: "100px 6vw" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
              <div>
                <SectionHeader eyebrow="Get In Touch" title={<>Contact <span style={{ color: GOLD }}>Dayve Autos</span></>} sub="We’re ready to help you find the right vehicle, arrange inspection, or start a WhatsApp inquiry." />
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {[
                    { label: "Location", val: BUSINESS_LOCATION, icon: "📍" },
                    { label: "Phone", val: BUSINESS_PHONE, icon: "📞" },
                    { label: "WhatsApp", val: BUSINESS_PHONE, icon: "💬", link: WHATSAPP_LINK },
                  ].map(c => (
                    <div key={c.label} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                      <div style={{ fontSize: 20, marginTop: 2 }}>{c.icon}</div>
                      <div>
                        <div style={{ color: GOLD, fontSize: 9, letterSpacing: 3, fontFamily: BODY_FONT, marginBottom: 4 }}>{c.label}</div>
                        {c.link ? <a href={c.link} target="_blank" rel="noopener noreferrer" style={{ color: theme.text, fontSize: "0.95rem", fontFamily: BODY_FONT, textDecoration: "none" }} onMouseEnter={e => e.target.style.color = GOLD} onMouseLeave={e => e.target.style.color = theme.text}>{c.val}</a> : <div style={{ color: theme.text, fontSize: "0.95rem", fontFamily: BODY_FONT }}>{c.val}</div>}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 50 }}>
                  <div style={{ color: GOLD, fontSize: 9, letterSpacing: 4, fontFamily: BODY_FONT, marginBottom: 20 }}>FOLLOW US</div>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {[
                      { name: "Instagram", handle: "@dayveautos", link: "https://instagram.com/dayveautos", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
                      { name: "TikTok", handle: "@dayveautos", link: "https://tiktok.com/@dayveautos", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
                      { name: "Twitter/X", handle: "@dayveautos", link: "https://twitter.com/dayveautos", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                    ].map(s => (
                      <a key={s.name} href={s.link} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, background: theme.card, border: `1px solid ${theme.border}`, padding: "12px 18px", textDecoration: "none", color: theme.muted, fontSize: "0.8rem", fontFamily: BODY_FONT, transition: "all 0.3s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }} onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.muted; }}>
                        {s.icon} {s.handle}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ background: theme.cardAlt, border: `1px solid ${theme.border}`, borderRadius: 28, overflow: "hidden", minHeight: 520, position: "relative" }}>
                <iframe title="Dayve Autos location" src="https://www.google.com/maps?q=FUT%20Minna%2C%20Minna%2C%20Nigeria&output=embed" width="100%" height="360" style={{ border: 0, display: "block" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <div style={{ padding: 28 }}>
                  <div style={{ color: GOLD, fontSize: 10, letterSpacing: 4, fontFamily: BODY_FONT, textTransform: "uppercase", marginBottom: 10 }}>Find Us In</div>
                  <div style={{ fontFamily: HEADING_FONT, fontSize: 26, color: theme.text, marginBottom: 10 }}>FUT Minna, Minna</div>
                  <div style={{ color: theme.muted, lineHeight: 1.8, fontFamily: BODY_FONT, marginBottom: 20 }}>Minna, Niger State, Nigeria. Use the map to get directions or tap the WhatsApp button for quick guidance and stock availability.</div>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "#fff", padding: "16px 28px", fontSize: 11, letterSpacing: 3, fontFamily: BODY_FONT, textTransform: "uppercase", textDecoration: "none", fontWeight: 700, borderRadius: 999 }}>Get Directions via WhatsApp</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer style={{ background: themeMode === "dark" ? "#070707" : "#F3ECE1", borderTop: `1px solid ${theme.border}`, padding: "60px 6vw 40px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div className="footer-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 30, marginBottom: 50 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, border: `2px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(45deg)" }}>
                  <div style={{ transform: "rotate(-45deg)", fontSize: 16, fontWeight: 800, color: GOLD, fontFamily: HEADING_FONT }}>D</div>
                </div>
                <div>
                  <div style={{ color: theme.text, fontSize: 22, fontWeight: 700, letterSpacing: 4, fontFamily: HEADING_FONT, lineHeight: 1 }}>{BUSINESS_NAME.toUpperCase()}</div>
                  <div style={{ color: GOLD, fontSize: 10, letterSpacing: 6, fontFamily: BODY_FONT }}>AUTOS</div>
                </div>
              </div>
              <div style={{ color: theme.muted, fontSize: "0.9rem", fontFamily: BODY_FONT, fontStyle: "italic" }}>"Quality cars. Fair prices."</div>
              <div style={{ display: "flex", gap: 12 }}>
                {[
                  { link: "https://instagram.com/dayveautos", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
                  { link: "https://tiktok.com/@dayveautos", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
                  { link: "https://twitter.com/dayveautos", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                ].map((s, i) => (
                  <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" style={{ width: 42, height: 42, border: `1px solid ${theme.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: theme.muted, textDecoration: "none", transition: "all 0.3s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }} onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.muted; }}>{s.icon}</a>
                ))}
              </div>
            </div>
            <div className="footer-bottom" style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 30, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div style={{ color: theme.subtle, fontSize: "0.78rem", fontFamily: BODY_FONT, letterSpacing: 1 }}>
                © 2026 Dayve Autos. All rights reserved.
              </div>
              <div style={{ color: theme.subtle, fontSize: "0.78rem", fontFamily: BODY_FONT, letterSpacing: 1 }}>
                {BUSINESS_LOCATION} • {BUSINESS_PHONE}
              </div>
            </div>
          </div>
        </footer>

        <a className="floating-whatsapp" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: 32, right: 32, zIndex: 999, width: 60, height: 60, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 30px rgba(37,211,102,0.4)", animation: "whatsappPulse 2.5s infinite", textDecoration: "none", transition: "transform 0.3s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} title="Chat on WhatsApp">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.549 4.083 1.512 5.797L.057 23.882a.5.5 0 00.611.61l6.162-1.566A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.843 9.843 0 01-5.031-1.382l-.36-.214-3.731.949.988-3.637-.235-.374A9.845 9.845 0 012.118 12C2.118 6.54 6.54 2.118 12 2.118c5.46 0 9.882 4.422 9.882 9.882 0 5.46-4.422 9.882-9.882 9.882z"/></svg>
        </a>

        <CarDetailModal car={activeCar} onClose={() => setActiveCar(null)} onOpenInquiry={car => { setInquiryCar(car); setActiveCar(null); }} />
        <InquiryModal car={inquiryCar} onClose={() => setInquiryCar(null)} />
      </div>
    </ThemeContext.Provider>
  );
}
