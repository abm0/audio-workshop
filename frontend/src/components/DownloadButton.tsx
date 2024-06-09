import { DownloadIcon } from "@chakra-ui/icons";
import { Button, Spacer, Text } from "@chakra-ui/react";
import { useRef } from "react";

interface IDownloadButton {
  src?: string;
}

const DownloadButton = ({ src }: IDownloadButton) => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  
  if (src == null) return null;
  
  const handleClick = () => {
    if (linkRef.current == null) return;

    linkRef.current.click();
  }
  
  return (
    <>
      <a ref={linkRef} href={src} download hidden />
      <Button size="xs" variant="outline" onClick={handleClick}>
        <DownloadIcon />
        <Spacer width={1} />
        <Text size="xs">mp3</Text>
      </Button>
    </>
  );
}

export { DownloadButton };
