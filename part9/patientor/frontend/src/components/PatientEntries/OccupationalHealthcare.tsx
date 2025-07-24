import BaseEntry from "./baseEntry";

import type { PatientProps } from "../../types";

const OccupationalHealthcare = ({
  patient,
  diagnosisDescription,
}: PatientProps) => {
  return (
    <div>
      <BaseEntry
        patient={patient}
        diagnosisDescription={diagnosisDescription}
      />
    </div>
  );
};

export default OccupationalHealthcare;
