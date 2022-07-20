import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Layout from "components/layout/Layout";

/**
 * Home page with souls.
 */
export default function Home() {
  return (
    <Layout>
      <Box sx={{ mt: 6, textAlign: "center", px: { xs: 0, md: 4 } }}>
        <Typography gutterBottom variant="h2">
          MentorDAO
        </Typography>
        <Typography variant="h5">
          Where junior developers learn and earn
        </Typography>
      </Box>
    </Layout>
  );
}
