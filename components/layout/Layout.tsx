import { Box, Container, Toolbar } from "@mui/material";
import Head from "next/head";
import Header from "./Header";

/**
 * Component with a layout.
 */
export default function Layout({ children, title }: any) {
  return (
    <Box>
      <Head>
        <title>{title || "MentorDAO"}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Header />
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Toolbar />
          {children}
        </Box>
      </Container>
    </Box>
  );
}
