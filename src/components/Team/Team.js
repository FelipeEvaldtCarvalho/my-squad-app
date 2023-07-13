import Players from "../Players/Players";
import "./Team.scss";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function Team({ team, setStore, store, teamIndex }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTeam = () => {
    const updatedStore = [...store];
    updatedStore.splice(teamIndex, 1);
    localStorage.setItem("times", JSON.stringify(updatedStore));
    setStore(updatedStore);
  };

  const handleClickConfirm = () => {
    setOpen(false);
    deleteTeam();
  };

  return (
    <section className="team">
      <div className="bg" style={{ backgroundColor: team.color }}></div>
      <div className="content">
        <IconButton
          aria-label="delete"
          color="primary"
          style={{
            top: 0,
            position: "absolute",
            right: 5,
            top: 5,
            color: "#000",
          }}
          onClick={handleClickOpen}
        >
          <CloseIcon />
        </IconButton>
        <Typography className="title" variant="h4">
          {team.name}
        </Typography>
        <div
          className="line"
          style={{
            backgroundColor: team.color,
          }}
        ></div>
        <Players
          store={store}
          setStore={setStore}
          members={team.members}
          color={team.color}
          team={team.name}
        ></Players>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">Excluir</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deseja remover o time {team.name}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleClickConfirm}>Excluir</Button>
          </DialogActions>
        </Dialog>
      </div>
    </section>
  );
}
