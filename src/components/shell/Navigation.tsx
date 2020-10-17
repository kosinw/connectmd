import {
  Box,
  Flex,
  VStack,
  HStack,
  Icon,
  Link,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  useColorMode,
} from "@chakra-ui/core";
import {
  HiOutlineChatAlt2,
  HiOutlineCog,
  HiOutlineHome,
  HiOutlineQuestionMarkCircle,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { PaperAirplaneIcon } from "components/vectors/PaperAirplaneIcon";
import { SiteBrand } from "components/vectors/SiteBrand";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface NavigationLinkItem {
  url: string;
  title: string;
  icon: React.FC;
}

type NavigationLinkProps = NavigationLinkItem & { active?: boolean };

type Navbar = Array<NavigationLinkItem[]>;

const NavigationLinkWrapper: React.FC<{ active: boolean; url: string }> = ({
  active,
  children,
  url,
}) => {
  return active ? (
    <>{children}</>
  ) : (
    <NextLink href={url} passHref>
      <Link w="100%" h="100%" _hover={{ textDecoration: "none" }}>
        {children}
      </Link>
    </NextLink>
  );
};

const NavigationLink: React.FC<NavigationLinkProps> = ({
  url,
  title,
  icon,
  active,
}) => {
  const { colorMode } = useColorMode();

  const styles = !!active
    ? {
        textColor: colorMode === "light" ? "brand" : "whiteAlpha.800",
        background: colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.100",
        borderRadius: "md",
      }
    : {
        textColor: "gray.500",
        _hover: {
          background: colorMode === "light" ? "blackAlpha.50" : "whiteAlpha.50",
        },
      };

  return (
    <NavigationLinkWrapper active={active} url={url}>
      <Box px={2} py={3} w="100%" {...styles}>
        <HStack align="center" spacing={4}>
          <Box transition="color 150ms">
            <Icon as={icon} boxSize={6} stroke="currentcolor" />
          </Box>
          <Box fontSize="sm" fontWeight="medium" as="span">
            {title}
          </Box>
        </HStack>
      </Box>
    </NavigationLinkWrapper>
  );
};

const ShellNavigationContents: React.FC<{
  navbar: Navbar;
}> = ({ navbar }) => {
  const { pathname } = useRouter();

  return (
    <Box as="nav" borderRightWidth={1} h="100%" w="100%">
      <VStack spacing={1} direction="column" py={5} px={4}>
        <Box flexShrink={0} w="100%">
          <NextLink href="/">
            <Link _hover={{ color: "brand" }}>
              <Box as={SiteBrand} h="36px" fill="currentcolor" />
            </Link>
          </NextLink>
        </Box>
        <Flex w="100%" direction="column">
          {navbar
            .map((section) => (
              <VStack w="100%" direction="column" py={3} spacing={1}>
                {section.map((item) => (
                  <NavigationLink
                    key={item.url}
                    active={pathname === item.url}
                    icon={item.icon}
                    url={item.url}
                    title={item.title}
                  />
                ))}
              </VStack>
            ))
            .reduce(
              (acc, section) =>
                acc === null ? (
                  section
                ) : (
                  <>
                    {acc}
                    <Divider orientation="horizontal" />
                    {section}
                  </>
                ),
              null
            )}
        </Flex>
      </VStack>
    </Box>
  );
};

const ShellDesktopNavigation: React.FC<{
  navbar: Navbar;
}> = ({ navbar }) => {
  return (
    <Box
      display={{ base: "none", md: "block" }}
      w="20rem"
      overflowY="auto"
      h="100%"
    >
      <ShellNavigationContents navbar={navbar} />
    </Box>
  );
};

const ShellMobileNavigation: React.FC<{
  navbar: Navbar;
  isOpen: boolean;
  onClose: () => void;
}> = ({ navbar, isOpen, onClose }) => {
  const { colorMode } = useColorMode();

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
      <DrawerOverlay>
        <DrawerContent
          backgroundColor={colorMode === "dark" ? "gray.800" : "white"}
        >
          <DrawerCloseButton />
          <ShellNavigationContents navbar={navbar} />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export const ShellNavigation: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const navbar: Navbar = [
    [
      {
        url: "/",
        title: "Home",
        icon: HiOutlineHome,
      },
      {
        url: "/following",
        title: "Following",
        icon: HiOutlineUserGroup,
      },
      {
        url: "/questions",
        title: "Questions",
        icon: HiOutlineChatAlt2,
      },
      {
        url: "/messages",
        title: "Direct Messages",
        icon: PaperAirplaneIcon,
      },
    ],
    [
      {
        url: "/settings",
        title: "Settings",
        icon: HiOutlineCog,
      },
      {
        url: "/docs/help",
        title: "Help",
        icon: HiOutlineQuestionMarkCircle,
      },
      {
        url: "/docs/legal",
        title: "Legal",
        icon: HiOutlineShieldCheck,
      },
    ],
  ];

  return (
    <>
      <ShellDesktopNavigation navbar={navbar} />
      <ShellMobileNavigation
        isOpen={isOpen}
        onClose={onClose}
        navbar={navbar}
      />
    </>
  );
};
