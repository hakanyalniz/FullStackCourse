import BaseEntry from "./BaseEntry";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import { Box } from "@mui/material";

import type { OccupationalHealthcareEntryProps } from "../../types";

const OccupationalHealthcare = ({
  entry,
  diagnosisDescription,
}: OccupationalHealthcareEntryProps) => {
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
          MedicalIcon={MedicalInformationIcon}
        />

        <span>Employee name: {entry.employerName}</span>
        <div>Diagnose by {entry.specialist}</div>
      </Box>
    </>
  );
};

export default OccupationalHealthcare;
