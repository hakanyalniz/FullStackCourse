// A base entry file so we don't repeat the same parts

import type { PatientProps } from "../../types";

const BaseEntry = ({ patient, diagnosisDescription }: PatientProps) => {
  return (
    <div>
      {
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
      }
    </div>
  );
};

export default BaseEntry;
