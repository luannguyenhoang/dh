import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { BiCalendar, BiSolidMap } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";

interface ICardPlace {
  label: string;
  phone: string;
  selected: boolean;
  onCLick?: () => void;
}
export const CardPlace = (props: ICardPlace) => {
  const { label, phone, selected, onCLick } = props;

  return (
    <Card
      align="center"
      rounded={"2xl"}
      border={"1px solid"}
      borderColor={selected ? "red.400" : "gray.300"}
      shadow={"none"}
    >
      <CardHeader>
        <Heading size="md"> {label}</Heading>
      </CardHeader>
      <CardBody>
        <List>
          <ListItem>
            <ListIcon as={BiSolidMap} />
            {label}
          </ListItem>
          <ListItem pt={"12px"}>
            <ListIcon as={BsFillTelephoneFill} />
            {phone}
          </ListItem>
        </List>
      </CardBody>
      <CardFooter>
        <Button
          leftIcon={<BiCalendar />}
          colorScheme="blue"
          onClick={() => onCLick && onCLick()}
        >
          Xem lịch khai giảng
        </Button>
      </CardFooter>
    </Card>
  );
};
