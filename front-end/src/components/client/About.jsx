import React, { useEffect } from "react";
import { Chart } from "react-chartjs-2";
import "../../styles.css";

const AboutUs = () => {
  useEffect(() => {
    const ctx = document
      .getElementById("businessTimelineChart")
      .getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        datasets: [
          {
            label: "Events Hosted Over Time",
            data: [50, 120, 200, 320, 450, 600, 750, 850, 950, 1100],
            backgroundColor: "rgba(237, 28, 36, 0.2)",
            borderColor: "#ED1C24",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/spaces">Spaces</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/about" className="active">
                About Us
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="about-us">
          <h1>Welcome to The Groove</h1>
          <p>
            At The Groove, we provide exceptional space rental solutions
            tailored to meet your unique needs. Since our inception in 2015, we
            have been dedicated to offering a diverse range of venues, from cozy
            coworking spaces to luxurious event halls.
          </p>
          <div className="about-content">
            <div className="our-story">
              <h2>Our Story</h2>
              <p>
                The Groove started with a simple idea: to create spaces that
                inspire creativity and foster connections. Over the years, we
                have expanded our offerings to include a variety of venues,
                ensuring we have the perfect space for every occasion.
              </p>
            </div>
            <div className="our-mission">
              <h2>Our Mission</h2>
              <p>
                Our mission is to provide top-quality spaces that exceed our
                clients' expectations. We believe in creating environments that
                not only meet practical needs but also enhance the overall
                experience for our guests.
              </p>
            </div>
            <div className="graph-section">
              <h2>Our Journey</h2>
              <canvas id="businessTimelineChart"></canvas>
              <p>
                Since 2015, we have hosted over 1,000 events and served
                countless satisfied clients. Our growth is a testament to our
                commitment to excellence and customer satisfaction.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 The Groove. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
