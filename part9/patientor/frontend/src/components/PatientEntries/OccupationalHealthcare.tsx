import BaseEntry from "./BaseEntry";

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
