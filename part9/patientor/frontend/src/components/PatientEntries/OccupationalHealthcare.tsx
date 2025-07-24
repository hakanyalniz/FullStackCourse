import BaseEntry from "./baseEntry";

import type { PatientProps } from "../../types";

const OccupationalHealthcare = ({
  entry,
  diagnosisDescription,
}: PatientProps) => {
  return (
    <div>
      <BaseEntry entry={entry} diagnosisDescription={diagnosisDescription} />
    </div>
  );
};

export default OccupationalHealthcare;
