import { Button, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";
import { isBoolean } from "lodash";
import { eventEmitter } from "../shared/EventEmitter";
import { EVENT_PLAY_START } from "../shared/constants";

enum Actions {
  PLAY,
  PAUSE,
  STOP
}

interface IPlayer {
  src?: string;
}

const Player = (props: IPlayer) => {
  const { src } = props;

  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean | null>(null);

  useEffect(() => {
    const handleGlobalPlayClick = (e: Event) => {
      const customEvent = e as CustomEvent;
            
      if (customEvent.detail.src === src) return;

      setPlayer(Actions.STOP);
    };

    eventEmitter.on(EVENT_PLAY_START, handleGlobalPlayClick);

    return () => {
      eventEmitter.off(EVENT_PLAY_START, handleGlobalPlayClick);
    };
  }, []);
  
  const setPlayer = (action: Actions) => {
    if (audioRef.current == null) return;

    const player = audioRef.current;

    switch (action) {
      case Actions.PLAY:
        player.play();
        setIsPlaying(true);
        eventEmitter.emit(EVENT_PLAY_START, { src });
        break;

      case Actions.PAUSE:
        player.pause();
        setIsPlaying(false)
        break;

      case Actions.STOP:
        player.pause();
        setIsPlaying(null);
        player.currentTime = 0
    }
  };

  if (src == null) return null;

  return (
    <>
      <audio 
        ref={audioRef}
        src={src}
        hidden
        onEnded={() => setPlayer(Actions.STOP)}
        onPlay={(e) => e.currentTarget.volume = 0.2}
      />

      {isBoolean(isPlaying) && (
        <ButtonGroup size="xs" isAttached variant="outline">
          {isPlaying === true && (
            <Button onClick={() => setPlayer(Actions.PAUSE)}>
              <FaPause />
            </Button>
          )}
          {isPlaying === false && (
            <Button onClick={() => setPlayer(Actions.PLAY)}>
              <FaPlay />
            </Button>          
          )}
          <Button onClick={() => setPlayer(Actions.STOP)}>
            <FaStop />
          </Button>
        </ButtonGroup>
      )}
      {isPlaying === null && (
        <Button size="xs" colorScheme="teal" onClick={() => setPlayer(Actions.PLAY)}>
          <FaPlay size={12} />
        </Button>
      )}
    </>
  );
}

export { Player };
