import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import BaseEntry from "./BaseEntry";

import type { PatientProps } from "../../types";

const HealthCheck = ({ entry, diagnosisDescription }: PatientProps) => {
  return (
    <div>
      <BaseEntry
        entry={entry}
        diagnosisDescription={diagnosisDescription}
        MedicalIcon={MedicalServicesIcon}
      />
    </div>
  );
};

export default HealthCheck;
