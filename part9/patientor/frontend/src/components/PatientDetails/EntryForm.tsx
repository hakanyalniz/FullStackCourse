import { Button, TextField, Box } from "@mui/material";

const EntryForm = () => {
  return (
    <Box
      component="form"
      // onSubmit={}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 300,
        margin: "auto",
        mt: 4,
      }}
    >
      <TextField label="First Name" variant="outlined" required />
      <TextField label="Last Name" variant="outlined" required />
      <TextField label="Email" type="email" variant="outlined" required />
      <TextField label="Phone Number" type="tel" variant="outlined" />
      <TextField label="Message" multiline rows={4} variant="outlined" />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default EntryForm;
