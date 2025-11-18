import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import '../styles/AdoptionCharts.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function AdoptionCharts() {
  // Bar Chart Data - Shelter Statistics
  const shelterData = {
    labels: ['Enter Shelters', 'Get Adopted', 'Left in Shelters', 'Euthanized'],
    datasets: [
      {
        label: 'Number of Animals (Millions)',
        data: [6.5, 4.2, 2.3, 2.0],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(76, 175, 80, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(229, 57, 53, 0.8)',
        ],
        borderColor: [
          'rgba(102, 126, 234, 1)',
          'rgba(76, 175, 80, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(229, 57, 53, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const shelterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Annual Shelter Statistics (US)',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#2c3e50',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.parsed.y + 'M animals';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + 'M';
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
  };

  // Doughnut Chart Data - Adoption Outcomes
  const outcomeData = {
    labels: ['Adopted', 'Left in Shelters'],
    datasets: [
      {
        label: 'Animals',
        data: [4.2, 2.3],
        backgroundColor: [
          'rgba(76, 175, 80, 0.8)',
          'rgba(255, 193, 7, 0.8)',
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)',
          'rgba(255, 193, 7, 1)',
        ],
        borderWidth: 3,
      },
    ],
  };

  const outcomeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 13,
          },
          color: '#2c3e50',
        }
      },
      title: {
        display: true,
        text: 'Adoption Success Rate',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#2c3e50',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return context.label + ': ' + context.parsed + 'M (' + percentage + '%)';
          }
        }
      }
    },
  };

  // Line Chart Data - Adoption Trends
  const trendData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Adoptions',
        data: [3.8, 3.9, 4.5, 4.3, 4.1, 4.2, 4.2],
        borderColor: 'rgba(76, 175, 80, 1)',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgba(76, 175, 80, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Entered Shelters',
        data: [6.3, 6.4, 6.7, 6.6, 6.5, 6.5, 6.5],
        borderColor: 'rgba(102, 126, 234, 1)',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgba(102, 126, 234, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 15,
          font: {
            size: 13,
          },
          color: '#2c3e50',
          usePointStyle: true,
        }
      },
      title: {
        display: true,
        text: 'Adoption Trends Over Time',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#2c3e50',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y + 'M animals';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + 'M';
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
  };

  return (
    <section className="charts-section">
      <div className="charts-container">
        <h2 className="charts-title">Understanding the Impact</h2>
        <p className="charts-subtitle">
          Data-driven insights into pet adoption and shelter statistics across the United States
        </p>

        <div className="charts-grid">
          {/* Bar Chart */}
          <div className="chart-card">
            <div className="chart-wrapper">
              <Bar data={shelterData} options={shelterOptions} />
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="chart-card">
            <div className="chart-wrapper">
              <Doughnut data={outcomeData} options={outcomeOptions} />
            </div>
          </div>

          {/* Line Chart - Full Width */}
          <div className="chart-card full-width">
            <div className="chart-wrapper">
              <Line data={trendData} options={trendOptions} />
            </div>
          </div>
        </div>

        <div className="chart-info">
          <p>
            <strong>Key Insight:</strong> While millions of animals enter shelters each year, 
            there's still a significant gap between those who find homes and those who don't. 
            FureverHomes aims to bridge this gap by making pet adoption more accessible and streamlined.
          </p>
        </div>
      </div>
    </section>
  );
}