import BaseEntry from "./BaseEntry";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

import type { PatientProps } from "../../types";

const OccupationalHealthcare = ({
  entry,
  diagnosisDescription,
}: PatientProps) => {
  return (
    <div>
      <BaseEntry
        entry={entry}
        diagnosisDescription={diagnosisDescription}
        MedicalIcon={MedicalInformationIcon}
      />
    </div>
  );
};

export default OccupationalHealthcare;
