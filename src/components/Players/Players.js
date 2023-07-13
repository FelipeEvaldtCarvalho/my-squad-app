import "./Players.scss";
import PlayerCard from "../PlayerCard/PlayerCard";

export default function Players({ members, color, team, store, setStore }) {
  const playersList = members.map((member, i) => (
    <PlayerCard
      key={i}
      playerIndex={i}
      player={member}
      color={color}
      team={team}
      store={store}
      setStore={setStore}
    ></PlayerCard>
  ));
  const placeHoldersLength = 4 - members.length;
  const placeHolder = {
    name: "Player",
    playerClass: "Classe",
    imgPlayer:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
  };
  let placeHolderList = [];
  for (let j = 0; j < placeHoldersLength; j++) {
    placeHolderList.push(placeHolder);
  }
  placeHolderList = placeHolderList.map((item, i) => (
    <PlayerCard key={i} player={item} color={color}></PlayerCard>
  ));

  return (
    <section className="players">
      {playersList}
      {placeHolderList}
    </section>
  );
}
