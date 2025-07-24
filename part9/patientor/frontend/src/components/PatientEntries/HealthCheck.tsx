import BaseEntry from "./baseEntry";

import type { PatientProps } from "../../types";

const HealthCheck = ({ entry, diagnosisDescription }: PatientProps) => {
  return (
    <div>
      <BaseEntry entry={entry} diagnosisDescription={diagnosisDescription} />
    </div>
  );
};

export default HealthCheck;
