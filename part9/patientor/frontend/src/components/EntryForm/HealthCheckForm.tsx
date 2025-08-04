import { Button, TextField, Box } from "@mui/material";

import patientServices from "../../services/patients";
import { useState } from "react";
import { Patient } from "../../types";

import EntryForm from "./EntryForm";

const HealthCheckForm = ({
  patient,
  setFormType,
}: {
  patient: Patient;
  setFormType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const handleEntryFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    patientServices.createEntry(
      {
        type: "HealthCheck",
        description,
        date,
        specialist,
        healthCheckRating,
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
        label="Healthcheck rating"
        type="number"
        value={healthCheckRating}
        onChange={(e) => setHealthCheckRating(parseInt(e.target.value))}
        variant="outlined"
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default HealthCheckForm;
