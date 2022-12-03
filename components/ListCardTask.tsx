import { resolveLink } from 'helpers/IPFS';
import useContainerImage from 'hooks/useContainerImage';
import { CardItem } from 'utils/cardContents';
import ListCard from './ListCard';

/**
 * A Dashboard card component that displays the container's image
 */
export default function ListCardTask(props: CardItem) {
  //Fetch Container's Image
  const containerImageSrc = useContainerImage(props.id);
  //Override Image
  return <ListCard {...props} imgSrc={resolveLink(containerImageSrc)} />;
}
