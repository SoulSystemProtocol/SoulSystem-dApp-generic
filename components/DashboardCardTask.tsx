import { resolveLink } from 'helpers/IPFS';
import useContainerImage from 'hooks/useContainerImage';
import { CardItem } from 'utils/cardContents';
import DashboardCard from './DashboardCard';

/**
 * A Dashboard card component that displays the container's image
 */
export default function DashboardCardTask(props: CardItem) {
  //Fetch Container's Image
  const containerImageSrc = useContainerImage(props.id);
  //Override Image
  return <DashboardCard {...props} imgSrc={resolveLink(containerImageSrc)} />;
}
