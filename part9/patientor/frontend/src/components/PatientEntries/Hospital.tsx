import BaseEntry from "./BaseEntry";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Box, Typography, Stack } from "@mui/material";

import type { PatientProps } from "../../types";

const Hospital = ({ entry, diagnosisDescription }: PatientProps) => {
  console.log(entry);
  console.log(diagnosisDescription);

  return (
    <>
      <Box
        border="1px solid black"
        borderRadius={2}
        p={2}
        display="flex"
        gap={2}
        width="100%"
      >
        <BaseEntry
          entry={entry}
          diagnosisDescription={diagnosisDescription}
          MedicalIcon={LocalHospitalIcon}
        />
      </Box>
    </>
  );
};

export default Hospital;
