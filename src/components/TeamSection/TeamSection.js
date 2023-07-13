import "./TeamSection.scss";
import Typography from "@mui/material/Typography";
import Team from "../Team/Team";

export default function TeamSection({ setStore, store }) {
  const renderTeams = store.map((team, index) => (
    <Team
      key={index}
      team={team}
      setStore={setStore}
      store={store}
      teamIndex={index}
    />
  ));

  return (
    <section className="team-section">
      {store.length ? (
        <Typography className="team-section__title">Times</Typography>
      ) : (
        ""
      )}
      {store.length ? renderTeams : ""}
    </section>
  );
}
