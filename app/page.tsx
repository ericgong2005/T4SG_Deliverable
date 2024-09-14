import { Separator } from "@/components/ui/separator";
import { TypographyH2, TypographyP } from "@/components/ui/typography";

export default function Home() {
  return (
    <>
      <TypographyH2>
        Welcome to <span className="text-blue-400">Eric Gong&apos;s</span> T4SG <span className="text-green-400">Biodiversity Hub</span>!
      </TypographyH2>
      <TypographyP>
        Biodiversity Hub is a web-app that allows users to post information about different species and stay educated on
        biodiversity across the globe. Users sign into the app and add cards that contain data on the species&apos;
        name, description, population, and more.
      </TypographyP>
      <TypographyP>To see the species and member pages, log in in the top right!</TypographyP>
      <Separator className="my-4" />
      <TypographyP>
        Code can be found at https://github.com/ericgong2005/T4SG_Deliverable
      </TypographyP>
      <TypographyP>
        Look at Features.md to see implemented features!
      </TypographyP>
    </>
  );
}
