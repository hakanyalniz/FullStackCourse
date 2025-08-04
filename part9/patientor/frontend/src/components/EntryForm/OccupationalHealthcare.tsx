import { Button, TextField, Box } from "@mui/material";

import patientServices from "../../services/patients";
import { useState } from "react";
import { Patient } from "../../types";
import EntryForm from "./EntryForm";

const OccupationalHealthCare = ({
  patient,
  setFormType,
}: {
  patient: Patient;
  setFormType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState({ startDate: "", endDate: "" });

  const handleEntryFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    patientServices.createEntry(
      {
        type: "OccupationalHealthcare",
        description,
        date,
        specialist,
        employerName,
        sickLeave,
      },
      patient.id
    );
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => handleEntryFormSubmit(e)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 300,
        margin: "auto",
        mt: 4,
      }}
    >
      <EntryForm
        handleEntryFormSubmit={handleEntryFormSubmit}
        description={description}
        setDescription={setDescription}
        date={date}
        setDate={setDate}
        specialist={specialist}
        setSpecialist={setSpecialist}
        setFormType={setFormType}
      />

      <TextField
        label="Employer name"
        type="string"
        value={employerName}
        onChange={(e) => setEmployerName(e.target.value)}
        variant="outlined"
      />

      <TextField
        label="Sick leave start"
        type="string"
        value={sickLeave.startDate}
        onChange={(e) =>
          setSickLeave((prevState) => ({
            ...prevState,
            startDate: e.target.value,
          }))
        }
        variant="outlined"
      />

      <TextField
        label="Sick leave end"
        type="string"
        value={sickLeave.endDate}
        onChange={(e) =>
          setSickLeave((prevState) => ({
            ...prevState,
            endDate: e.target.value,
          }))
        }
        variant="outlined"
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default OccupationalHealthCare;
