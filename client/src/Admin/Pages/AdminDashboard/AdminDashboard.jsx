import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ratingData = [
  { month: "Jan", rating: 4.1 },
  { month: "Feb", rating: 3.3 },
  { month: "Mar", rating: 4.4 },
  { month: "Apr", rating: 4.5 },
  { month: "May", rating: 4.7 },
  { month: "Jun", rating: 4.6 },
];

const AdminDashboard = () => {

  const [stats, setStats] = useState({
    total_users: 0,
    total_lawyers: 0,
    total_revenue: 0,
    avg_rating: 0
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/admin_dashboard/")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data", err);
      });
  }, []);

  return (
    <Box sx={{ padding: "30px", background: "#f5f7fb", minHeight: "100vh" }}>
      
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        LawBridge Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        
        {/* Total Users */}
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {stats.total_users}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Lawyers */}
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">Total Lawyers</Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {stats.total_lawyers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue */}
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                ₹{stats.total_revenue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Average Rating */}
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">Average Rating</Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {stats.avg_rating} ⭐
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* Graph Section */}
      <Box sx={{ mt: 5 }}>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              User Rating Overview
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ratingData}>
                <XAxis dataKey="month" />
                <YAxis domain={[3.5, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#7c3aed"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>

          </CardContent>
        </Card>
      </Box>

    </Box>
  );
};

export default AdminDashboard;