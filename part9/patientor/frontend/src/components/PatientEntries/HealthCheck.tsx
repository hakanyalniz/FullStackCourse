import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Box } from "@mui/material";

import BaseEntry from "./BaseEntry";

import type { HealthCheckEntryProps } from "../../types";

const HealthCheck = ({
  entry,
  diagnosisDescription,
}: HealthCheckEntryProps) => {
  return (
    <>
      <Box
        border="1px solid black"
        borderRadius={2}
        p={2}
        display="flex"
        flexDirection="column"
        gap={2}
        width="100%"
      >
        <BaseEntry
          entry={entry}
          diagnosisDescription={diagnosisDescription}
          MedicalIcon={MedicalServicesIcon}
        />
        {entry.healthCheckRating === 0
          ? "Great"
          : entry.healthCheckRating === 1
          ? "Not good"
          : null}
        <div>Diagnose by {entry.specialist}</div>
      </Box>
    </>
  );
};

export default HealthCheck;
