import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./PlayerCard.scss";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { checkIfBlack } from "../../services/helpers";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function PlayerCard({
  player,
  color,
  team,
  playerIndex,
  store,
  setStore,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (checkDefaultPlayer()) {
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkDefaultPlayer = () =>
    player.name === "Player" &&
    player.playerClass === "Classe" &&
    player.imgPlayer ===
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  const deletePlayer = () => {
    const updatedStore = [...store];
    const teamData = store.find(({ name }) => name === team);
    const teamIndex = store.indexOf(teamData);
    updatedStore[teamIndex].members.splice(playerIndex, 1);
    localStorage.setItem("times", JSON.stringify(updatedStore));
    setStore(updatedStore);
  };

  const handleClickConfirm = () => {
    setOpen(false);
    deletePlayer();
  };

  return (
    <Card
      style={{
        borderRadius: 10,
        width: "100%",
        maxWidth: 300,
        position: "relative",
      }}
    >
      <IconButton
        aria-label="delete"
        color="primary"
        style={{
          position: "absolute",
          right: 0,
          color: checkIfBlack(color) ? "gray" : "#000",
        }}
        onClick={handleClickOpen}
      >
        <CloseIcon />
      </IconButton>
      <div
        style={{
          backgroundColor: color,
          padding: 10,
        }}
      >
        <CardMedia
          component="img"
          image={player.imgPlayer}
          alt={`Icone ${player.name}`}
        />
      </div>
      <CardContent style={{ backgroundColor: "#fff", textAlign: "center" }}>
        <Typography gutterBottom variant="h5" component="div">
          {player.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {player.playerClass}
        </Typography>
      </CardContent>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle id="draggable-dialog-title">Excluir</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja remover {player.name}? Sua equipe irá ficar sem{" "}
            {player.playerClass}!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClickConfirm}>Excluir</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
