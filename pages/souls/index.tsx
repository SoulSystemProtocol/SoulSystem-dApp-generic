import { Box, Button, Pagination, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";

import Soul from "classes/Soul";
import SoulList from "components/soul/SoulList";
import useError from "hooks/useError";
import useSoul from "hooks/useSoul";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { DataContext } from "contexts/data";

/**
 * Page for a list of souls
 */
export default function SoulsPage({}: any) {
  const { accountSoul } = useContext(DataContext);
  const { handleError } = useError();
  const { getSouls } = useSoul();
  const [souls, setSouls] = useState<Array<Soul> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCount, setCurrentPageCount] = useState(1);
  const pageSize = 16;

  async function loadData(page = currentPage, pageCount = currentPageCount) {
    try {
      // Update states
      setCurrentPage(page);
      setCurrentPageCount(pageCount);
      setSouls(null);
      // Load souls by page params
      const souls = await getSouls(
        undefined,
        undefined,
        pageSize,
        (page - 1) * pageSize
      );
      setSouls(souls);
      // Add next page to pagination if possible
      if (page == pageCount && souls.length === pageSize) {
        setCurrentPageCount(pageCount + 1);
      }
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    loadData(1, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="MentorDAO — Souls">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Souls</Typography>
        {!accountSoul && (
          <Link href="/souls/create" passHref>
            <Button variant="outlined">Create Soul</Button>
          </Link>
        )}
      </Box>
      <SoulList souls={souls} sx={{ mt: 1 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { md: "space-between" },
          alignItems: { md: "center" },
          mt: 3,
        }}
      >
        <Pagination
          color="primary"
          sx={{ mt: { xs: 2, md: 0 } }}
          count={currentPageCount}
          page={currentPage}
          onChange={(_, page) => loadData(page)}
        />
      </Box>
    </Layout>
  );
}
