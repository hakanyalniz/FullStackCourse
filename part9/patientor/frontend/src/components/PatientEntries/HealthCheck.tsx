import BaseEntry from "./baseEntry";

import type { PatientProps } from "../../types";

const HealthCheck = ({ patient, diagnosisDescription }: PatientProps) => {
  return (
    <div>
      <BaseEntry
        patient={patient}
        diagnosisDescription={diagnosisDescription}
      />
    </div>
  );
};

export default HealthCheck;
