import type { Entry, PatientProps } from "../../types";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";

const PatientEntries = ({ patient, diagnosisDescription }: PatientProps) => {
  const entryTypeSwitch = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <Hospital
            patient={patient}
            diagnosisDescription={diagnosisDescription}
          />
        );

      case "HealthCheck":
        return (
          <HealthCheck
            patient={patient}
            diagnosisDescription={diagnosisDescription}
          />
        );

      case "OccupationalHealthcare":
        return (
          <OccupationalHealthcare
            patient={patient}
            diagnosisDescription={diagnosisDescription}
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
  return patient.entries.map((entry) => entryTypeSwitch(entry));
};

export default PatientEntries;
