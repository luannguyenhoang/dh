import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface IClass {
  name: string;
  celandar: string;
  startAt: string;
}

interface ICourse {
  name: string;
  class: IClass[];
}

interface ITable {
  courses: ICourse[];
  onClick: () => void;
}

export const TableDetail = (props: ITable) => {
  const { courses, onClick } = props;
  return (
    <TableContainer
      p="24px"
      border={"1px solid"}
      borderColor={"gray.400"}
      rounded={"2xl"}
    >
      <Table size="md">
        <Thead bg={"gray.800"} rounded={"md"}>
          <Tr>
            <Th color={"white"}>Khóa học</Th>
            <Th color={"white"}>Lớp</Th>
            <Th color={"white"}>Lịch học</Th>
            <Th color={"white"}>Khai giảng</Th>
            <Th color={"white"}>Đăng ký</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.map((course, index) => (
            <Tr key={index}>
              <Td rowSpan={course.class.length || 1}>{course.name}</Td>
              <Td key={index}>{"test"}</Td>
              <Td>25.4</Td>
              <Td>25.4</Td>
              <Td>
                <Button colorScheme="red" onClick={(e) => onClick && onClick()}>
                  Đăng ký
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
