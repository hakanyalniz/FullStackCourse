import BaseEntry from "./baseEntry";

import type { PatientProps } from "../../types";

const Hospital = ({ patient, diagnosisDescription }: PatientProps) => {
  return (
    <div>
      <BaseEntry
        patient={patient}
        diagnosisDescription={diagnosisDescription}
      />
    </div>
  );
};

export default Hospital;
