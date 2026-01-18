import { UserDetails } from "@/types/NewResume.type";
import { dir } from "console";
import { emit } from "process";
import React from "react";

const SocialLink: React.FC<{
  href?: string;
  display: string;
}> = ({ href, display }) => (
  <>
    <span>|</span>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${href && "underline underline-offset-5"}`}
    >
      {display}
    </a>
  </>
);

export default function NewCvHeader({
  userDetails,
}: {
  userDetails: UserDetails;
}) {
  const { name, country, email, website, github, linkedin, number, twitter } =
    userDetails;

  const formatWebsiteUrl = (url: string) => {
    return url.startsWith("http") ? url : `https://${url}`;
  };

  const formatWebsiteDisplay = (url: string) => {
    return url.replace(/^https?:\/\/(www\.)?/, "");
  };

  const formatGithubUrl = (username: string) => {
    const cleanedUsername = username.replace(/^(github\/|githube\/)/i, "");
    return cleanedUsername.startsWith("http")
      ? cleanedUsername
      : `https://github.com/${cleanedUsername}`;
  };

  const formatGithubDisplay = (username: string) => {
    return `github.com/${username
      .replace(/^(github\/|githube\/)/i, "")
      .replace(/^https?:\/\/(www\.)?github\.com\//i, "")}`;
  };

  const formatLinkedinUrl = (username: string) => {
    const cleanedUsername = username.replace(/^(li\/|in\/)/i, "");
    return cleanedUsername.startsWith("http")
      ? cleanedUsername
      : `https://linkedin.com/in/${cleanedUsername}`;
  };

  const formatLinkedinDisplay = (username: string) => {
    return `linkedin.com/${username
      .replace(/^(li\/|in\/|linkedin\/)/i, "")
      .replace(/^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/i, "")}`;
  };

  const formatTwitterUrl = (username: string) => {
    const cleanedUsername = username.replace(/^(x\/|twitter\/)/i, "");
    return cleanedUsername.startsWith("http")
      ? cleanedUsername
      : `https://twitter.com/${cleanedUsername}`;
  };

  const formatTwitterDisplay = (username: string) => {
    return `x/${username
      .replace(/^(x\/|twitter\/)/i, "")
      .replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//i, "")}`;
  };

  const GetFirstSocialLink = () => {
    const socialLinks = [
      {
        value: linkedin,
        formatUrl: formatLinkedinUrl,
        formatDisplay: formatLinkedinDisplay,
      },
      {
        value: github,
        formatUrl: formatGithubUrl,
        formatDisplay: formatGithubDisplay,
      },
      {
        value: twitter,
        formatUrl: formatTwitterUrl,
        formatDisplay: formatTwitterDisplay,
      },
    ];

    const firstValid = socialLinks.find((link) => !!link.value);
    if (!firstValid) return null;

    return (
      <SocialLink
        href={firstValid.formatUrl(firstValid.value!)}
        display={firstValid.formatDisplay(firstValid.value!)}
      />
    );
  };

  return (
    <header className="text-center">
      <h1 className="text-4xl font-semibold">{name}</h1>
      <div className="flex flex-wrap gap-x-2 justify-center">
        {country && <span>{country}</span>}
        {number && <SocialLink display="+91 8770457472" />}
        {email && <SocialLink href={`mailto:${email}`} display={email} />}
        <GetFirstSocialLink />
        {website && (
          <SocialLink
            href={formatWebsiteUrl(website)}
            display={formatWebsiteDisplay(website)}
          />
        )}
      </div>
    </header>
  );
}
