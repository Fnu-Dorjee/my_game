
import { useState } from "react";


export default function Player({initailName,symbol,isActive, onChangeName}){
    const [playerName, setPlayerName] = useState(initailName);
    const [isEditing,setIsEditing] = useState(false);
    
    function handleEdit(){
        setIsEditing((edit)=>!edit );
        if(isEditing){
          onChangeName(symbol, playerName);
        }
    }
    function handleChange(event){
      setPlayerName(event.target.value)
    }

    let editplayerName = <span className='player-name'>{playerName}</span>;
    if(isEditing){
        editplayerName = <input type='text' required value={playerName} onChange={handleChange}/>;
    }

    return(
          <li className={isActive ? 'active': undefined}>
            <span className="player">
              {editplayerName}
              <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
          </li>
    );
}