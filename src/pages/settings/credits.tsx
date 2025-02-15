import Button from "../../components/button";
import { SOCIAL } from "../../init";
import { Star } from "@phosphor-icons/react";

const CreditsPage = () => {
  return (
    <>
      <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-primary-900">
        <Star
          weight="duotone"
          fill="currentColor"
          size={24}
          className="text-primary-900"
        />
        Credits and acknowledgements
      </h2>
      <ul className="pl-4 mb-4 list-disc list-inside text-black/60">
        <li>
          <a href="https://docs.rs/kira/latest/kira/index.html" rel="nofollow">
            Kira Rust backend agnostic library
          </a>{" "}
          for the audio server manager
        </li>
        <li>
          <a href="https://github.com/ZacharyL2">ZacharyL2</a> for{" "}
          <a href="https://github.com/ZacharyL2/KeyEcho/blob/master/src-tauri/src/keyecho/listen_key">
            key listening code
          </a>
        </li>
        <li>
          <a href="https://github.com/hainguyents13/mechvibes/">Mechvibes</a>{" "}
          for the soundpacks and the inspiration. Check their{" "}
          <a href="https://mechvibes.com/" rel="nofollow">
            website
          </a>
          .
        </li>
        <li>
          Check{" "}
          <a href="https://github.com/KunalBagaria/rustyvibes">Rusty vibes</a>.
          I took some inspiration from it and source code also 😜.
        </li>
        <li>
          <a href="https://github.com/rustdesk-org/rdev">Rustdesk rdev fork</a>{" "}
          that fixes a macOS crash bug and some other bugs.
        </li>
        <li>
          <a href="https://github.com/lllyasviel/Fooocus">Fooocus</a> for AI
          logo generation
        </li>
        <li>
          <a href="https://github.com/Sanster/IOPaint">IOPaint</a> an open
          source AI objects remover to fix some artifacts in the generated logos
        </li>
        <li>
          <a href="https://upscayl.org/" rel="nofollow">
            Upscayl
          </a>{" "}
          to scale the generated logos up to 4k
        </li>
        <li>
          <a
            href="https://www.adobe.com/express/feature/ai/image/remove-background"
            rel="nofollow"
          >
            Adobe AI background remover
          </a>
        </li>
        <li>
          <a href="https://www.tints.dev/primary/D9AC92" rel="nofollow">
            tints.dev
          </a>{" "}
          for the color palette
        </li>
        <li>
          <a href="https://handyarrows.com/" rel="nofollow">
            eronred
          </a>{" "}
          for such useful hand drawn arrows
        </li>
      </ul>
      <div className="flex flex-wrap items-center mt-1 mb-4">
        <p className="text-sm text-muted">
          {" "}
          Created by{" "}
          <a
            href="https://twitter.com/juliankominovic"
            target="_blank"
            rel="noopener noreferrer"
            className="underline cursor-pointer underline-offset-2"
          >
            @Julian Kominvovic
          </a>{" "}
        </p>
        <span className="mx-2">•</span>
        {SOCIAL.map((social) => (
          <Button
            className="relative overflow-hidden"
            asChild
            variant={"ghost"}
            key={social.url}
          >
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="justify-center w-8 h-8 p-0"
            >
              {" "}
              {social.icon}
              {/* {social.text} */}
            </a>
          </Button>
        ))}
      </div>
    </>
  );
};

export default CreditsPage;
