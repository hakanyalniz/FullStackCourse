import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import { useEffect, useState } from "react";

import { Patient, Diagnosis } from "../../types";

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
      {patient.entries.length !== 0 ? ( // Check if entry array is empty or not
        <div>
          {patient.entries.map((entry, index) => {
            return (
              <div key={index}>
                <div>Date: {entry.date}</div>
                <div>Description: {entry.description}</div>
                <span>Diagnosis Code: </span>
                {typeof entry.diagnosisCodes !== "undefined" ? ( // check if diagnosis code are not found
                  <ul>
                    {entry.diagnosisCodes.map(
                      (
                        diagnosis,
                        index // there might be more then one diagnosis code, so map them
                      ) => (
                        <li key={index}>
                          {diagnosis}{" "}
                          <>
                            {
                              // filter the fetched diagnosis data and compare the code the patient has on entry, then display the filtered name
                              diagnosisDescription.filter((singleDiagnosis) => {
                                return singleDiagnosis.code === diagnosis;
                              })[0].name
                            }
                          </>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <span>No code found</span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <>No Entry found</>
      )}
    </div>
  );
};

export default PatientDetails;
