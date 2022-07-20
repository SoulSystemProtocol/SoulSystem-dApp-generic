/**
 * Page for a list of projects
 */
import * as React from 'react';
import { Box } from "@mui/material";
import Layout from "../../components/layout/Layout";

import type { TProjectsProps } from './projects.types';

export default function ProjectsPage({}: TProjectsProps) {
  return (
    <Layout>
      <Box>Projects</Box>
    </Layout>
  )
}