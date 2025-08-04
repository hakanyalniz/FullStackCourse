import { TextField } from "@mui/material";

import { EntryProps } from "../../types";

const EntryForm = ({
  description,
  setDescription,
  date,
  setDate,
  specialist,
  setSpecialist,
}: EntryProps) => {
  return (
    <>
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
    </>
  );
};

export default EntryForm;
