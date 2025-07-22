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
    </div>
  );
};

export default PatientDetails;
