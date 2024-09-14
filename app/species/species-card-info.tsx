"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import EditSpeciesDialogue from "./edit-species-dialogue";
import DeleteSpeciesDialogue from "./delete-species-dialogue";

import { useState } from "react";


import type { Database } from "@/lib/schema";
import Image from "next/image";

type Species = Database["public"]["Tables"]["species"]["Row"];
type Profiles = Database["public"]["Tables"]["profiles"]["Row"][];

export default function AddSpeciesDialog({ species, userId, profiles }: { species: Species; userId: string; profiles: Profiles }) {

    // Control open/closed state of the dialog
    const [open, setOpen] = useState<boolean>(false);

    const authorProfile = profiles.find(profile => profile.id === species.author);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className="mt-3 w-full">Learn More</Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
            <DialogHeader>
            <DialogTitle>Specimen Details</DialogTitle>
            <DialogDescription>
                Here are all the details about this facinating product of evolution!
            </DialogDescription>
            </DialogHeader>
            <h3 className="mt-3 text-2xl font-semibold text-center">{species.scientific_name}</h3>
            {species.image && (
            <div className="relative w-full h-64 mt-4">
                <Image
                src={species.image}
                alt={species.scientific_name}
                fill
                style={{ objectFit: "contain" }}
                />
            </div>
            )}
            <h4 className="text-lg font-light italic text-center">{species.common_name}</h4>
            <div className="mt-4 text-center">
            <p>
                {"Size of the " + species.common_name + " population: " + 
                (species.total_population !== null ? species.total_population.toLocaleString() : "unknown")}
            </p>
            </div>
            <div className="mt-4 text-center">
            <p>{"Species Kingdom: " + species.kingdom}</p>
            </div>
            <div className="mt-4 text-center">
            <p>{species.description}</p>
            </div>
            <div className="mt-4 text-center">
            <p>{"Description by: " + (authorProfile ? 
                (authorProfile.first_name + " " + authorProfile.last_name + " (" + authorProfile.display_name + ")") 
                : "Unknown Author")}</p>
            </div>
            {userId === species.author ? 
            (
                <div className="flex">
                    <EditSpeciesDialogue key={species.id} species={species} />
                    <DeleteSpeciesDialogue key={species.id} species={species} />
                </div>
            ) : 
            (
            <Button variant="secondary">
                <Icons.settings className="mr-3 h-5 w-5 text-red-500" />
                <div className="text-red-500">You Cannot Edit This Fine Specimen!</div>
            </Button>
            )}
        </DialogContent>
        </Dialog>
    );
}
