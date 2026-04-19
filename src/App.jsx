import React, { useMemo, useState } from "react";

const inputStyle = {
  border: "1px solid #d1d5db",
  padding: 14,
  borderRadius: 10,
  fontSize: 14,
  width: "100%",
  background: "#ffffff",
  color: "#111827",
  outline: "none",
};

const sectionWidth = {
  maxWidth: 1200,
  margin: "0 auto",
  paddingLeft: 24,
  paddingRight: 24,
};

export default function App() {
  const [view, setView] = useState("landing");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    propertyType: "",
    postcode: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [leads, setLeads] = useState([
    {
      name: "Emily Carter",
      type: "Valuation Request",
      property: "3-bed semi-detached",
      location: "Walsall",
      status: "New Lead",
      time: "10 mins ago",
      phone: "07911 245678",
      email: "emily.carter@emaildemo.co.uk",
      notes: "Looking to sell within 6 weeks.",
    },
    {
      name: "David Hughes",
      type: "Home Valuation",
      property: "2-bed flat",
      location: "Great Barr",
      status: "Follow Up",
      time: "Today, 11:15 AM",
      phone: "07888 351442",
      email: "d.hughes@emaildemo.co.uk",
      notes: "Requested evening callback.",
    },
    {
      name: "Sophie Malik",
      type: "Seller Enquiry",
      property: "4-bed detached",
      location: "Aldridge",
      status: "Booked",
      time: "Tomorrow, 2:00 PM",
      phone: "07731 992115",
      email: "sophie.malik@emaildemo.co.uk",
      notes: "Valuation booked for tomorrow afternoon.",
    },
    {
      name: "Hannah Lewis",
      type: "Valuation Request",
      property: "Bungalow",
      location: "Pelsall",
      status: "Follow Up",
      time: "Yesterday, 4:20 PM",
      phone: "07555 803414",
      email: "h.lewis@emaildemo.co.uk",
      notes: "Thinking of selling in the next 3 months.",
    },
  ]);

  const stats = useMemo(() => {
    const newLeads = leads.filter((lead) => lead.status === "New Lead").length;
    const followUps = leads.filter((lead) => lead.status === "Follow Up").length;
    const booked = leads.filter((lead) => lead.status === "Booked").length;

    return [
      { label: "New Leads", value: String(newLeads) },
      { label: "Follow Ups", value: String(followUps) },
      { label: "Booked", value: String(booked) },
      { label: "Total Leads", value: String(leads.length) },
    ];
  }, [leads]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.fullName || !form.phone || !form.email || !form.postcode) {
      return;
    }

    const newLead = {
      name: form.fullName,
      type: "Valuation Request",
      property: form.propertyType || "Property details pending",
      location: form.postcode,
      status: "New Lead",
      time: "Just now",
      phone: form.phone,
      email: form.email,
      notes: form.notes || "New valuation request submitted from website.",
    };

    setLeads((prev) => [newLead, ...prev]);
    setSubmitted(true);
    setView("dashboard");
    setForm({
      fullName: "",
      phone: "",
      email: "",
      propertyType: "",
      postcode: "",
      notes: "",
    });
  }

  function statusPill(status) {
    if (status === "Booked") {
      return {
        background: "#dcfce7",
        color: "#166534",
      };
    }

    if (status === "Follow Up") {
      return {
        background: "#fef3c7",
        color: "#92400e",
      };
    }

    return {
      background: "#fee2e2",
      color: "#b91c1c",
    };
  }

  if (view === "dashboard") {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#111827", fontFamily: "Arial, sans-serif" }}>
        <header
          style={{
            background: "#0f0f10",
            color: "#ffffff",
            borderBottom: "3px solid #dc2626",
            position: "sticky",
            top: 0,
            zIndex: 20,
          }}
        >
          <div
            style={{
              ...sectionWidth,
              paddingTop: 18,
              paddingBottom: 18,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  background: "#dc2626",
                  color: "#ffffff",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                  boxShadow: "0 8px 20px rgba(220,38,38,0.3)",
                }}
              >
                KE
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 20 }}>Kingsbridge Estates</div>
                <div style={{ fontSize: 12, color: "#d1d5db", letterSpacing: 0.5 }}>PRIVATE VALUATION DASHBOARD</div>
              </div>
            </div>

            <button
              onClick={() => setView("landing")}
              style={{
                background: "#ffffff",
                color: "#111111",
                padding: "11px 16px",
                borderRadius: 10,
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Back to Website
            </button>
          </div>
        </header>

        <main style={{ ...sectionWidth, paddingTop: 36, paddingBottom: 48 }}>
          <div style={{ marginBottom: 28 }}>
            <div style={{ color: "#dc2626", fontWeight: 700, fontSize: 13, letterSpacing: 1.2, marginBottom: 8 }}>
              STAFF-ONLY AREA
            </div>
            <h1 style={{ fontSize: 38, margin: "0 0 10px 0" }}>Valuation Leads</h1>
            <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.7, maxWidth: 820, margin: 0 }}>
              This private dashboard shows new valuation requests, seller enquiries, and follow-up activity. It is
              designed for the estate agent and their team only.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              marginBottom: 28,
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  padding: 22,
                  boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
                }}
              >
                <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>{stat.label}</div>
                <div style={{ fontSize: 34, fontWeight: 700 }}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            {leads.map((lead) => (
              <div
                key={`${lead.name}-${lead.time}-${lead.email}`}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 18,
                  padding: 22,
                  boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    flexWrap: "wrap",
                    marginBottom: 14,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 21, fontWeight: 700, marginBottom: 4 }}>{lead.name}</div>
                    <div style={{ color: "#64748b", fontSize: 14 }}>
                      {lead.type} • {lead.property} • {lead.location}
                    </div>
                  </div>

                  <div
                    style={{
                      ...statusPill(lead.status),
                      padding: "8px 12px",
                      borderRadius: 999,
                      fontSize: 13,
                      fontWeight: 700,
                      height: "fit-content",
                    }}
                  >
                    {lead.status}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 12,
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e5e7eb",
                      borderRadius: 12,
                      padding: 14,
                    }}
                  >
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>Phone</div>
                    <div style={{ fontWeight: 600 }}>{lead.phone}</div>
                  </div>

                  <div
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e5e7eb",
                      borderRadius: 12,
                      padding: 14,
                    }}
                  >
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>Email</div>
                    <div style={{ fontWeight: 600, wordBreak: "break-word" }}>{lead.email}</div>
                  </div>

                  <div
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e5e7eb",
                      borderRadius: 12,
                      padding: 14,
                    }}
                  >
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>Received</div>
                    <div style={{ fontWeight: 600 }}>{lead.time}</div>
                  </div>
                </div>

                <div
                  style={{
                    background: "#111827",
                    color: "#ffffff",
                    borderRadius: 14,
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 12, color: "#cbd5e1", marginBottom: 8, letterSpacing: 0.8 }}>LEAD NOTES</div>
                  <div style={{ lineHeight: 1.7 }}>{lead.notes}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#111827", fontFamily: "Arial, sans-serif" }}>
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div
          style={{
            ...sectionWidth,
            paddingTop: 16,
            paddingBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 46,
                height: 46,
                background: "#dc2626",
                color: "#ffffff",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                boxShadow: "0 8px 20px rgba(220,38,38,0.2)",
              }}
            >
              KE
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 22, color: "#111111" }}>Kingsbridge Estates</div>
              <div style={{ fontSize: 12, color: "#6b7280", letterSpacing: 0.5 }}>LOCAL PROPERTY EXPERTS</div>
            </div>
          </div>

          <button
            onClick={() => setView("dashboard")}
            style={{
              background: "#111111",
              color: "#ffffff",
              padding: "12px 20px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Dashboard
          </button>
        </div>
      </header>

      <section style={{ position: "relative", color: "#ffffff", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1.03)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.58) 100%)",
          }}
        />
        <div style={{ ...sectionWidth, position: "relative", paddingTop: 110, paddingBottom: 110 }}>
          <div style={{ maxWidth: 700 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(220,38,38,0.18)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#ffffff",
                borderRadius: 999,
                padding: "8px 14px",
                marginBottom: 22,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 0.6,
              }}
            >
              FREE PROPERTY VALUATION
            </div>

            <h1 style={{ fontSize: 58, lineHeight: 1.08, margin: "0 0 20px 0", fontWeight: 800 }}>
              Sell your home with confidence.
            </h1>

            <p style={{ fontSize: 19, lineHeight: 1.8, margin: "0 0 30px 0", color: "#f3f4f6", maxWidth: 620 }}>
              Get a free home valuation from local experts who understand the market, the buyers, and the process of
              moving your property forward professionally.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button
                style={{
                  background: "#dc2626",
                  color: "#ffffff",
                  padding: "14px 24px",
                  borderRadius: 10,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 10px 24px rgba(220,38,38,0.28)",
                }}
              >
                Book Free Valuation
              </button>

              <button
                style={{
                  background: "#ffffff",
                  color: "#111111",
                  padding: "14px 24px",
                  borderRadius: 10,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Call 0121 555 0148
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ ...sectionWidth, paddingTop: 60, paddingBottom: 28 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <div
            style={{
              background: "#111111",
              color: "#ffffff",
              borderRadius: 16,
              padding: 22,
            }}
          >
            <div style={{ fontSize: 13, color: "#d1d5db", marginBottom: 8 }}>Trusted Local Team</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>Walsall & Beyond</div>
          </div>

          <div
            style={{
              background: "#ffffff",
              color: "#111111",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 22,
            }}
          >
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Valuation Enquiries</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>34</div>
          </div>

          <div
            style={{
              background: "#ffffff",
              color: "#111111",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 22,
            }}
          >
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Booked This Week</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>12</div>
          </div>

          <div
            style={{
              background: "#ffffff",
              color: "#111111",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 22,
            }}
          >
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Average Response Time</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>&lt; 30s</div>
          </div>
        </div>
      </section>

      <section
        style={{
          ...sectionWidth,
          paddingTop: 28,
          paddingBottom: 70,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 28,
          alignItems: "start",
        }}
      >
        <div>
          <div style={{ color: "#dc2626", fontWeight: 700, fontSize: 13, letterSpacing: 1.2, marginBottom: 10 }}>
            REQUEST YOUR VALUATION
          </div>
          <h2 style={{ fontSize: 38, margin: "0 0 14px 0" }}>Request your free valuation</h2>
          <p style={{ color: "#64748b", margin: "0 0 24px 0", lineHeight: 1.8 }}>
            Fill in your details below and a member of our team will contact you to discuss your property and the next
            steps.
          </p>

          <form
            style={{
              display: "grid",
              gap: 16,
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 18,
              padding: 24,
              boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
            }}
            onSubmit={handleSubmit}
          >
            <input style={inputStyle} name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full name" />
            <input style={inputStyle} name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" />
            <input style={inputStyle} name="email" value={form.email} onChange={handleChange} placeholder="Email address" />

            <select style={inputStyle} name="propertyType" value={form.propertyType} onChange={handleChange}>
              <option value="">Property type</option>
              <option>Flat</option>
              <option>Terraced house</option>
              <option>3-bed semi-detached</option>
              <option>4-bed detached</option>
              <option>Bungalow</option>
            </select>

            <input style={inputStyle} name="postcode" value={form.postcode} onChange={handleChange} placeholder="Postcode" />

            <textarea
              style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Tell us about your property"
            />

            <button
              style={{
                background: "#111111",
                color: "#ffffff",
                padding: "14px 20px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              Send My Request
            </button>

            {submitted && (
              <div
                style={{
                  border: "1px solid #bbf7d0",
                  background: "#f0fdf4",
                  padding: 14,
                  borderRadius: 10,
                  fontSize: 14,
                  color: "#15803d",
                  lineHeight: 1.6,
                }}
              >
                Your valuation request has been submitted successfully. You have been taken to the private dashboard so
                you can see how the lead appears for the estate agent.
              </div>
            )}
          </form>
        </div>

        <div
          style={{
            background: "#111111",
            color: "#ffffff",
            borderRadius: 20,
            padding: 28,
            boxShadow: "0 14px 32px rgba(15,23,42,0.12)",
          }}
        >
          <div style={{ color: "#fca5a5", fontWeight: 700, fontSize: 13, letterSpacing: 1.1, marginBottom: 10 }}>
            PRIVATE STAFF DASHBOARD
          </div>
          <h3 style={{ fontSize: 32, margin: "0 0 14px 0" }}>See the dashboard in action</h3>
          <p style={{ color: "#e5e7eb", lineHeight: 1.8, marginBottom: 22 }}>
            The dashboard button opens a private staff-only area where the estate agent can view valuation leads,
            contact details, notes, and follow-up status. Homeowners do not see this area — it is only for the estate
            agent and their team.
          </p>

          <div
            style={{
              display: "grid",
              gap: 12,
              marginBottom: 22,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: 14,
              }}
            >
              <div style={{ fontSize: 12, color: "#cbd5e1", marginBottom: 6 }}>Who sees it</div>
              <div style={{ fontWeight: 700 }}>Estate agent staff only</div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: 14,
              }}
            >
              <div style={{ fontSize: 12, color: "#cbd5e1", marginBottom: 6 }}>What it shows</div>
              <div style={{ fontWeight: 700 }}>Valuation requests, notes, and follow-ups</div>
            </div>
          </div>

          <button
            onClick={() => setView("dashboard")}
            style={{
              background: "#dc2626",
              color: "#ffffff",
              padding: "14px 22px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 15,
              boxShadow: "0 10px 24px rgba(220,38,38,0.28)",
            }}
          >
            Open Private Dashboard
          </button>
        </div>
      </section>
    </div>
  );
}