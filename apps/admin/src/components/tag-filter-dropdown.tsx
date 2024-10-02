"use client";

import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { useRouter } from "next/navigation";

interface IProps {
  allTags?: string[];
  selectedTags: string[];
}

export default function TagFilterDropdown(props: IProps) {
  const router = useRouter();

  const handleTagFilter = (tag: string) => {
    const newTags = props.selectedTags.includes(tag)
      ? props.selectedTags.filter((t) => t !== tag)
      : [...props.selectedTags, tag];

    if (newTags.length === 0) {
      router.push("/");
      return;
    }
    router.push(`/?tags=${newTags.join(",")}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="ml-2 h-8 w-8 p-0">
          <span className="sr-only">Filter tags</span>
          <ListFilter className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {props.allTags?.map((tag) => (
          <DropdownMenuCheckboxItem
            key={tag}
            checked={props.selectedTags.includes(tag)}
            onCheckedChange={() => handleTagFilter(tag)}
          >
            {tag}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
