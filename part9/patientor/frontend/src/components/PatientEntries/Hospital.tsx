import BaseEntry from "./baseEntry";

import type { PatientProps } from "../../types";

const Hospital = ({ entry, diagnosisDescription }: PatientProps) => {
  return (
    <div>
      <BaseEntry entry={entry} diagnosisDescription={diagnosisDescription} />
    </div>
  );
};

export default Hospital;
