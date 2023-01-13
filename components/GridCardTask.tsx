import { resolveLink } from 'helpers/IPFS';
import useContainerEntity from 'hooks/useContainerEntity';
import { CardItem } from 'utils/cardContents';
import GridCard from './GridCard';

/**
 * A List Card component that displays the container's image
 */
export default function GridCardTask(props: CardItem) {
  //Fetch Container's Image
  const { containerImageSrc } = useContainerEntity(props.id);
  //Override Image
  return <GridCard {...props} imgSrc={resolveLink(containerImageSrc)} />;
}
