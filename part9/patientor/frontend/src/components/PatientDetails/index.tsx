import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import { useEffect, useState } from "react";
import "./style.css";

import { Button } from "@mui/material";

import { Patient, Diagnosis } from "../../types";

import PatientEntries from "../PatientEntries";
import HealthCheckForm from "../EntryForm/HealthCheckForm";
import HospitalForm from "../EntryForm/HospitalForm";
import OccupationalHealthCare from "../EntryForm/OccupationalHealthcare";

const PatientDetails = () => {
  const [formType, setFormType] = useState("healthCheck");
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

  const handleEntryFormVisibility = () => {
    const entryFormElement = document.querySelector(
      ".entry-form-container"
    ) as HTMLElement | null;

    if (!entryFormElement) {
      throw new Error("Missing Entry Form");
    }

    const computedDisplay = window.getComputedStyle(entryFormElement).display;

    if (computedDisplay === "none") {
      entryFormElement.style.display = "block";
    } else {
      entryFormElement.style.display = "none";
    }
  };

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

      <Button
        variant="contained"
        color="primary"
        onClick={handleEntryFormVisibility}
      >
        Add Entry
      </Button>
      {/* Decide the entry form type and render the selected one */}
      <div className="entry-form-container">
        {formType === "healthCheck" ? (
          <HealthCheckForm patient={patient} setFormType={setFormType} />
        ) : formType === "hospital" ? (
          <HospitalForm patient={patient} setFormType={setFormType} />
        ) : formType === "occupationalHealthcare" ? (
          <OccupationalHealthCare patient={patient} setFormType={setFormType} />
        ) : null}
      </div>
    </div>
  );
};

export default PatientDetails;
