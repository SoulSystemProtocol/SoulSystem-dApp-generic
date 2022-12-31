import { resolveLink } from 'helpers/IPFS';
import useContainerImage from 'hooks/useContainerImage';
import { CardItem } from 'utils/cardContents';
import GridCard from './GridCard';

/**
 * A Dashboard card component that displays the container's image
 */
export default function GridCardTask(props: CardItem) {
  //Fetch Container's Image
  const containerImageSrc = useContainerImage(props.id);
  //Override Image
  return <GridCard {...props} imgSrc={resolveLink(containerImageSrc)} />;
}
