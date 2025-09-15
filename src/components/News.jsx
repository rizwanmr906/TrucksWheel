import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function News() {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState("All");
  const qParam = (searchParams.get('q') || '').toLowerCase();

  const newsData = [
    {
      id: 1,
      category: "Cars",
      date: "April 20, 2024",
      title:
        "Suzuki announces price cut on Alto models amid market competition",
      description:
        "Suzuki has recently announced a price reduction on its popular Alto models to stay competitive in the market.",
      image:
        "https://images.unsplash.com/photo-1616788464169-01c6b48d40c2?w=400",
    },
    {
      id: 2,
      category: "Trucks",
      date: "April 18, 2024",
      title:
        "Pakistan’s first electric truck hits the road – a milestone for green transport",
      description:
        "A pioneering electric truck has been launched in Pakistan, marking a significant step towards sustainable transportation.",
      image:
        "https://images.unsplash.com/photo-1606813907291-77a4bbecb48d?w=400",
    },
    {
      id: 3,
      category: "Trucks",
      date: "April 15, 2024",
      title:
        "Heavy vehicle import policy revised by Government – What it means for years",
      description:
        "The government has updated the import regulations for heavy vehicles, impacting the automotive sector and potential buyers.",
      image:
        "https://images.unsplash.com/photo-1589739900266-43e7f49aafbd?w=400",
    },
    {
      id: 4,
      category: "Auto Industry",
      date: "April 10, 2024",
      title:
        "Auto Expo 2025 highlights – Electric vehicles and futuristic trucks",
      description:
        "The upcoming Auto Expo 2025 showcases the latest innovations in electric vehicles and futuristic trucking.",
      image:
        "https://images.unsplash.com/photo-1621996346564-bca8e7b7377b?w=400",
    },
  ];

  // Auto-select a category based on query intent (if any)
  useEffect(() => {
    if (!qParam) return;
    const q = qParam;
    if (q.includes('electric') || q.includes('ev')) {
      setCategory('Electric Vehicles');
      return;
    }
    if (q.includes('truck') || q.includes('trucks')) {
      setCategory('Trucks');
      return;
    }
    if (q.includes('car') || q.includes('cars')) {
      setCategory('Cars');
      return;
    }
    if (q.includes('industry') || q.includes('auto')) {
      setCategory('Auto Industry');
      return;
    }
  }, [qParam]);

  const matchesQuery = useMemo(() => {
    const q = qParam;
    if (!q) return () => true;
    const tokens = q.split(/[^a-z0-9]+/).filter(Boolean);
    return (news) => {
      const hay = `${news.title} ${news.description} ${news.category}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    };
  }, [qParam]);

  const filteredNews = newsData.filter((news) =>
    (category === "All" || news.category === category) && matchesQuery(news)
  );

  return (
    <>
      <div
        className="about-hero"
        style={{
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          width: '100vw',
          // Counter the #root { padding: 2rem } top padding so hero hugs the navbar
          marginTop: '-2rem',
          // Responsive height: grow with viewport but keep sensible bounds
          height: 'clamp(380px, 70vh, 820px)',
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.35), rgba(0,0,0,0.15)), url("images/Airbrush-image-extender3.jpeg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

    <section className="news" style={{ fontFamily: "Arial, sans-serif",
      background:'rgb(255, 252, 242)',
      width:'115%' ,
      marginLeft:'-5vw'
    }}>
      {/* Heading */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#0f172a",
          }}
        >
          Vehicle News & Updates
        </h1>
        <p style={{ fontSize: "17px", color: "#475569", marginBottom: "30px" }}>
          Stay updated with the latest trends, news, and updates about cars,
          trucks, and the automobile industry.
        </p>

        {/* Filter Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          {["All", "Cars", "Trucks", "Electric Vehicles", "Auto Industry"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "20px",
                  border:
                    category === cat ? "2px solid #000" : "1px solid #d1d5db",
                  backgroundColor: category === cat ? "#000" : "#fff",
                  color: category === cat ? "#fff" : "#000",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            )
          )}
        </div>

        {/* Latest News */}
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "25px",
            color: "#0f172a",
          }}
        >
          Latest News
        </h2>

        <div>
          {filteredNews.map((news) => (
            <div
              key={news.id}
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "30px",
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: "20px",
              }}
            >
              {/* Image + Date */}
              <div style={{ textAlign: "center" }}>
                <img
                  src={news.image}
                  alt={news.title}
                  style={{
                    width: "120px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                />
                <p
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  {news.date}
                </p>
              </div>

              {/* Title + Description */}
              <div style={{ flex: "1" }}>
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: "bold",
                    margin: "0 0 6px 0",
                    color: "#0f172a",
                  }}
                >
                  {news.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#475569", margin: "0" }}>
                  {news.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: 640px) {
            .news h1 {
              font-size: 28px !important;
            }
            .news h2 {
              font-size: 20px !important;
            }
            .news img {
              width: 100px !important;
              height: 70px !important;
            }
            .news div {
              flex-direction: column !important;
              align-items: flex-start !important;
            }
          }
        `}
      </style>
    </section>
    </>
  );
}
