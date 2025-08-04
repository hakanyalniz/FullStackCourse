import { Button, TextField, Box } from "@mui/material";

import patientServices from "../../services/patients";
import { useState } from "react";
import { Patient } from "../../types";

const HospitalForm = ({ patient }: { patient: Patient }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);

  //   {
  //     "id": "54a8746e-34c4-4cf4-bf72-bfecd039be9a",
  //     "date": "2020-03-01",
  //     "specialist": "Dr Apartment",
  //     "type": "HealthCheck",
  //     "description": "Too much cat bites.",
  //     "healthCheckRating": 0
  // }
  const handleEntryFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("test");

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
      <TextField
        label="Description"
        type="text"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        type="date"
        variant="outlined"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        label="Specialist"
        type="text"
        variant="outlined"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
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

export default HospitalForm;
