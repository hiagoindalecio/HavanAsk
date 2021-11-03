import copyImg from '../../assets/images/copy.svg';

import './styles.scss';
import { RoomCodeProps } from '../../types/types';

export function RoomCode(props: RoomCodeProps) {

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.roomId);
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.roomId}</span>
    </button>
  )
}