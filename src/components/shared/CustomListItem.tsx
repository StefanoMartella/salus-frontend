import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

type Props = {
  title: string;
  subTitle: string;
  withDivider?: boolean;
};

export default function CustomListItem({
  title,
  subTitle,
  withDivider,
}: Props) {
  return (
    <>
      <ListItem>
        <ListItemText primary={title} secondary={subTitle} />
      </ListItem>
      {withDivider ? <Divider /> : <></>}
    </>
  );
}
