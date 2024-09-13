"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState, type BaseSyntheticEvent } from "react";


import type { Database } from "@/lib/schema";
import Image from "next/image";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function AddSpeciesDialog({ species, userId }: { species: Species; userId: string }) {

  // Control open/closed state of the dialog
  const [open, setOpen] = useState<boolean>(false);

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
          <p>{"Description added by: " + species.author}</p>
        </div>
        <DialogClose asChild>
          <Button variant="secondary" className="mt-4">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
