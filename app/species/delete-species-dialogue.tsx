"use client";

import { Icons } from "@/components/icons";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { Database } from "@/lib/schema";

type Species = Database["public"]["Tables"]["species"]["Row"];
type Profiles = Database["public"]["Tables"]["profiles"]["Row"][];

export default function DeleteSpeciesDialog({ species, userId, profiles }: { species: Species; userId: string; profiles: Profiles }) {
  const router = useRouter();

  // Control open/closed state of the dialog
  const [open, setOpen] = useState<boolean>(false);

  // Instantiate form functionality with React Hook Form, passing in the Zod schema (for validation) and default values
  const form = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit = async () => {
    const supabase = createBrowserSupabaseClient();

    const { error: error } = await supabase.from("species").delete().eq("id", species.id);

    // Catch and report errors from Supabase and exit the onSubmit function with an early 'return' if an error occurred.
    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }

    setOpen(false);

    // Refresh all server components in the current route. This helps display the newly created species because species are fetched in a server component, species/page.tsx.
    // Refreshing that server component will display the new species from Supabase
    router.refresh();

    return toast({
      title: "This species has been Deleted!",
      description: "Goodbye " + species.scientific_name + ".",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-1 mr-1 flex-auto" variant="secondary">
            <Icons.trash className="mr-3 h-5 w-5 text-red-500" />
            <div className="text-red-500">Delete Species</div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Delete Species</DialogTitle>
          <DialogDescription>
            Are you sure you wish to delete this entry? It cannot be undone. Select &quot;Delete&quot; to confirm.
          </DialogDescription>
          </DialogHeader>
          <div className="grid w-full items-center gap-4">
            <div className="flex">
              <Button onClick={onSubmit} className="ml-1 mr-1 flex-auto bg-red-600 hover:bg-red-800">
                Delete 
              </Button>
              <DialogClose asChild>
                <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
