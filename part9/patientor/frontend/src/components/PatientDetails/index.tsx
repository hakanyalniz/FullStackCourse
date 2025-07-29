import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import { useEffect, useState } from "react";
import "./style.css";

import { Button } from "@mui/material";

import { Patient, Diagnosis } from "../../types";

import PatientEntries from "../PatientEntries";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnosisDescription, setDiagnosisDescription] = useState<Diagnosis[]>(
    []
  );

  useEffect(() => {
    const fetchPatienceData = async () => {
      setPatient(await patientService.getOne(id as string));
    };
    fetchPatienceData();
  }, [id]);

  useEffect(() => {
    const fetchDiagnosisData = async () => {
      setDiagnosisDescription(await diagnosisService.getAllDiagnosis());
    };

    fetchDiagnosisData();
  }, []);
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
      <div className="entry-container">
        <PatientEntries
          patient={patient}
          diagnosisDescription={diagnosisDescription}
        />
      </div>

      <Button variant="contained" color="primary">
        Add Entry
      </Button>
    </div>
  );
};

export default PatientDetails;
