import { TextField } from "@mui/material";

import { EntryProps } from "../../types";

const EntryForm = ({
  description,
  setDescription,
  date,
  setDate,
  specialist,
  setSpecialist,
  setFormType,
  diagnosisCodes,
  setDiagnosisCodes,
}: EntryProps) => {
  // Assign the array into a temp variable so we can push into it then reassign into the state
  // take the event value and turn it into an array, then add each one by one to the temp variable
  const handleDiagnosisCode = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const tempDiagnosisCodes: string[] = [];
    // Split by comma to create an array but also trim any space from the string
    const tempDiagnosisArray = event.target.value
      .split(",")
      .map((s) => s.trim());

    tempDiagnosisArray.forEach((diagnosisCode) =>
      tempDiagnosisCodes.push(diagnosisCode)
    );
    console.log("Testing diagnosis handler");

    setDiagnosisCodes(tempDiagnosisCodes);
  };

  return (
    <>
      <select
        id="form-type"
        name="form-type"
        onChange={(e) => setFormType(e.target.value)}
        defaultValue={"default"}
      >
        <option value="default" disabled>
          --Select--
        </option>
        <option value="hospital">Hospital</option>
        <option value="healthCheck">Health Check</option>
        <option value="occupationalHealthcare">Occupational Healthcare</option>
      </select>
      <TextField
        label="Description"
        type="text"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Entry date"
        type="date"
        variant="outlined"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Specialist"
        type="text"
        variant="outlined"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
      />

      <TextField
        label="Diagnosis Codes"
        type="text"
        variant="outlined"
        value={diagnosisCodes}
        onChange={(e) => handleDiagnosisCode(e)}
      />
    </>
  );
};

export default EntryForm;
