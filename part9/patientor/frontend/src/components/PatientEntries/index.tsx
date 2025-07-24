import type { Entry, BasePatientProps } from "../../types";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";

const PatientEntries = ({
  patient,
  diagnosisDescription,
}: BasePatientProps) => {
  const entryTypeSwitch = (entry: Entry, index: number) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <Hospital
            entry={entry}
            diagnosisDescription={diagnosisDescription}
            key={index}
          />
        );

      case "HealthCheck":
        return (
          <HealthCheck
            entry={entry}
            diagnosisDescription={diagnosisDescription}
            key={index}
          />
        );

      case "OccupationalHealthcare":
        return (
          <OccupationalHealthcare
            entry={entry}
            diagnosisDescription={diagnosisDescription}
            key={index}
          />
        );

      default:
        return <div>Loading ...</div>;
    }
  };
  // Check if entry array is empty or not
  if (patient.entries.length === 0) {
    return <>No Entry found</>;
  }

  // The switch function will return the type and we will return that to get the component
  return patient.entries.map((entry, index) => entryTypeSwitch(entry, index));
};

export default PatientEntries;
