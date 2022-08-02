export const DAO_CONF = {
  PAGE_TITLE: 'Teams',
  TITLE: 'MentorDAOs',
  SUBTITLE: `Mentor DAOs consist of a mentor and mentees that work on bounties
  together, as a team.`,
  ROUTE: 'daos',
};

export const getCardContent = (item: any) => ({
  id: item.id,
  imgSrc: item.uriData.image,
  label: item.uriData.description,
  title: item.name,
});
