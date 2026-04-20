import React, { useMemo, useRef, useState } from "react";

const pageWidth = {
  maxWidth: 1280,
  margin: "0 auto",
  paddingLeft: 24,
  paddingRight: 24,
};

const fieldStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid #d4d4d8",
  fontSize: 14,
  background: "#ffffff",
  color: "#111827",
  outline: "none",
  boxSizing: "border-box",
};

const navButtonStyle = {
  background: "transparent",
  border: "none",
  padding: 0,
  fontWeight: 700,
  color: "#334155",
  fontSize: 16,
  cursor: "pointer",
};

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          background: "#0f172a",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: 800,
          boxShadow: "0 10px 24px rgba(15,23,42,0.16)",
        }}
      >
        IL
      </div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 0.6, color: "#0f172a" }}>
          IDEAL LETTINGS
        </div>
        <div style={{ fontSize: 12, color: "#475569", letterSpacing: 0.4 }}>
          Property Management Company
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, value, label, subtext }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 20,
        padding: 22,
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 24px rgba(15,23,42,0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: "#f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
          }}
        >
          {icon}
        </div>
        <div>
          <div style={{ fontSize: 34, fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>
            {value}
          </div>
          <div style={{ fontSize: 14, color: "#334155", fontWeight: 700 }}>{label}</div>
        </div>
      </div>
      <div style={{ fontSize: 14, color: "#64748b" }}>{subtext}</div>
    </div>
  );
}

function statusStyle(status) {
  if (status === "Contacted") {
    return {
      background: "#e2e8f0",
      color: "#0f172a",
    };
  }

  if (status === "Application Received") {
    return {
      background: "#dcfce7",
      color: "#166534",
    };
  }

  return {
    background: "#0f172a",
    color: "#ffffff",
  };
}

export default function App() {
  const homeRef = useRef(null);
  const propertiesRef = useRef(null);
  const formRef = useRef(null);
  const contactRef = useRef(null);

  const [view, setView] = useState("landing");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    moveInDate: "",
    employmentStatus: "",
    message: "",
  });

  const [inquiries, setInquiries] = useState([
    {
      name: "Emma Taylor",
      phone: "07855 987654",
      email: "emma.t@example.com",
      property: "3-Bedroom House - £1,300 pcm",
      date: "2 hours ago",
      status: "New",
      notes: "Wants to move in quickly and asked about viewing availability.",
    },
    {
      name: "Michael Jones",
      phone: "07856 987654",
      email: "michael.j@example.com",
      property: "3-Bedroom House - £1,300 pcm",
      date: "5 hours ago",
      status: "New",
      notes: "Interested in the driveway and garage space.",
    },
    {
      name: "Sophie Clarke",
      phone: "07944 723456",
      email: "sophie.c@example.com",
      property: "3-Bedroom House - £1,300 pcm",
      date: "2 days ago",
      status: "Contacted",
      notes: "Requested a callback after work hours.",
    },
    {
      name: "Jason Patel",
      phone: "07855 111222",
      email: "jason.p@example.com",
      property: "3-Bedroom House - £1,300 pcm",
      date: "1 day ago",
      status: "New",
      notes: "Asked if the property is still available from 11th April.",
    },
    {
      name: "Lauren Reed",
      phone: "07855 333444",
      email: "lauren.r@example.com",
      property: "3-Bedroom House - £1,300 pcm",
      date: "3 days ago",
      status: "Contacted",
      notes: "Interested in arranging a viewing for the weekend.",
    },
  ]);

  const stats = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter((i) => i.status === "New").length;
    const contacted = inquiries.filter((i) => i.status === "Contacted").length;
    const applications = inquiries.filter((i) => i.status === "Application Received").length;

    return { total, newCount, contacted, applications };
  }, [inquiries]);

  function scrollToRef(ref) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.fullName || !form.phone || !form.email) {
      return;
    }

    const newInquiry = {
      name: form.fullName,
      phone: form.phone,
      email: form.email,
      property: "3-Bedroom House - £1,300 pcm",
      date: "Just now",
      status: "New",
      notes:
        form.message ||
        `Move-in date: ${form.moveInDate || "Not provided"}. Employment: ${
          form.employmentStatus || "Not provided"
        }.`,
    };

    setInquiries((prev) => [newInquiry, ...prev]);
    setSubmitted(true);
    setForm({
      fullName: "",
      phone: "",
      email: "",
      moveInDate: "",
      employmentStatus: "",
      message: "",
    });

    setTimeout(() => {
      scrollToRef(formRef);
    }, 50);
  }

  if (view === "dashboard") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          color: "#0f172a",
          fontFamily: "Arial, sans-serif",
        }}
      >
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
              ...pageWidth,
              paddingTop: 18,
              paddingBottom: 18,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <Logo />

            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ fontSize: 14, color: "#475569" }}>Private staff dashboard</div>
              <button
                onClick={() => setView("landing")}
                style={{
                  background: "#0f172a",
                  color: "#ffffff",
                  padding: "12px 18px",
                  borderRadius: 12,
                  border: "none",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Back to Website
              </button>
            </div>
          </div>
        </header>

        <main style={{ ...pageWidth, paddingTop: 30, paddingBottom: 48 }}>
          <div style={{ marginBottom: 26 }}>
            <div
              style={{
                fontSize: 13,
                letterSpacing: 1.2,
                color: "#475569",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              RECENT INQUIRIES
            </div>
            <h1 style={{ fontSize: 40, margin: "0 0 10px 0", fontWeight: 800 }}>
              Tenant Interest Dashboard
            </h1>
            <p
              style={{
                fontSize: 17,
                color: "#64748b",
                lineHeight: 1.8,
                maxWidth: 860,
                margin: 0,
              }}
            >
              This private dashboard shows people interested in renting the featured property on the
              landing page. It is only visible to Ideal Lettings and their team.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <MetricCard
              icon="👥"
              value={String(stats.total)}
              label="Total inquiries"
              subtext="People interested in this property"
            />
            <MetricCard
              icon="💬"
              value={String(stats.newCount)}
              label="Inquiries today"
              subtext="New messages ready for follow-up"
            />
            <MetricCard
              icon="📞"
              value={String(stats.contacted)}
              label="Contacted"
              subtext="Inquiries already spoken to"
            />
            <MetricCard
              icon="✅"
              value={String(stats.applications)}
              label="Applications received"
              subtext="Application stage prospects"
            />
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: 24,
              border: "1px solid #e5e7eb",
              boxShadow: "0 12px 28px rgba(15,23,42,0.05)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: 24,
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>Recent Inquiries</h2>
                <p style={{ margin: "6px 0 0 0", color: "#64748b" }}>
                  Fictional leads for demo purposes, linked to the featured property.
                </p>
              </div>
              <div style={{ fontWeight: 700, color: "#0f172a" }}>3-Bedroom House • £1,300 pcm</div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                    {[
                      "NAME",
                      "PHONE",
                      "EMAIL",
                      "PROPERTY INTERESTED IN",
                      "DATE",
                      "STATUS",
                    ].map((head) => (
                      <th
                        key={head}
                        style={{
                          padding: "16px 18px",
                          fontSize: 12,
                          color: "#64748b",
                          fontWeight: 800,
                          letterSpacing: 0.8,
                        }}
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr
                      key={`${inquiry.name}-${inquiry.date}-${inquiry.email}`}
                      style={{ borderTop: "1px solid #e5e7eb" }}
                    >
                      <td style={{ padding: "16px 18px", fontWeight: 700 }}>{inquiry.name}</td>
                      <td style={{ padding: "16px 18px" }}>{inquiry.phone}</td>
                      <td style={{ padding: "16px 18px" }}>{inquiry.email}</td>
                      <td style={{ padding: "16px 18px" }}>{inquiry.property}</td>
                      <td style={{ padding: "16px 18px" }}>{inquiry.date}</td>
                      <td style={{ padding: "16px 18px" }}>
                        <span
                          style={{
                            ...statusStyle(inquiry.status),
                            display: "inline-block",
                            padding: "8px 14px",
                            borderRadius: 999,
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          {inquiry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: "grid", gap: 16, marginTop: 26 }}>
            {inquiries.slice(0, 3).map((inquiry) => (
              <div
                key={`${inquiry.name}-notes`}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 18,
                  padding: 18,
                  boxShadow: "0 8px 20px rgba(15,23,42,0.04)",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{inquiry.name}</div>
                <div style={{ fontSize: 14, color: "#64748b", marginBottom: 12 }}>
                  {inquiry.property}
                </div>
                <div
                  style={{
                    background: "#0f172a",
                    color: "#ffffff",
                    borderRadius: 14,
                    padding: 14,
                    lineHeight: 1.7,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: "#cbd5e1",
                      marginBottom: 6,
                      letterSpacing: 0.8,
                    }}
                  >
                    INQUIRY NOTES
                  </div>
                  {inquiry.notes}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      ref={homeRef}
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
        <div
          style={{
            ...pageWidth,
            paddingTop: 16,
            paddingBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <Logo />

          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <div style={{ fontWeight: 800, color: "#0f172a", fontSize: 16 }}>📞 07738 427425</div>
            <div style={{ color: "#475569", fontSize: 14 }}>✉️ bill-ideallettings@hotmail.com</div>
            <button
              onClick={() => scrollToRef(formRef)}
              style={{
                background: "#3b82f6",
                color: "#ffffff",
                padding: "14px 20px",
                borderRadius: 12,
                border: "none",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 10px 24px rgba(59,130,246,0.24)",
              }}
            >
              Inquire About a Property
            </button>
          </div>
        </div>
      </header>

      <nav style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
        <div
          style={{
            ...pageWidth,
            paddingTop: 14,
            paddingBottom: 14,
            display: "flex",
            gap: 34,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <button onClick={() => scrollToRef(homeRef)} style={navButtonStyle}>
            Home
          </button>
          <button onClick={() => scrollToRef(propertiesRef)} style={navButtonStyle}>
            Properties to Rent
          </button>
          <button onClick={() => scrollToRef(contactRef)} style={navButtonStyle}>
            About
          </button>
          <button onClick={() => scrollToRef(formRef)} style={navButtonStyle}>
            Contact
          </button>
          <button
            onClick={() => setView("dashboard")}
            style={{
              marginLeft: "auto",
              background: "#0f172a",
              color: "#ffffff",
              padding: "10px 16px",
              borderRadius: 10,
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Open Dashboard
          </button>
        </div>
      </nav>

      <section style={{ position: "relative", minHeight: 620, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/house_to_let.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(15,23,42,0.60) 0%, rgba(15,23,42,0.38) 45%, rgba(15,23,42,0.15) 100%)",
          }}
        />
        <div style={{ ...pageWidth, position: "relative", paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ maxWidth: 560, color: "#ffffff" }}>
            <h1 style={{ fontSize: 58, lineHeight: 1.05, margin: "0 0 18px 0", fontWeight: 800 }}>
              Ideal Lettings
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.8, color: "#f1f5f9", margin: "0 0 28px 0" }}>
              Ideal Lettings is a family-run agency committed to delivering top-quality short and
              long-term lettings. With a focus on trust, care, and satisfaction, we provide a
              high-end, personal service that you can rely on.
            </p>
            <button
              onClick={() => scrollToRef(formRef)}
              style={{
                background: "#3b82f6",
                color: "#ffffff",
                padding: "16px 26px",
                borderRadius: 12,
                border: "none",
                fontWeight: 700,
                fontSize: 18,
                cursor: "pointer",
                boxShadow: "0 12px 28px rgba(59,130,246,0.28)",
              }}
            >
              Inquire About a Property to Rent
            </button>
          </div>
        </div>
      </section>

      <main style={{ ...pageWidth, paddingTop: 42, paddingBottom: 54 }}>
        <section ref={propertiesRef} style={{ marginBottom: 28 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 22,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 34, fontWeight: 800 }}>Properties to Rent</h2>
            <div style={{ fontWeight: 700, color: "#334155" }}>View All Properties →</div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: 24,
              border: "1px solid #e5e7eb",
              boxShadow: "0 12px 28px rgba(15,23,42,0.05)",
              padding: 18,
              display: "grid",
              gridTemplateColumns: "360px 1fr",
              gap: 22,
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", minHeight: 280 }}>
              <img
                src="/house_to_let.jpg"
                alt="3-bedroom house for rent"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  background: "#3b82f6",
                  color: "#ffffff",
                  padding: "10px 14px",
                  borderRadius: 12,
                  fontWeight: 800,
                  fontSize: 13,
                  lineHeight: 1.3,
                }}
              >
                3 BEDROOM
                <br />
                HOUSE TO LET
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  background: "rgba(15,23,42,0.92)",
                  color: "#ffffff",
                  padding: "12px 16px",
                  borderRadius: 12,
                  fontWeight: 800,
                  fontSize: 16,
                }}
              >
                £1,300 <span style={{ fontWeight: 500 }}>/ month</span>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 38, margin: "0 0 16px 0", fontWeight: 800 }}>
                3-Bedroom House for Rent - £1,300 pcm
              </h3>
              <p style={{ fontSize: 17, color: "#334155", lineHeight: 1.8, marginBottom: 20 }}>
                Ideal Lettings is proud to offer this well-presented 3-bedroom home located in a
                quiet neighbourhood, ideal for families or professionals seeking comfortable living
                with outdoor space. Available from 11st April.
              </p>

              <div style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>
                £1,300 <span style={{ fontSize: 18, fontWeight: 500 }}>/ month</span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 12,
                  marginBottom: 18,
                  color: "#334155",
                  fontSize: 16,
                }}
              >
                <div>🛏️ 3 Bedrooms</div>
                <div>🛁 Main bathroom + ensuite</div>
                <div>🚗 Double driveway</div>
                <div>📍 Peaceful neighbourhood</div>
              </div>

              <div style={{ color: "#475569", lineHeight: 1.8, marginBottom: 18, fontSize: 15 }}>
                <strong>Key Features:</strong> Fitted wardrobes, downstairs W/C, gas central
                heating, double glazing, large rear garden, small front garden, garage, and
                unfurnished throughout.
                <br />
                <strong>Restrictions:</strong> No pets • No smoking
              </div>

              <button
                onClick={() => scrollToRef(formRef)}
                style={{
                  background: "#2f5f9a",
                  color: "#ffffff",
                  padding: "15px 24px",
                  borderRadius: 12,
                  border: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                Inquire About This Property ›
              </button>
            </div>
          </div>
        </section>

        <section
          ref={contactRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 30,
          }}
        >
          <MetricCard
            icon="👥"
            value={String(stats.total)}
            label="Total inquiries"
            subtext="Interest in the featured property"
          />
          <MetricCard
            icon="💬"
            value={String(stats.newCount)}
            label="Inquiries today"
            subtext="Fresh inquiries ready for follow-up"
          />
          <MetricCard
            icon="📞"
            value={String(stats.contacted)}
            label="Contacted"
            subtext="Prospects already spoken to"
          />
          <MetricCard
            icon="✅"
            value={String(stats.applications)}
            label="Applications received"
            subtext="Applicants progressing further"
          />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: 24,
            alignItems: "start",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 24,
              border: "1px solid #e5e7eb",
              boxShadow: "0 12px 28px rgba(15,23,42,0.05)",
              padding: 24,
            }}
          >
            <div style={{ marginBottom: 18 }}>
              <h2 style={{ margin: 0, fontSize: 34, fontWeight: 800 }}>Recent Inquiries</h2>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                    {[
                      "NAME",
                      "PHONE",
                      "EMAIL",
                      "PROPERTIES INTERESTED IN",
                      "DATE",
                      "STATUS",
                    ].map((head) => (
                      <th
                        key={head}
                        style={{
                          padding: "16px 14px",
                          fontSize: 12,
                          color: "#64748b",
                          fontWeight: 800,
                          letterSpacing: 0.8,
                        }}
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr
                      key={`${inquiry.name}-${inquiry.date}-${inquiry.email}`}
                      style={{ borderTop: "1px solid #e5e7eb" }}
                    >
                      <td style={{ padding: "16px 14px", fontWeight: 700 }}>{inquiry.name}</td>
                      <td style={{ padding: "16px 14px" }}>{inquiry.phone}</td>
                      <td style={{ padding: "16px 14px" }}>{inquiry.email}</td>
                      <td style={{ padding: "16px 14px" }}>{inquiry.property}</td>
                      <td style={{ padding: "16px 14px" }}>{inquiry.date}</td>
                      <td style={{ padding: "16px 14px" }}>
                        <span
                          style={{
                            ...statusStyle(inquiry.status),
                            display: "inline-block",
                            padding: "8px 14px",
                            borderRadius: 999,
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          {inquiry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside
            ref={formRef}
            style={{
              background: "#ffffff",
              borderRadius: 24,
              border: "1px solid #e5e7eb",
              boxShadow: "0 12px 28px rgba(15,23,42,0.05)",
              padding: 24,
            }}
          >
            <div style={{ fontSize: 13, color: "#475569", fontWeight: 700, letterSpacing: 1.1, marginBottom: 10 }}>
              PROPERTY INQUIRY FORM
            </div>
            <h3 style={{ fontSize: 30, margin: "0 0 12px 0", fontWeight: 800 }}>
              Inquire about this property
            </h3>
            <p style={{ color: "#64748b", lineHeight: 1.8, marginBottom: 20 }}>
              Contact Ideal Lettings to arrange a viewing or ask for more information about the
              3-bedroom house shown on this page.
            </p>

            <form style={{ display: "grid", gap: 14 }} onSubmit={handleSubmit}>
              <input
                style={fieldStyle}
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full name"
              />
              <input
                style={fieldStyle}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
              <input
                style={fieldStyle}
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
              />
              <input
                style={fieldStyle}
                name="moveInDate"
                value={form.moveInDate}
                onChange={handleChange}
                placeholder="Preferred move-in date"
              />
              <select
                style={fieldStyle}
                name="employmentStatus"
                value={form.employmentStatus}
                onChange={handleChange}
              >
                <option value="">Employment status</option>
                <option>Employed full-time</option>
                <option>Self-employed</option>
                <option>Part-time</option>
                <option>Student</option>
                <option>Other</option>
              </select>
              <textarea
                style={{ ...fieldStyle, minHeight: 120, resize: "vertical" }}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us a little about your enquiry"
              />
              <button
                style={{
                  background: "#3b82f6",
                  color: "#ffffff",
                  padding: "15px 18px",
                  borderRadius: 12,
                  border: "none",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                  boxShadow: "0 10px 24px rgba(59,130,246,0.24)",
                }}
              >
                Send Inquiry
              </button>
            </form>

            {submitted && (
              <div
                style={{
                  marginTop: 14,
                  border: "1px solid #bbf7d0",
                  background: "#f0fdf4",
                  padding: 14,
                  borderRadius: 12,
                  color: "#15803d",
                  lineHeight: 1.7,
                  fontSize: 14,
                }}
              >
                Inquiry submitted successfully. It has been added to the private dashboard for Ideal
                Lettings to review.
              </div>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}