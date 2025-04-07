# Florida Panther Data Analyzer 🐾

The **Florida Panther Data Analyzer** is an interactive web application built to visualize and explore data on the endangered Florida panther population. This project integrates telemetry (GPS tracking) and mortality records to provide valuable insights into panther movements, behaviors, and causes of death. It aims to support conservation, education, and public awareness efforts by presenting complex data in a clear and interactive format.
The datasource is Florida Fish and Wildlife Conservation.
## 🌎 Features

- Interactive visualizations using maps and graphs
- Heatmaps of panther mortality by age, sex, and year
- Top causes of death across different demographics
- Filtering options to analyze movement and mortality trends over time
- Simplified UI for both researchers and the general public

## 🧠 How It Works

- Mortality and telemetry data are loaded from CSV files into a SQL database.
- A backend server handles queries based on user input (age, sex, year).
- React is used to build a responsive front end with modular components.
- Map and graph components display data visually using heatmaps, tables, and overlays.

## 🛠 Technologies Used

- **React.js** – Front-end framework
- **Node.js / Express** – Backend server
- **MySQL** – Relational database for panther and telemetry data
- **Leaflet.js / Mapbox** – For interactive maps and overlays
- **Recharts** – For graphing and charting
- **CSV / SQL** – Data ingestion and transformation
- **HTML / CSS** – Styling and layout

## 📁 How To Get It Working Locally

1. **Clone the Repository**  
```bash
git clone https://github.com/erikalmeidah/FloridaPanther.git
cd FloridaPanther
```
2. **Install Frontend Dependencies**

```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**

```bash
cd ../backend
npm install
```

4. **Set Up the MySQL Database**

Make sure MySQL is installed and running.

Import the database from the dump file:

```bash
CREATE DATABASE panther;
mysql -u root -p < ../db/florida_panther_db.sql
```

5. ***Configure Environment Variables***
In the backend folder, create or modify the .env file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=panther
```

6. **Start the Backend Server**

```bash
node server.js
```
7. **Start the Frontend Server**
Open a new terminal and run:

```bash
cd frontend
npm run dev
```

7. **Open the App**
Navigate to http://localhost:5173 in your browser.
