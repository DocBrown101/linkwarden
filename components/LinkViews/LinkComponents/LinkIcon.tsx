import { LinkIncludingShortenedCollectionAndTags } from "@/types/global";
import Image from "next/image";
import isValidUrl from "@/lib/shared/isValidUrl";
import React from "react";
import Icon from "@/components/Icon";
import { IconWeight } from "@phosphor-icons/react";
import clsx from "clsx";

export default function LinkIcon({
  link,
  className,
  hideBackground,
}: {
  link: LinkIncludingShortenedCollectionAndTags;
  className?: string;
  hideBackground?: boolean;
}) {
  let iconClasses: string = clsx(
    "rounded flex item-center justify-center shadow-md select-none z-10 w-12 h-12",
    !hideBackground && "rounded-md bg-white backdrop-blur-lg bg-opacity-50 p-1",
    className
  );

  const url =
    isValidUrl(link.url || "") && link.url ? new URL(link.url) : undefined;

  const [showFavicon, setShowFavicon] = React.useState<boolean>(true);

  return (
    <>
      {link.icon ? (
        <Icon
          icon={link.icon}
          size={30}
          weight={(link.iconWeight || "regular") as IconWeight}
          color={link.color || "#0ea5e9"}
          className={iconClasses}
        />
      ) : link.type === "url" && url ? (
        showFavicon ? (
          <Image
            src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${link.url}&size=32`}
            width={64}
            height={64}
            alt=""
            className={iconClasses}
            draggable="false"
            onError={() => {
              setShowFavicon(false);
            }}
          />
        ) : (
          <LinkPlaceholderIcon iconClasses={iconClasses} icon="bi-link-45deg" />
        )
      ) : link.type === "pdf" ? (
        <LinkPlaceholderIcon
          iconClasses={iconClasses}
          icon="bi-file-earmark-pdf"
        />
      ) : link.type === "image" ? (
        <LinkPlaceholderIcon
          iconClasses={iconClasses}
          icon="bi-file-earmark-image"
        />
      ) : // : link.type === "monolith" ? (
      //   <LinkPlaceholderIcon
      //     iconClasses={iconClasses + dimension}
      //     size={size}
      //     icon="bi-filetype-html"
      //   />
      // )
      undefined}
    </>
  );
}

const LinkPlaceholderIcon = ({
  iconClasses,
  icon,
}: {
  iconClasses: string;
  icon: string;
}) => {
  return (
    <div className={clsx(iconClasses, "aspect-square text-4xl text-[#0ea5e9]")}>
      <i className={`${icon} m-auto`}></i>
    </div>
  );
};

// `text-black aspect-square text-4xl ${iconClasses}`
