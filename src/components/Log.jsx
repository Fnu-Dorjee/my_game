

export default function Log({gameList}){
    return(
        <ol id='log'>
            { gameList.map((turn,)=> 
            <li key={`${turn.square.row} ${turn.square.col}`}>
                player {turn.player} selected {turn.square.row},{turn.square.col}
            </li>)
            }
        </ol>
    );
}