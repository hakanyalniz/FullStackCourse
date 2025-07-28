import BaseEntry from "./BaseEntry";

import type { PatientProps } from "../../types";

const Hospital = ({ entry, diagnosisDescription }: PatientProps) => {
  console.log(entry);
  console.log(diagnosisDescription);

  return (
    <div>
      <BaseEntry entry={entry} diagnosisDescription={diagnosisDescription} />
    </div>
  );
};

export default Hospital;
