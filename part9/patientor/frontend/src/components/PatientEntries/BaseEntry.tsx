// A base entry file so we don't repeat the same parts

import type { BaseEntryProps } from "../../types";

const BaseEntry = ({
  entry,
  diagnosisDescription,
  MedicalIcon,
}: BaseEntryProps) => {
  if (diagnosisDescription.length === 0) {
    return <>Loading ...</>;
  }

  return (
    <div>
      <div>
        {entry.date} <MedicalIcon />
      </div>
      <div>{entry.description}</div>
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
};

export default BaseEntry;
