import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";

import { Patient } from "../../types";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatienceData = async () => {
      setPatient(await patientService.getOne(id as string));
    };
    fetchPatienceData();
  }, [id]);

  console.log(patient);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <div>Gender: {patient.gender}</div>
      <div>Occupation: {patient.occupation}</div>
      <div>Date of Birth: {patient.dateOfBirth}</div>
      <div>SSN: {patient.ssn}</div>
      <h3>Entries:</h3>
      <div>
        {patient.entries.map((entry, index) => {
          return (
            <div key={index}>
              <div>Date: {entry.date}</div>
              <div>Description: {entry.description}</div>
              <span>Diagnosis Code: </span>
              {typeof entry.diagnosisCodes !== "undefined" ? ( // If diagnosis code are not found check
                <ul>
                  {entry.diagnosisCodes.map((diagnosis) => (
                    <li>{diagnosis}</li>
                  ))}
                </ul>
              ) : (
                <span>No code found</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientDetails;
