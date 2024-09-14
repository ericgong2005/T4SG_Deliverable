"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";


import type { Database } from "@/lib/schema";
import Image from "next/image";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function AddSpeciesDialog({ profile }: { profile: Profile}) {

    // Control open/closed state of the dialog
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className="mt-3 w-full">Learn More</Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
            <DialogHeader>
            <DialogTitle>Member Details</DialogTitle>
            <DialogDescription>
                Here are all the details about this amazing member!
            </DialogDescription>
            </DialogHeader>
            <h3 className="mt-3 text-2xl font-semibold text-center">
                {(profile.first_name ?? profile.display_name) + " " +  (profile.last_name ?? "")}
            </h3>
            {profile.image && (
            <div className="relative w-full h-64 mt-4">
                <Image
                src={profile.image}
                alt={profile.display_name}
                fill
                style={{ objectFit: "contain" }}
                />
            </div>
            )}
            <h4 className="text-lg font-light italic text-center">{profile.display_name}</h4>
            <div className="mt-4 text-center">
            <p>{profile.biography}</p>
            </div>
        </DialogContent>
        </Dialog>
    );
}
