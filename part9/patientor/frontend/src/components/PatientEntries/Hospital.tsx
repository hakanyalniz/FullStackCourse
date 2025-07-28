import BaseEntry from "./BaseEntry";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Box } from "@mui/material";

import type { HospitalEntryProps } from "../../types";

const Hospital = ({ entry, diagnosisDescription }: HospitalEntryProps) => {
  console.log(entry);
  console.log(diagnosisDescription);

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
          MedicalIcon={LocalHospitalIcon}
        />
        <span>
          Discharge date: <span>{entry.discharge.date}</span>
        </span>
        <span>
          Discharge criteria: <span>{entry.discharge.criteria}</span>
        </span>

        <div>Diagnose by {entry.specialist}</div>
      </Box>
    </>
  );
};

export default Hospital;
