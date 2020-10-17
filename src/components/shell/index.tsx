import { Flex, useDisclosure } from "@chakra-ui/core";

import { ShellNavigation } from "components/shell/Navigation";
import { ShellHeader } from "components/shell/Header";

export const Shell: React.FC<{}> = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex h="100vh" position="relative" overflow="hidden">
      <ShellNavigation isOpen={isOpen} onClose={onClose} />
      <Flex direction="column" w="100%">
        <ShellHeader onMobileOpen={onOpen} />
        {children}
      </Flex>
    </Flex>
  );
};
