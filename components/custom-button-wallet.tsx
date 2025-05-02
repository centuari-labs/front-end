"use client";

import { type AvatarComponent, ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { Check, Copy, Power, Wallet } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useState } from "react";
import { useAccount, useDisconnect as useWagmiDisconnect } from "wagmi";

const ChainIcon = ({
  iconUrl,
  name,
  background,
  size = 20,
}: {
  iconUrl?: string;
  name?: string;
  background?: string;
  size?: number;
}) => (
  <div
    style={{
      background,
      width: size,
      height: size,
      borderRadius: 999,
      overflow: "hidden",
      marginRight: 4,
    }}
  >
    {iconUrl && (
      <Image
        alt={`${name ?? "Chain"} icon`}
        src={iconUrl || "/placeholder.svg"}
        style={{ width: size, height: size }}
        width={size}
        height={size}
      />
    )}
  </div>
);

export const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return ensImage ? (
    <Image
      src={ensImage || "/placeholder.svg"}
      width={size}
      height={size}
      style={{ borderRadius: size }}
      alt="ENS image"
    />
  ) : // <Jazzicon diameter={size} seed={jsNumberForAddress(address)} />
  null;
};

type BaseColorConfig = {
  shadowColor?: string;
  textColor?: string;
};

type GradientColorConfig = BaseColorConfig & {
  fromColor: string;
  toColor: string;
  hoverFromColor: string;
  hoverToColor: string;
  mode: "gradient";
};

type SolidColorConfig = BaseColorConfig & {
  backgroundColor: string;
  hoverBackgroundColor: string;
  mode: "solid";
};

type ColorConfig = GradientColorConfig | SolidColorConfig;

const defaultGradientColors: GradientColorConfig = {
  fromColor: "from-blue-600",
  toColor: "to-blue-700",
  hoverFromColor: "hover:from-blue-500",
  hoverToColor: "hover:to-blue-600",
  shadowColor: "shadow-[0_0_15px_rgba(59,130,246,0.15)]",
  textColor: "text-white",
  mode: "gradient",
};

export const CustomButtonWallet = ({
  colors = defaultGradientColors,
  className,
}: {
  colors?: ColorConfig;
  className?: string;
}) => {
  return (
    <ConnectButtonWalletComponents colors={colors} className={className} />
  );
};

export const ConnectButtonWalletComponents = ({
  colors = defaultGradientColors,
  className,
}: {
  colors?: ColorConfig;
  className?: string;
}) => {
  const { setTheme, theme } = useTheme();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { disconnect } = useWagmiDisconnect();
  const { isConnected } = useAccount();

  const handleDisconnect = () => {
    if (isConnected) {
      disconnect();
      console.log("Wallet disconnected");
    }
  };

  const handleClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000); // Reset after 2 seconds
      },
      (err) => {
        setIsCopied(false);
      }
    );
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
        authenticationStatus = "unauthenticated",
      }) => {
        if (!mounted) {
          return (
            <div
              aria-hidden="true"
              style={{
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          );
        }

        const connected = account && chain;

        if (!connected) {
          return (
            <Button variant={"colorful"} onClick={openConnectModal}>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          );
        }

        if (chain?.unsupported) {
          return (
            <Button
              onClick={openChainModal}
              variant="destructive"
              className="text-sm sm:text-xs font-bold rounded-md"
            >
              Wrong network
            </Button>
          );
        }

        return (
          <div className="w-fit flex-col sm:flex-row flex gap-2 z-50">
            <Button
              onClick={openChainModal}
              variant="outline"
              className="text-sm sm:text-xs font-bold rounded-md max-w-40 dark:bg-[#1A1A1A] dark:border-white/20 dark:hover:text-white dark:hover:bg-muted-dark/20 transition-all"
            >
              {chain.hasIcon && (
                <ChainIcon
                  iconUrl={chain.iconUrl}
                  name={chain.name}
                  background={chain.iconBackground}
                />
              )}
              <span className="max-w-24 truncate">{chain.name}</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-sm sm:text-xs font-bold rounded-md dark:bg-[#1A1A1A] dark:border-white/20 dark:hover:text-white dark:hover:bg-muted-dark/20 transition-all"
                >
                  {CustomAvatar && (
                    <CustomAvatar
                      address={account.address}
                      ensImage={account.ensAvatar}
                      size={18}
                    />
                  )}
                  <span
                    className="text-xs cursor-pointer"
                    onClick={() =>
                      navigator.clipboard.writeText(account.address)
                    }
                    title="Click to copy address"
                  >
                    {account.displayName}
                  </span>
                  {account.displayBalance ? ` (${account.displayBalance})` : ""}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[300px] bg-card dark:bg-card-dark dark:border-white/20">
                <div className="flex flex-col space-x-2 p-2 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mx-2">{account.displayName}</span>
                      {isCopied ? (
                        <Check className="text-green-700" size={20} />
                      ) : (
                        <Copy
                          className="cursor-pointer"
                          size={12}
                          onClick={() => handleClipboard(account.address)}
                        />
                      )}
                    </div>
                    <div className="space-x-2">
                      <Button
                        onClick={openAccountModal}
                        variant={"colorful"}
                        className="rounded-full w-8 h-8"
                      >
                        <Wallet size={14} />
                      </Button>
                      <Button
                        onClick={handleDisconnect}
                        variant={"colorful"}
                        className="rounded-full w-8 h-8"
                      >
                        <Power size={14} />
                      </Button>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <div className="flex items-center justify-between mt-3">
                        <Label htmlFor="theme" className="text-white">
                          Theme
                        </Label>
                        <TooltipTrigger asChild>
                          <Switch
                            id="theme"
                            checked={theme === "dark"}
                            disabled
                            className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full"
                          />
                        </TooltipTrigger>
                      </div>
                      <TooltipContent className="bg-black dark:border-white/20">
                        <p className="text-xs text-white">
                          Light theme is still cooking👨🏽‍🍳
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomButtonWallet;
