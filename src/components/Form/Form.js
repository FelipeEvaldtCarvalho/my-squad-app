import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Form.scss";
import { MuiColorInput } from "mui-color-input";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const defaultPlayerImg =
  "https://server.blix.gg/imgproxy/Ale3QBXDlfDdPzPeTQnIsMAOguNmX3kT0ECzfvrIEnU/rs:fit:260:260:0/g:no/aHR0cDovL21pbmlvOjkwMDAvaW1hZ2VzLzBlN2IzMjNjMGU5ODQ3MTRhM2YxNzY5YjBjOTg0ZGY2LmpwZw.webp";

export default function Form({ setStore, store }) {
  const [accordionOpen, setAccordionOpen] = React.useState(true);
  const handleAccordion = () => setAccordionOpen(!accordionOpen);
  return (
    <section className="form-section">
      <Accordion expanded={accordionOpen} onChange={handleAccordion}>
        <AccordionSummary
          className="accordion"
          id="acordion-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className="accordion__summary" variant="h5">
            Formulários de Criação
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BasicTabs setStore={setStore} store={store}></BasicTabs>
        </AccordionDetails>
      </Accordion>
    </section>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs({ setStore, store }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Time" {...a11yProps(0)} />
          <Tab label="Player" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TeamForm setStore={setStore} store={store} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PlayerForm setStore={setStore} store={store} />
      </TabPanel>
    </Box>
  );
}

function PlayerForm({ setStore, store }) {
  const [toastText, setToastText] = React.useState("");
  const [openToast, setOpenToast] = React.useState(false);
  const [toastType, setToastType] = React.useState("");
  const [inputChanges, setInputChanges] = React.useState(0);

  const [name, setName] = React.useState("");
  const handleChangeName = ({ target }) => {
    setInputChanges(inputChanges + 1);
    setName(target.value);
  };
  const nameError = !inputChanges ? !!inputChanges : !name || name.length > 20;
  const nameMsgError = !name
    ? "Campo obrigatório!"
    : "Campo deve ter no máximo 20 caracteres!";
  const validateName = nameError || !name;

  const [playerClass, setPlayerClass] = React.useState("");
  const handleChangePlayerClass = ({ target }) => {
    setInputChanges(inputChanges + 1);
    setPlayerClass(target.value);
  };
  const playerClassError = !inputChanges
    ? !!inputChanges
    : !playerClass || playerClass.length > 20;
  const playerClassMsgError = !playerClass
    ? "Campo obrigatório!"
    : "Campo deve ter no máximo 20 caracteres!";
  const validatePlayerClass = playerClassError || !playerClass;

  const [imgPlayer, setImgPlayer] = React.useState("");
  const handleChangeImgPlayer = ({ target }) => {
    setInputChanges(inputChanges + 1);
    setImgPlayer(target.value);
  };

  const [team, setTeam] = React.useState("");
  const handleChangeTeam = ({ target }) => {
    setInputChanges(inputChanges + 1);
    setTeam(target.value);
  };
  const teamError = !inputChanges ? !!inputChanges : !team || team === 0;
  const teamMsgError = "Campo obrigatório!";
  const validateTeam = teamError || !team;

  const incompleteTeams = store.filter(({ members }) => members.length < 4);

  const timesOptions = incompleteTeams.map(({ name }, index) => (
    <MenuItem key={index} value={name}>
      {name}
    </MenuItem>
  ));

  const clearPlayerForm = () => {
    setName("");
    setPlayerClass("");
    setInputChanges(0);
    setImgPlayer("");
    setTeam("");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };
  const getTeamIndex = (name) => store.findIndex((team) => team.name === name);

  const checkDuplicatedPlayerInTeam = (teamName, playerName) =>
    store[getTeamIndex(teamName)].members.some(
      (player) => player.name === playerName
    );
  const onSubmit = () => {
    if (validateName || validatePlayerClass || validateTeam) {
      setInputChanges(inputChanges + 1);
      return;
    }
    if (checkDuplicatedPlayerInTeam(team, name)) {
      setToastText(`${name} já faz parte da equipe ${team}!`);
      setToastType("error");
      setOpenToast(true);
      return;
    }
    const updatedTeam = [...store];
    updatedTeam[getTeamIndex(team)].members.push({
      name,
      playerClass,
      imgPlayer: imgPlayer || defaultPlayerImg,
    });
    localStorage.setItem("times", JSON.stringify(updatedTeam));
    setStore(updatedTeam);
    clearPlayerForm();
    setToastText(`${name} agora faz parte do time ${team}!`);
    setToastType("success");
    setOpenToast(true);
  };

  return (
    <Box
      component="form"
      sx={{
        maxWidth: "100%",
      }}
      autoComplete="off"
    >
      <Stack spacing={2} direction="column">
        <TextField
          error={nameError}
          fullWidth
          id="outlined-basic"
          value={name}
          label="Nickname"
          variant="outlined"
          placeholder="Digite o nick name do jogador"
          onChange={handleChangeName}
        />
        {nameError ? <Alert severity="error">{nameMsgError}</Alert> : ""}
        <TextField
          error={playerClassError}
          fullWidth
          id="outlined-basic"
          value={playerClass}
          label="Classe"
          variant="outlined"
          placeholder="Digite a classe do personagem"
          onChange={handleChangePlayerClass}
        />
        {playerClassError ? (
          <Alert severity="error">{playerClassMsgError}</Alert>
        ) : (
          ""
        )}
        <TextField
          fullWidth
          id="outlined-basic"
          label="Icone de Jogador"
          variant="outlined"
          placeholder="Url do icone do jogador"
          value={imgPlayer}
          onChange={handleChangeImgPlayer}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Time</InputLabel>
          <Select
            error={teamError}
            value={team}
            label="Time"
            onChange={handleChangeTeam}
            labelId="demo-simple-select-label"
          >
            {timesOptions.length ? (
              timesOptions
            ) : (
              <MenuItem value="0">Nenhum time disponivél!</MenuItem>
            )}
          </Select>
        </FormControl>
        {teamError ? <Alert severity="error">{teamMsgError}</Alert> : ""}
        <Stack spacing={2} direction="row">
          <Button onClick={onSubmit} variant="contained">
            Salvar
          </Button>
          <Button
            onClick={clearPlayerForm}
            variant="contained"
            style={{ backgroundColor: "gray" }}
          >
            Limpar
          </Button>
        </Stack>
      </Stack>
      <Snackbar open={openToast} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={toastType}
          sx={{ width: "100%" }}
        >
          {toastText}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function TeamForm({ setStore, store }) {
  const [color, setColor] = React.useState("#fff");
  const [name, setName] = React.useState("");
  const [toastText, setToastText] = React.useState("");
  const [openToast, setOpenToast] = React.useState(false);
  const [toastType, setToastType] = React.useState("");
  const [inputChanges, setInputChanges] = React.useState(0);
  const nameError = !inputChanges ? !!inputChanges : !name || name.length > 20;
  const nameMsgError = !name
    ? "Campo obrigatório!"
    : "Campo deve ter no máximo 20 caracteres!";

  const clearTeamForm = () => {
    setColor("#fff");
    setName("");
    setInputChanges(0);
  };

  const handleColorChange = (color) => {
    setColor(color);
  };

  const handleNameChange = (e) => {
    setInputChanges(inputChanges + 1);
    setName(e.target.value);
  };

  const checkIfTeamNameExists = (name) =>
    store.some((team) => team.name === name);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  const onSubmit = () => {
    if (nameError || !name) {
      setInputChanges(inputChanges + 1);
      return;
    }
    if (checkIfTeamNameExists(name)) {
      setToastText(`O Time ${name}, já existe.`);
      setToastType("error");
      setOpenToast(true);
      return;
    }
    const updatedTeam = [...store];
    updatedTeam.push({ name, color, members: [] });
    localStorage.setItem("times", JSON.stringify(updatedTeam));
    setStore(updatedTeam);
    clearTeamForm();
    setToastText(`O Time ${name} está pronto pra ação!`);
    setToastType("success");
    setOpenToast(true);
  };

  return (
    <form>
      <Snackbar open={openToast} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={toastType}
          sx={{ width: "100%" }}
        >
          {toastText}
        </Alert>
      </Snackbar>
      <Stack spacing={2} direction="column">
        <TextField
          error={nameError}
          name="name"
          value={name}
          fullWidth
          label="Nome"
          variant="outlined"
          placeholder="Digite o nome do time"
          onChange={handleNameChange}
        />
        {nameError ? <Alert severity="error">{nameMsgError}</Alert> : ""}
        <InputLabel id="color-label">Cor</InputLabel>
        <MuiColorInput required value={color} onChange={handleColorChange} />
        <Stack spacing={2} direction="row">
          <Button onClick={onSubmit} variant="contained">
            Salvar
          </Button>
          <Button
            onClick={clearTeamForm}
            variant="contained"
            style={{ backgroundColor: "gray" }}
          >
            Limpar
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
