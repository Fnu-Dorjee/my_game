

export default function GameBoard({onSelectSquare, board}){
   
    return (
        <ol id='game-board'>
            {board.map((rowValue, rowKey)=>
                <li key={rowKey}> 
                    <ol>{rowValue.map((playerSymbol, colKey)=>
                        <li key={colKey}>
                            <button 
                            onClick={()=>onSelectSquare(rowKey,colKey)}
                            disabled={playerSymbol != null}
                            >
                                {playerSymbol}
                            </button>
                        </li>
                    )}</ol>
                </li>
            )}

        </ol>
    );
}