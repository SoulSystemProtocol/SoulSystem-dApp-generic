/**
 * Page for a list of souls
 */
import * as React from 'react';
import { Box } from "@mui/material";
import Layout from "../../components/layout/Layout";

import type { TSoulProps } from './souls.types';

export default function SoulsPage({}: TSoulProps) {
  return (
    <Layout>
      <Box>Souls</Box>
    </Layout>
  )
}