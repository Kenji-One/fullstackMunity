import { useRouter } from "next/router";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  IconButton,
  Popover,
  Typography,
  Link,
} from "@mui/material";
import {
  ContentCopyOutlined,
  LaunchOutlined,
  LogoutOutlined,
  PaletteOutlined,
} from "@mui/icons-material";
import AccountBalanceWalletSharpIcon from "@mui/icons-material/AccountBalanceWalletSharp";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import DarkModeSharpIcon from "@mui/icons-material/DarkModeSharp";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import { CustomToggleButton } from "../toggle";
import { addressEllipsis, availableChains, useWeb3Context } from "../../utils";
import { setMode, setTheme } from "../../utils/store/reducers";
import styles from "./header.module.scss";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = router.pathname;
  const { theme, mode } = useSelector((state) => state.app);
  const { address, chainId, connected, connect, disconnect } = useWeb3Context();
  const [selectedChain, setSelectedChain] = useState(`${chainId}`);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => setSelectedChain(`${chainId}`), [chainId, connected]);

  const handleConnect = (e) =>
    connected ? setOpenMenu(e.currentTarget) : connect(+selectedChain);

  const handleSelect = async (newChain) => {
    if (!connected) {
      setSelectedChain(newChain);
      return;
    }

    connect(+newChain);
    setSelectedChain(newChain);
  };

  const navs = [
    {
      name: "Explore",
      url: "/main",
    },
    {
      name: "Create Community",
      url: "/settings",
    },
  ];

  const copyAddress = () => navigator.clipboard.writeText(address);

  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
    // alert(theme === "light" ? "dark" : "light");
  };
  // TODO: uncomment when we support dark theme in design

  const toggleMode = () =>
    dispatch(setMode(mode === "user" ? "creator" : "user"));

  const goToLanding = () => router.push("/");

  return (
    <Box
      className={`flex ai-ce fj-sb ${styles["container"]} mob:px-4 deskPd:px-[52px] mob:py-4 lap:py-6`}
    >
      <IconButton
        className="!rounded-none tab:w-14 tab:h-14 mob:w-12 mob:h-12 !p-0 lap:!hidden iconbtn"
        sx={{
          "&.MuiButtonBase-root.iconbtn": {
            backgroundColor: "background.iconBtn",
          },
        }}
        onClick={() => setOpenMenu(true)}
      >
        <MenuSharpIcon
          className="mob:!w-[18px] mob:!h-[18px] tab:!w-6 tab:!w-6"
          sx={{ color: "primary.main" }}
        />
      </IconButton>

      <Box className="items-center gap-6 lap:flex mob:hidden">
        {navs.map(({ name, url, index }) => (
          <Link
            key={name}
            href={url}
            underline="none"
            sx={{
              color: "text.primary",
              "&:hover p": {
                color: "text.secondary",
              },
            }}
          >
            <Typography
              sx={{
                color: "text.primary",
                fontSize: "18px",
                lineHeight: "normal",
                fontWeight: "400 !important",
                textTransform: "capitalize",
              }}
              className="transition-all"
            >
              {name}
            </Typography>
          </Link>
        ))}
      </Box>

      <Box
        className={styles["logo-container"] + " mob:hidden lap:block"}
        onClick={goToLanding}
      >
        <Image
          className={styles["logo"]}
          src={theme === "light" ? "/logoDark.png" : "/logoWhite.png"}
          width={217.206}
          height={48}
          alt="logo"
        />
      </Box>
      <Box className="flex">
        <CustomToggleButton
          value={theme}
          items={[
            { value: "light", comp: <LightModeSharpIcon /> },
            { value: "dark", comp: <DarkModeSharpIcon /> },
          ]}
          onChange={toggleTheme}
          classNames={"flex tab:p-2 mob:p-1.5"}
        />
        {connected && pathname !== "/" && (
          <CustomToggleButton
            sx={{ ml: "1rem" }}
            value={selectedChain}
            items={Object.entries(availableChains).map(
              ([chain, { icon, symbol }]) => ({
                value: chain,
                comp: (
                  <Box
                    key={symbol}
                    className={`flex ai-ce ${styles["chain-item"]}`}
                  >
                    <Image
                      src={icon}
                      alt={`${symbol.toLowerCase()}-icon`}
                      width={20}
                      height={20}
                    />
                    <Typography>{symbol}</Typography>
                  </Box>
                ),
              })
            )}
            onChange={handleSelect}
          />
        )}
        <Box
          className={`min-w-fit text-white tab:px-6 mob:px-4 flex fr ai-ce fj-ce ${
            styles["connect"]
          } ${!connected && styles["landing"]}`}
          onClick={handleConnect}
        >
          {connected ? (
            <Image
              className={styles["profile"]}
              src={"/images/profile.png"}
              width={40}
              height={40}
              alt="profile"
            />
          ) : (
            <AccountBalanceWalletSharpIcon />
          )}
          <Typography className="mob:hidden tab:block" fontWeight={300}>
            {connected ? addressEllipsis(address) : "Connect Wallet"}
          </Typography>
        </Box>
        <Popover
          open={Boolean(openMenu)}
          anchorEl={openMenu}
          onClose={() => setOpenMenu(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          className={styles["menu"]}
          disableScrollLock={true}
        >
          <div className="flex flex-1 ai-ce mt-5">
            <h3 className="my-5 flex-1">{addressEllipsis(address)}</h3>
            <IconButton
              size="small"
              aria-label="copy address"
              className={styles["addressSvg"]}
              onClick={copyAddress}
            >
              <ContentCopyOutlined fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              aria-label="copy address"
              className={styles["addressSvg"]}
              href={`https://etherscan.io/address/${address}`}
              target="_blank"
            >
              <LaunchOutlined fontSize="small" />
            </IconButton>
          </div>
          <Typography
            textAlign="left"
            className={`flex ai-ce flex-1 w100 ${styles["creator"]}`}
          >
            <div className="flex flex-1 ai-ce">
              <PaletteOutlined />
              &nbsp;&nbsp; Artist mode
            </div>
            <CustomToggleButton
              value={mode}
              size="small"
              items={[
                { value: "user", title: "OFF" },
                { value: "creator", title: "ON" },
              ]}
              onChange={toggleMode}
            />
          </Typography>
          <Typography
            textAlign="left"
            sx={{
              marginTop: "10px",
              paddingTop: "10px",
              borderTop: "1px solid #CCCCCC",
            }}
          >
            <Button
              sx={{
                minWidth: "110px",
                padding: "0.5em 1em",
                width: "100%",
                justifyContent: "left",
              }}
              onClick={disconnect}
            >
              <LogoutOutlined />
              &nbsp;&nbsp; Disconnect
            </Button>
          </Typography>
        </Popover>
      </Box>
    </Box>
  );
}
